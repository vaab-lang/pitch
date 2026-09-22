export type Example = {
  id: string
  label: string
  description: string
  source: string
}

export const EXAMPLES: Example[] = [
  {
    id: 'hello',
    label: 'Hello',
    description: 'The smallest Vaab program',
    source: `# The smallest Vaab program.
let name = "world"
print("hello, {name}")`,
  },
  {
    id: 'collections',
    label: 'Collections',
    description: 'Lists, maps, and functional style',
    source: `let numbers = [1, 2, 3]
let ages = {"Ada": 36, "Alan": 41}

print(numbers.map(n -> n * n))
print(ages.get("Ada") otherwise 0)`,
  },
  {
    id: 'types',
    label: 'Types',
    description: 'Records with methods and errors',
    source: `type Account {
    owner: Text
    balance: Int = 0

    to deposit(amount: Int) returns Account or fails AccountError {
        if amount <= 0 { return failure AccountError.InvalidAmount(amount) }
        return success self.with(balance: self.balance + amount)
    }
}

choice AccountError { InvalidAmount(amount: Int) }

match Account.new(owner: "Ada").deposit(25) {
    when success a then print("{a.owner} has {a.balance}")
    when failure _   then print("that did not work")
}`,
  },
  {
    id: 'match',
    label: 'Match',
    description: 'Pattern matching on choices',
    source: `choice Mood {
    Bright
    Cloudy
    Stormy
}

to describe(m: Mood) returns Text {
    match m {
        when Bright then "sun on your face"
        when Cloudy then "soft light through glass"
        when Stormy then "rain on the roof"
    }
}

print(describe(Mood.Bright))`,
  },
]

export const DEFAULT_SOURCE = EXAMPLES[0]!.source
