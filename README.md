# node-yaml-loader
Adds the ability to import yaml files to Node.js.

## Usage

```bash
node --import=node-yaml-loader myscript.js
```
```yml
# file.yaml
description: 'This is a test file.'
```
```js
// myscript.js
import someYamlFile from './path/to/file.yaml' with { type: 'yaml' };

console.log(someYamlFile);
// Output: { description: "This is a test file." }
```
