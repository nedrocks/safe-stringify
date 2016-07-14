Safe Stringify
==============
Handles safely stringifying circular objects. To use, simply replace calls to
`JSON.stringify` with

```
import safeStringify from 'safe-stringify';
...
safeStringify(obj);
```
