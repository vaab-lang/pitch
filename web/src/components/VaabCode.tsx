import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import CodeMirror from '@uiw/react-codemirror'

import { vaabLanguageSupport } from '@/lib/vaab-language'
import { cn } from '@/lib/utils'

type VaabCodeProps = {
  code: string
  filename?: string
  language?: 'vaab' | 'typescript'
  className?: string
  minHeight?: string
}

const readOnlyExtensions = [
  EditorView.editable.of(false),
  EditorView.lineWrapping,
]

export function VaabCode({
  code,
  filename,
  language = 'vaab',
  className,
  minHeight = '200px',
}: VaabCodeProps) {
  const langExtension =
    language === 'typescript' ? javascript({ typescript: true }) : vaabLanguageSupport

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[1.5rem] border border-slate-700 bg-slate-900',
        className,
      )}
    >
      {filename && (
        <div className="flex items-center gap-3 border-b border-slate-800 px-4 py-3">
          <div className="flex gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
            {filename}
          </span>
        </div>
      )}
      <CodeMirror
        value={code}
        theme={oneDark}
        extensions={[langExtension, ...readOnlyExtensions]}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: false,
          indentOnInput: false,
          bracketMatching: true,
        }}
        minHeight={minHeight}
        className="[&_.cm-editor]:bg-slate-900 [&_.cm-editor]:py-2 [&_.cm-gutters]:border-r-slate-800 [&_.cm-gutters]:bg-slate-950 [&_.cm-scroller]:font-mono [&_.cm-scroller]:text-sm"
      />
    </div>
  )
}
