import { useState } from 'react'
import { Upload, FileText, Sparkles, Download, Copy, Check } from 'lucide-react'
import Head from 'next/head'
import ImageUploader from '../src/components/ImageUploader'
import YamlDisplay from '../src/components/YamlDisplay'
import LoadingSpinner from '../src/components/LoadingSpinner'

interface AnalysisResult {
  yaml: string
  extractedFields: Array<{
    id: string
    text: string
    type: string
    required: boolean
  }>
}

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleImageUpload = async (file: File) => {
    setError(null)
    setAnalysisResult(null)
    
    // Create preview URL
    const imageUrl = URL.createObjectURL(file)
    setUploadedImage(imageUrl)
    
    setIsAnalyzing(true)
    
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      const response = await fetch('/api/analyze-form', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Failed to analyze form')
      }
      
      const result = await response.json()
      setAnalysisResult(result)
    } catch (err) {
      setError('Failed to analyze the form. Please try again.')
      console.error('Analysis error:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const copyToClipboard = async () => {
    if (analysisResult?.yaml) {
      await navigator.clipboard.writeText(analysisResult.yaml)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadYaml = () => {
    if (analysisResult?.yaml) {
      const blob = new Blob([analysisResult.yaml], { type: 'text/yaml' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'form.yaml'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <>
      <Head>
        <title>Form Field Analyzer - AI-Powered Form Extraction</title>
        <meta name="description" content="Upload form images and extract field structures automatically using AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
            <div className="text-center animate-fade-in">
              <div className="flex justify-center items-center mb-6">
                <div className="relative">
                  <Sparkles className="w-12 h-12 text-blue-600" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                AI Form Field
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Analyzer</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Upload any form image and watch AI automatically extract field structures, 
                generating clean YAML configurations ready for your applications.
              </p>
              <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </div>
                <div className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Analysis
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate YAML
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {!uploadedImage && !isAnalyzing && !analysisResult && (
            <div className="animate-slide-up">
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
          )}

          {isAnalyzing && (
            <div className="animate-fade-in">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <div className="text-red-600 text-lg font-semibold mb-2">Analysis Failed</div>
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => {
                    setError(null)
                    setUploadedImage(null)
                    setAnalysisResult(null)
                  }}
                  className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {uploadedImage && analysisResult && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Analysis Complete</h2>
                <p className="text-gray-600">Your form has been successfully analyzed and converted to YAML</p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Original Image */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-blue-600" />
                    Uploaded Form
                  </h3>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover-scale">
                    <img
                      src={uploadedImage}
                      alt="Uploaded form"
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>
                </div>

                {/* Generated YAML */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-purple-600" />
                      Generated form.yaml
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-1 text-green-600" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </>
                        )}
                      </button>
                      <button
                        onClick={downloadYaml}
                        className="flex items-center px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                  <YamlDisplay yaml={analysisResult.yaml} />
                </div>
              </div>

              {/* Extracted Fields Summary */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Extracted Fields Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysisResult.extractedFields.map((field, index) => (
                    <div key={field.id} className="bg-white rounded-lg shadow-sm border p-4 hover-scale">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{field.text}</h4>
                        {field.required && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Required</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Type:</span> {field.type}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">ID:</span> {field.id}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Analysis Button */}
              <div className="text-center mt-12">
                <button
                  onClick={() => {
                    setUploadedImage(null)
                    setAnalysisResult(null)
                    setError(null)
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold"
                >
                  Analyze Another Form
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400">
                Powered by OpenAI Vision API • Built with Next.js & Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}