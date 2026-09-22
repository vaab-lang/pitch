import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

import { VaabCode } from '@/components/VaabCode'
import { rewriteDocLink } from '@/lib/doc-utils'
import { cn } from '@/lib/utils'

type MarkdownDocProps = {
  content: string
  decisionEntries?: boolean
}

function decisionId(title: string): string | null {
  const match = /^D(\d+)\./.exec(title)
  return match ? match[1] : null
}

export function MarkdownDoc({ content, decisionEntries = false }: MarkdownDocProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-50 sm:text-5xl">
            {children}
          </h1>
        ),
        h2: ({ children, id }) => (
          <h2
            id={id}
            className="scroll-mt-28 border-t border-slate-800 pt-12 text-2xl font-bold tracking-tight text-slate-100 first:border-t-0 first:pt-0 sm:text-3xl"
          >
            {children}
          </h2>
        ),
        h3: ({ children, id }) => {
          const text = String(children)
          const idNum = decisionEntries ? decisionId(text) : null
          return (
            <h3
              id={id}
              className={cn(
                'scroll-mt-28 pt-8 text-lg font-bold text-slate-100 sm:text-xl',
                decisionEntries && 'flex items-start gap-3',
              )}
            >
              {idNum && (
                <span className="mt-0.5 shrink-0 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-400">
                  D{idNum}
                </span>
              )}
              <span>{decisionEntries && idNum ? text.replace(/^D\d+\.\s*/, '') : children}</span>
            </h3>
          )
        },
        p: ({ children }) => (
          <p className="mt-4 text-base leading-relaxed text-slate-400">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-400">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-400">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-semibold text-slate-200">{children}</strong>
        ),
        em: ({ children }) => <em className="text-slate-300">{children}</em>,
        hr: () => <hr className="my-10 border-slate-800" />,
        blockquote: ({ children }) => (
          <blockquote className="mt-4 border-l-2 border-emerald-500/40 pl-4 text-slate-400 italic">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => {
          const target = rewriteDocLink(href)
          if (target?.startsWith('/')) {
            return (
              <Link to={target} className="font-medium text-emerald-400 underline-offset-4 hover:underline">
                {children}
              </Link>
            )
          }
          return (
            <a
              href={target}
              className="font-medium text-emerald-400 underline-offset-4 hover:underline"
              target={target?.startsWith('http') ? '_blank' : undefined}
              rel={target?.startsWith('http') ? 'noreferrer' : undefined}
            >
              {children}
            </a>
          )
        },
        code: ({ className, children }) => {
          const text = String(children).replace(/\n$/, '')
          const language = /language-(\w+)/.exec(className ?? '')?.[1]
          if (language === 'vaab') {
            return (
              <div className="my-6">
                <VaabCode code={text} filename="example.vaab" minHeight="120px" />
              </div>
            )
          }
          const isBlock = className?.includes('language-') || text.includes('\n')
          if (isBlock) {
            return (
              <pre className="my-6 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-sm leading-relaxed text-slate-300">
                <code>{text}</code>
              </pre>
            )
          }
          return (
            <code className="rounded-md border border-slate-800 bg-slate-900 px-1.5 py-0.5 font-mono text-[0.9em] text-emerald-300">
              {children}
            </code>
          )
        },
        pre: ({ children }) => <>{children}</>,
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full min-w-[480px] border-collapse text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="border-b border-slate-800 bg-slate-900/80">{children}</thead>,
        tbody: ({ children }) => <tbody className="divide-y divide-slate-800">{children}</tbody>,
        tr: ({ children }) => <tr className="transition-colors hover:bg-slate-900/40">{children}</tr>,
        th: ({ children }) => (
          <th className="px-4 py-3 text-left font-semibold text-slate-200">{children}</th>
        ),
        td: ({ children }) => <td className="px-4 py-3 text-slate-400">{children}</td>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
