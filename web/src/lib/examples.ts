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
    id: 'casts',
    label: 'Casts',
    description: 'Mutable objects, inheritance, and errors',
    source: `cast Animal {
    changing name: Text

    to speak() returns Text = self.name
}

cast Dog entertains Animal {
    changing breed: Text

    to speak() returns Text = "{self.name}, a {self.breed}"
}

let ada = Dog.new(name: "Ada", breed: "collie")
print(ada.speak())`,
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
