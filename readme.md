osa2
===

![](https://img.shields.io/npm/dm/osa2.svg)
![](https://img.shields.io/npm/v/osa2.svg)
![](https://img.shields.io/npm/l/osa2.svg)

> Interact with Apple's Open Scripting Architecture from node.js

// TODO: Explain what this is

// TODO: Plug `jxa`

Installation
===

```bash
npm install osa2 --save
```

Usage
===

Get the currently playing iTunes track

```js
var osa = require('osa2')

var track = osa(() => {
    return Application('iTunes').currentTrack.name()
})

track().then(console.log).catch(console.error)
```

Show an alert

```js
var osa = require('osa2')

function alert(message) {
    return osa(text => {
        var app = Application.currentApplication()
        app.includeStandardAdditions = true
        app.displayAlert(text)
    })(message)
}

alert('Hello World')
```

API
===

### Execute code in the JavaScript for Automation environment

`osa(function) -> function`

Wraps `function` to be run inside Apple's JavaScript for Automation environment.

**function**

Type: `function`

The code to be run inside the JXA environment. ***NOTE:*** `function` cannot close over variables in a parent's scope.
Pass data as arguments explicitly instead.

**return**

Type: `function`

Returns a new function with the same arguments as `function`, but when called
the code is run inside the JXA environment. This is done asynchronously,
therefore promise is returned.

```js
var greet = osa(name => `Hello from JXA, ${name}!`)

greet('Will').then(text => {
    console.log(text) // Hello from JXA, Will!
})
```
