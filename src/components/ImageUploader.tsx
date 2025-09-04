import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Image as ImageIcon, CircleAlert } from 'lucide-react'

interface ImageUploaderProps {
  onImageUpload: (file: File) => void
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      onImageUpload(file)
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  return (
    <div className="max-w-4xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-300 bg-white/80 backdrop-blur-sm
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50/80 scale-105' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className={`
              w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
              ${isDragActive ? 'bg-blue-100' : 'bg-gray-100'}
            `}>
              {isDragActive ? (
                <Upload className="w-8 h-8 text-blue-600 animate-bounce" />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-600" />
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {isDragActive ? 'Drop your form image here!' : 'Upload Form Image'}
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your form image, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports PNG, JPG, JPEG, WebP (max 10MB)
            </p>
          </div>
          
          <div className="flex justify-center">
            <button
              type="button"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg"
            >
              Choose File
            </button>
          </div>
        </div>
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center text-red-700">
            <CircleAlert className="w-5 h-5 mr-2" />
            <span className="font-semibold">Upload Error</span>
          </div>
          <ul className="mt-2 text-red-600 text-sm">
            {fileRejections.map(({ file, errors }) => (
              <li key={file.name}>
                {file.name}: {errors.map(e => e.message).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Feature Cards */}
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover-scale">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Upload</h3>
          <p className="text-gray-600">
            Drag and drop any form image. Our AI supports multiple formats and provides instant feedback.
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover-scale">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
          <p className="text-gray-600">
            Advanced computer vision extracts field labels, types, and validation rules automatically.
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover-scale">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">YAML Export</h3>
          <p className="text-gray-600">
            Get clean, structured YAML files ready to integrate into your projects and workflows.
          </p>
        </div>
      </div>
    </div>
  )
}