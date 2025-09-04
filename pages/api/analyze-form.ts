import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'
import yaml from 'js-yaml'
import formidable from 'formidable'
import fs from 'fs'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface FormField {
  id: string
  text: string
  type: string
  required: boolean
  options?: string[]
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ 
      error: 'OpenAI API key not configured. Please set OPENAI_API_KEY in .env.local' 
    })
  }

  try {
    const form = formidable()
    const [fields, files] = await form.parse(req)
    
    const image = Array.isArray(files.image) ? files.image[0] : files.image
    if (!image) {
      return res.status(400).json({ error: 'No image provided' })
    }

    const imageBuffer = fs.readFileSync(image.filepath)
    const base64Image = imageBuffer.toString('base64')
    
    let mimeType = image.mimetype || 'image/png'
    
    if (!mimeType && image.originalFilename) {
      const ext = image.originalFilename.toLowerCase().split('.').pop()
      switch (ext) {
        case 'png':
          mimeType = 'image/png'
          break
        case 'jpg':
        case 'jpeg':
          mimeType = 'image/jpeg'
          break
        case 'gif':
          mimeType = 'image/gif'
          break
        case 'webp':
          mimeType = 'image/webp'
          break
        default:
          mimeType = 'image/png'
      }
    }
    
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(mimeType)) {
      return res.status(400).json({ 
        error: `Unsupported image format. Use PNG, JPEG, GIF, or WebP.` 
      })
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this form image and extract all form fields. Return ONLY valid JSON:
              {
                "title": "form title",
                "fields": [
                  {
                    "label": "Field Name",
                    "type": "text",
                    "required": true
                  }
                ]
              }`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 1500,
    })

    const content = response.choices[0]?.message?.content?.trim()
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    let cleanContent = content
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }

    const extractedData = JSON.parse(cleanContent)

    if (!extractedData.fields || !Array.isArray(extractedData.fields)) {
      throw new Error('Invalid response format')
    }

    const formFields: FormField[] = extractedData.fields.map((field: any, index: number) => ({
      id: field.label?.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || `field_${index}`,
      text: field.label || `Field ${index}`,
      type: field.type || 'text',
      required: field.required || false,
      options: field.options || []
    }))

    const yamlStructure = {
      questionnaire: {
        id: 'uploaded_form',
        text: extractedData.title || 'Form',
        type: 'group',
        questions: formFields.map(field => ({
          id: field.id,
          text: field.text,
          type: field.type,
          required: field.required,
          ...(field.options && field.options.length > 0 && { options: field.options })
        }))
      }
    }

    const yamlString = yaml.dump(yamlStructure, { indent: 2 })

    res.status(200).json({
      yaml: yamlString,
      extractedFields: formFields
    })

  } catch (error) {
    console.error('Analysis error:', error)
    res.status(500).json({
      error: 'Failed to analyze form image'
    })
  }
}