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

osa(() => {
    Application('iTunes').currentTrack.name()
})().then(track => {
    console.log(`Now playing ${track}.`)
}).catch(() => {
    console.log(`No iTunes music playing.`)
})
```

Play a song on iTunes

```js
var osa = require('osa2')

function play(songtitle) {
    return osa(title => {
        var app = Application('iTunes')
        var track = app.playlists[0].tracks.whose({name:{_contains:title}})[0]
        track.play()
    })(songtitle)
}

play('Pay No Mind')
```

API
===

### Execute code in the JavaScript for Automation environment

`osa(function(T)) -> (function(T) -> Promise<R>)`

Wraps `function` to be run inside Apple's JavaScript for Automation environment.

**function**

Type: `function`

The code to be run inside the JXA environment.

**NOTE:** `function` cannot close over variables in a parent's scope.
Pass data as arguments explicitly instead.

**return**

Type: `function`

Returns a new function with the same arguments as `function`, but when called
the code is run inside the JXA environment. This is done asynchronously,
therefore promise is returned.

```js
var fn = osa(name => `Hello from JXA, ${name}!`)

fn('Will').then(text => {
    console.log(text) // Hello from JXA, Will!
})
```
