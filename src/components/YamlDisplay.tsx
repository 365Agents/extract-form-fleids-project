import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface YamlDisplayProps {
  yaml: string
}

export default function YamlDisplay({ yaml }: YamlDisplayProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h4 className="text-lg font-semibold text-gray-900">form.yaml</h4>
      </div>
      <div className="relative">
        <SyntaxHighlighter
          language="yaml"
          style={oneLight}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            fontSize: '14px',
            lineHeight: '1.5',
            backgroundColor: 'white',
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '3em',
            paddingRight: '1em',
            color: '#9ca3af',
            borderRight: '1px solid #e5e7eb',
            marginRight: '1em',
          }}
        >
          {yaml}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}