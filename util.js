
// helper function thata return a buffer from a hex-like data
let toBuffer = (data) =>
{
    return Buffer.from(data, 'hex')
}

module.exports = {
    toBuffer
}
