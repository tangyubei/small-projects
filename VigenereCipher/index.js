const OFFSET = 97;
document.addEventListener('DOMContentLoaded', () => {
    const secretKey = document.getElementById('secretKey');
    const inputText = document.getElementById('input-text');
   // secretKey.addEventListener('click', toggleGo(secretKey, inputText));
    // inputText.addEventListener('click', toggleGo(secretKey, inputText));
    secretKey.addEventListener('input', (event) => {
        toggleGo(secretKey, inputText)})
    inputText.addEventListener('input', (event) => {
        toggleGo(secretKey, inputText)})

    const encodeBtn = document.getElementById('encode-btn');
    const decodeBtn = document.getElementById('decode-btn');
    const output = document.getElementById('output');
    encodeBtn.addEventListener('click', (event) => {
        output.textContent = encodeMessage(secretKey.value, inputText.value, 1)
    })

    decodeBtn.addEventListener('click', (event) => {
        output.textContent  = encodeMessage(secretKey.value, inputText.value, 0)
        console.log(encodeMessage(secretKey.value, inputText.value, 0))
    })
})

function toggleGo(input1, input2) {
    const encode = document.getElementById('encode-btn')
    const decode = document.getElementById('decode-btn')

    encode.disabled = !(input1.value.trim() && input2.value.trim())
    decode.disabled = !(input1.value.trim() && input2.value.trim())
}

function encodeMessage(secret, text, flag) {
    let encoded = ""
    let i = 0
    let num = 0
    const newText = sanitizeInput(text)
    for (const element of newText) {
        if (flag === 1)  {
            num = element.charCodeAt(0)  + secret[i].charCodeAt(0) - OFFSET
            if (num > 122) {num -= 26}
        }
        else {
            num = element.charCodeAt(0) - secret[i].charCodeAt(0)
            if (num < 1) {num += 26}
            num += OFFSET
        }
        if (i === secret.length - 1) { i = 0} else {i += 1}

       // if (num > 'z'.charCodeAt(0)) {num -= 26}
        encoded += String.fromCharCode(num)
    }
    return encoded.toUpperCase()
}

function sanitizeInput(input) {
    return input.replace(/[^a-zA-Z ]/g, "").toLowerCase()
}
