import Link from 'next/link'
import { Tool } from '@/lib/tools'

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={tool.slug}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer border border-gray-200 hover:border-primary-300">
        <div className="text-4xl mb-4">{tool.icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {tool.name}
        </h3>
        <p className="text-gray-600 text-sm">
          {tool.description}
        </p>
        <div className="mt-4 text-primary-600 font-medium text-sm">
          Use Tool →
        </div>
      </div>
    </Link>
  )
}

