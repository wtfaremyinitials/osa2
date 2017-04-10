var osa = require('..')

var getCurrentTrack = osa(() => Application('iTunes').currentTrack.name())

async function main() {
    try {
        console.log(`Now playing ${await getCurrentTrack()}.`)
    } catch (e) {
        console.log('No music playing.')
    }
}

main()
