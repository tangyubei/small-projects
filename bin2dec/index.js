const MAX_INT = 100_000_000_000;
const binarySet = new Set(['1', '0']);
const decimalSet = new Set([...Array(10).keys()].map(String));
const hexSet = new Set([...decimalSet, 'a', 'b', 'c', 'd', 'e', 'f', 'A', 'B', 'C',' D', 'E', 'F']);
const decToHexMap = new Map([
    [10, 'A'],
    [11, 'B'],
    [12, 'C'],
    [13, 'D'],
    [14, 'E'],
    [15, 'F'],
]);

const hexToBinMap = new Map([
    ['0', '0000'],
    ['1',	'0001'],
    ['2',	'0010'],
    ['3',	'0011'],
    ['4',	'0100'],
    ['5',	'0101'],
    ['6',	'0110'],
    ['7',	'0111'],
    ['8',	'1000'],
    ['9',	'1001'],
    ['A',	'1010'], ['a',	'1010'],
    ['B',	'1011'], ['b',	'1011'],
    ['C',	'1100'], ['c',	'1011'],
    ['D',	'1101'], ['d',	'1011'],
    ['E',	'1110'], ['e',	'1011'],
    ['F',	'1111'], ['f',	'1011'],
]);

document.addEventListener('DOMContentLoaded', async () => {
    const btn = document.querySelectorAll('button');
    const binary_input = document.getElementById('binary-input');
    const hex_input = document.getElementById('hex-input');
    const decimal_input = document.getElementById('decimal-input');

    const binaryPopover = await createManualPopover(binary_input, "Can only enter 0 or 1 digits.")
    const hexPopover = await createManualPopover(hex_input, "Can only enter digits from 0 to 9 inclusive and A,B,C,D,E,F.")
    const decimalPopover = await createManualPopover(decimal_input, "Can only enter digits from 0 to 9 inclusive.")

    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', async () => {
        binary_input.value = "";
        hex_input.value = "";
        decimal_input.value = "";
    })

    const randomizeBtn = document.getElementById('randomize');
    randomizeBtn.addEventListener('click', async () => {
        decimal_input.value = Math.floor(Math.random() * MAX_INT);
        hex_input.value = decToHex(decimal_input.value);
        binary_input.value = hexToBin(hex_input.value);
    })

    btn.forEach(btn => {
        btn.addEventListener('click', event => {
            switch (btn.id) {
                case 'bin-btn':
                    decimal_input.value = binToDec(Number(binary_input.value));
                    hex_input.value = decToHex(Number(decimal_input.value));
                    break;
                case 'hex-btn':
                    binary_input.value = hexToBin(hex_input.value);
                    decimal_input.value = binToDec(binary_input.value);
                    break;
                case 'dec-btn':
                    hex_input.value = decToHex(decimal_input.value);
                    binary_input.value = hexToBin(hex_input.value);
                    break;
            }
        })
    })
    validateKeys(binary_input, binarySet, binaryPopover);
    validateKeys(hex_input, hexSet, hexPopover);
    validateKeys(decimal_input, decimalSet, decimalPopover);
});

function inputToArray(input) {
    let arr = [];
    while (input > 0) {
        arr.push(input % 10);
        input = Math.floor(input / 10);
    }
    return arr;
}

function binToDec(input) {
    let arr = inputToArray(input);
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        result += Math.pow(2, i) * arr[i];
    }
    return result;
}

function decToHex(input) {
    let arr = [];
    let remainder = 0;
    while (input > 0) {
        remainder = input%16;
        if (remainder > 9) {
            arr.unshift(decToHexMap.get(remainder));
        }
        else { arr.unshift(remainder)}
        input = Math.floor(input / 16);
    }
    return arr.join('');
}

function hexToBin(input) {
    let arr = [];
    for (let i = 0; i < input.length; i++) {
        arr.push(hexToBinMap.get(input[i]))
    }
    return arr.join('');
}

async function createManualPopover(targetEl, message, options = {}) {
    if (document.readyState === 'loading') {
        await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve, {once: true});
        });
    }

    const config = {
        trigger: 'manual',
        content: message,
        placement: 'right',
        container: 'body',
        ...options
    };
    return new bootstrap.Popover(targetEl, config);
}

function validateKeys(targetEl, keys, popover) {
    targetEl.addEventListener('keydown', function (event) {
        if (!keys.has(event.key) && event.key !== 'Backspace') {
            popover.show();
            event.preventDefault();
        } else {
            popover.hide();
        }
    });
}
