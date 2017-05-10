var test = require('ava')
var osa = require('.')
var osacb = require('./cb')

test('script execution', async t => {
    var fn = osa(name => 'Hello there, ' + name + '!')
    t.is(await fn('nodejs'), 'Hello there, nodejs!')
})

test('system access', async t => {
    var fn = osa(() => Application('System Events').currentUser.name())
    t.is(await fn(), process.env.USER)
})

test('multiline', async t => {
    var fn = osa(function() {
        var foo = 'bar'
        var baz = 'foo'
        return baz + foo
    })
    t.is(await fn(), 'foobar')
})

test('undefined return', async t => {
    var fn = osa(() => {})
    t.is(await fn(), undefined)
})

test.cb('callback mode', t => {
    t.plan(2)

    var fn = osacb(name => 'Hello there, ' + name + '!')
    fn('nodejs', (err, data) => {
        t.is(err, null)
        t.is(data, 'Hello there, nodejs!')
        t.end()
    })
})
