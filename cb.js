var osa = require('.')
var assert = require('assert')

var osacb = function(fn) {
    return function osacbfn(...allArgs) {
        assert(
            allArgs.length >= 1,
            'last arg must be a callback'
        )
        assert(
            typeof(allArgs[allArgs.length - 1]) == 'function',
            'last arg must be a callback'
        )

        var cb = allArgs[allArgs.length - 1]
        var args = allArgs.slice(0, allArgs.length - 1)

        osa(fn).apply(null, args).then(
            res => cb(null, res),
            err => cb(err, null)
        )
    }
}

module.exports = osacb
