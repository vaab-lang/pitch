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
    id: 'query',
    label: 'Query',
    description: 'Fluent Db and Store relations',
    source: `choice DbError { Failed(message: Text) }

to demo() returns Text or fails DbError {
    let db = try Db.connect("sqlite::memory:")
    let empty: list of Text = []
    try db.execute("create table tasks (id text, owner text)", empty)
    try db.from("tasks").insert({"id": "1", "owner": "ada"})
    let rows = try db
        .from("tasks")
        .where_eq("owner", "ada")
        .order_desc("id")
        .all()
    return success "ada has {rows.count} tasks"
}

match demo() {
    when success message then print(message)
    when failure error then match error {
        when Failed(message) then print(message)
    }
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
