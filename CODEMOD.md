# Index

- [normalize-import-path](#normalize-import-path)
- [shift-imports](#shift-imports)

## Normalize Import Path

Converts relative path of a module reference to a default node_module based path.

**Input:**

```ts
import {a, b, c} from '../../../abc'
```

**Output:**

```ts
import {a, b, c} from 'abc'
```

**tscodemodrc:**

```json
{
  "name": "normalize-import-path",
  "params": {
    // name of the module
    "module": "abc"
  }
}
```

## Shift Imports

Migrates imports from one module to another.

**Input:**

```ts
import {a, b, x, xx} from 'ab'
```

**Output:**

```ts
import {a, b} from 'ab'
import {x, xx} from 'x'
```

**tscodemodrc:**

```json
{
  "name": "shift-imports",
  "params": {

    // name of the source module
    "from": "ab",

    // name of the target module
    "to": "x",

    // all the import specifiers that should be migrated
    "imports": ["x, "xx"]
  }
}
```