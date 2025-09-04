import { Sparkles, Brain } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-pulse-slow">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
            <Sparkles className="w-3 h-3 text-yellow-800" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Form</h3>
        <p className="text-gray-600 mb-8">
          Our AI is carefully examining your form image to extract field structures...
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-3"></div>
            Detecting form fields and labels
          </div>
          <div className="flex items-center justify-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-3" style={{ animationDelay: '0.5s' }}></div>
            Identifying field types and validation rules
          </div>
          <div className="flex items-center justify-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3" style={{ animationDelay: '1s' }}></div>
            Generating YAML structure
          </div>
        </div>
        
        <div className="mt-8 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
  )
}