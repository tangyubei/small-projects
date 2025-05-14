
document.addEventListener('DOMContentLoaded', (event) => {
    const btn = document.getElementById('submit-btn')
    const input = document.getElementById('floatingTextArea2')
    input.addEventListener('input', (event) => {
        let charNum = input.value.length
    })
    btn.addEventListener('click', (event) => {
        calcAndDisplayFreq(input)
    })
})

function calcAndDisplayFreq(input) {
    // sanitize input
    let inputStr = input.value.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ")
    const arr = inputStr.split(" ").filter(token => token.length > 0);
    let map = new Map()
    arr.forEach(n => map.set(n, (map.get(n)+1) || 1))
    const sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));

    const listGroup = document.getElementById('frequency-table')
    const tbody = listGroup.tBodies[0]
    tbody.innerHTML = ''
    sortedMap.forEach((val, key) => {
        const row = tbody.insertRow()
        const keyCell = row.insertCell()
        const valueCell = row.insertCell()
        keyCell.innerText = key
        valueCell.innerText = val
    } )
}