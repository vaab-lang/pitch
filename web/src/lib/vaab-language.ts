import { LanguageSupport, StreamLanguage } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

const VAAB_KEYWORDS =
  /\b(let|changing|to|type|choice|match|when|then|return|if|else|or|fails|success|failure|otherwise|print|serve|route|reply|yes|no|nothing|for|each|in|while|import|from|need|riff|together|start|shared|returns|with|new|and|not|file|text|json)\b/

const VAAB_TYPES =
  /\b(Text|Int|Float|Bool|List|Map|Channel|Task|Shared|Json|Http|Sqlite|Env|Nothing|Self|Unit|Result)\b/

const vaabLanguage = StreamLanguage.define({
  name: 'vaab',
  token(stream) {
    if (stream.eatSpace()) return null

    if (stream.match(/#.*/)) return 'comment'

    if (stream.match(/"([^"\\]|\\.)*"/)) return 'string'

    if (stream.match(VAAB_KEYWORDS)) return 'keyword'

    if (stream.match(VAAB_TYPES)) return 'typeName'

    if (stream.match(/\b\d+\.\d+\b/)) return 'number'

    if (stream.match(/\b\d+\b/)) return 'number'

    if (stream.match(/[+\-*/%=<>!&|?:]+/)) return 'operator'

    if (stream.match(/[a-zA-Z_]\w*/)) return 'variableName'

    stream.next()
    return null
  },
  tokenTable: {
    comment: t.lineComment,
    keyword: t.keyword,
    string: t.string,
    number: t.number,
    typeName: t.typeName,
    operator: t.operator,
    variableName: t.variableName,
  },
})

export const vaabLanguageSupport = new LanguageSupport(vaabLanguage)
