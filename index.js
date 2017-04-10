var exec = require('child_process').execFile

function osa(fn) {
    var code = `
        ObjC.import('stdlib')
        var fn   = (${fn.toString()})
        var args = JSON.parse($.getenv('OSA_ARGS'))
        var out  = fn.apply(null, args)
        JSON.stringify(out)
    ` 

    var osafn = function(...args) {
        return new Promise((res, rej) => {
            var child = exec('/usr/bin/osascript', ['-l', 'JavaScript'], {
                env: {
                    OSA_ARGS: JSON.stringify(args)
                }
            }, (err, stdout, stderr) => {
                if (err) {
                    return rej(err)
                } 

                if (stderr) {
                    console.log(stderr)
                }

                if (!stdout) {
                    res(undefined)
                }

                try {
                    res(JSON.parse(stdout.toString()))
                } catch(e) {
                    rej(e)
                }
            }) 
            child.stdin.write(code)
            child.stdin.end()
        })
    }
    return osafn
}

module.exports = osa
