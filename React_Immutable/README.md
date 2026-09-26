# React Immutable

Immutable.js exercises: converting plain JavaScript into immutable structures,
reading nested values, Lists, chained mutations, merging, deep merging,
value equality, and lazy `Seq`.

```
npm install
npm test          # jest
npm run lint      # eslint
npm run full-test # eslint [0-9]*.js && jest
```

## Learning objectives

* Immutable objects. Who, what, when, where, and why?
* How to use the Immutable.js library to bring immutability to Javascript
* The differences between List and Map
* How to use Merge, Concat, and Deep Merging
* What a lazy `Seq` is

## Files

| File | Exports | What it does |
| ---- | ------- | ------------ |
| `0-fromjs.js` | `getImmutableObject` | `fromJS(object)` — converts **deeply**, so nested objects become Maps too |
| `1-map.js` | `getImmutableObject` | `Map(object)` — converts only the first level, nested objects stay plain JS |
| `2-nested.js` | `accessImmutableObject` | `fromJS(object).getIn(array)` — returns a string, a Map, or `undefined` |
| `3-list.js` | `getListObject`, `addElementToList` | `List(array)`, and `list.push(element)` returning a new List |
| `4-mutations.js` | `map`, `map2` | `map.withMutations(...)` chains both changes without a third variable |
| `5-merge.js` | `concatElements`, `mergeElements` | `List.concat` keeps both sets of values; `Map.merge` lets `page2` win on a clash |
| `6-deeply.js` | `mergeDeeplyElements` | `Map.mergeDeep` combines nested values instead of replacing them |
| `7-equality.js` | `areMapsEqual` | `is(map1, map2)` — value equality, not reference equality |
| `8-seq.js` | `printBestStudents` | lazy `Seq` filtered on `score >= 70`, names capitalized, printed to the console |

Every file with a single function uses a default export; `3-list.js` and
`5-merge.js` use named exports since they hold two each.

## Notes

**`0-fromjs.js` vs `1-map.js`.** The two produce the same Map for a flat object,
which is why both tasks show the same output. They differ as soon as a value is
itself an object: `fromJS` recurses and gives you a nested Map, `Map()` stores the
plain object untouched. The test suites assert exactly that difference.

**Keys in `4-mutations.js`.** A Map built from an object literal has *string*
keys, so the values are read back with `map2.get('2')`, not `map2.get(2)`.

**Index 4 in `4-mutations.js`.** The task asks to set index 4 to `Oliver`, which
it already is. Immutable returns the same reference when a `set` does not change
anything, so the call is a no-op — it is there to show chaining, not to change a
value.

**`mergeElements` returns a Map.** The task text says "a List", but it takes two
objects and has to let `page2` win on duplicate keys, which is Map merge
semantics — a List has no keys to merge on. `Map` is what the requirement to use
`map` from Immutable.js points at.

**Lint.** `npm run full-test` lints `[0-9]*.js`, which covers the test files too,
so they are airbnb-base clean as well. Single-function files export only a
default — adding a same-named named export alongside it trips
`import/no-named-as-default` at every import site.

## Testing

A test suite per file, 33 tests in total, all passing. Beyond the examples in the
task they cover the immutability guarantees: `addElementToList` leaves its input
List alone, `map2` does not disturb `map`, and `mergeDeeplyElements` and
`printBestStudents` do not touch the objects handed to them.

## Author

Mugisha Joshua
