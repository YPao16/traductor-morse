require('./style.css');

const textToMorseMap = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
    G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
    M: '--', N: '-.', Ñ: '--.--', O: '---', P: '.--.', Q: '--.-',
    R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--',
    X: '-..-', Y: '-.--', Z: '--..',
    0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-',
    5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
    '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
    '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
    '$': '...-..-', '@': '.--.-.'
};

const morseToTextMap = Object.fromEntries(
    Object.entries(textToMorseMap).map(([character, code]) => [code, character])
);

let isTextToMorse = true;

const btnToggle = document.getElementById('btnToggle');
const lblInput = document.getElementById('lblInput');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const translatorForm = document.getElementById('translatorForm');
const errorMsg = document.getElementById('errorMsg');

const normalizeText = (text) => text
    .normalize('NFD')
    .replace(/n\u0303/gi, 'Ñ')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();

const encodeText = (text) => {
    const normalizedText = normalizeText(text.trim()).replace(/\s+/g, ' ');
    const characters = [...normalizedText];
    const unsupportedCharacter = characters.find(
        (character) => character !== ' ' && textToMorseMap[character] === undefined
    );

    if (unsupportedCharacter) {
        throw new Error(`Carácter no soportado: "${unsupportedCharacter}"`);
    }

    return characters
        .map((character) => character === ' ' ? '/' : textToMorseMap[character])
        .join(' ');
};

const decodeMorse = (code) => {
    const normalizedCode = code
        .trim()
        .replace(/\s*\/\s*/g, ' / ')
        .replace(/\s{3,}/g, ' / ');
    const tokens = normalizedCode.split(/\s+/);
    let previousTokenWasWordSeparator = true;
    let result = '';

    for (const token of tokens) {
        if (token === '/') {
            if (previousTokenWasWordSeparator) {
                throw new Error('El separador de palabras está en una posición inválida.');
            }
            result += ' ';
            previousTokenWasWordSeparator = true;
            continue;
        }

        const character = morseToTextMap[token];
        if (character === undefined) {
            throw new Error(`Código morse inválido: "${token}"`);
        }

        result += character;
        previousTokenWasWordSeparator = false;
    }

    if (previousTokenWasWordSeparator) {
        throw new Error('El código Morse debe terminar con una letra o número.');
    }

    return result;
};

btnToggle.addEventListener('click', () => {
    isTextToMorse = !isTextToMorse;
    btnToggle.innerHTML = isTextToMorse
        ? 'Texto <span aria-hidden="true">→</span> Morse'
        : 'Morse <span aria-hidden="true">→</span> Texto';
    btnToggle.setAttribute('aria-pressed', String(!isTextToMorse));
    lblInput.textContent = isTextToMorse ? 'Tu texto' : 'Tu código Morse';
    inputText.placeholder = isTextToMorse
        ? 'Escribe aquí tu mensaje...'
        : 'Ejemplo: .... --- .-.. .- / -- ..- -. -.. ---';
    document.getElementById('inputHint').textContent = isTextToMorse
        ? 'Se admiten letras, números y signos de puntuación.'
        : 'Separa las letras con espacios y las palabras con / o tres espacios.';
    outputText.placeholder = isTextToMorse
        ? 'Tu traducción aparecerá aquí.'
        : 'El texto traducido aparecerá aquí.';
    inputText.value = '';
    outputText.value = '';
    errorMsg.textContent = '';
    inputText.focus();
});

translatorForm.addEventListener('submit', (event) => {
    event.preventDefault();
    errorMsg.textContent = '';
    outputText.value = '';

    const input = inputText.value.trim();
    if (!input) {
        errorMsg.textContent = 'Escribe un mensaje antes de traducir.';
        inputText.focus();
        return;
    }

    try {
        outputText.value = isTextToMorse ? encodeText(input) : decodeMorse(input);
    } catch (error) {
        errorMsg.textContent = error.message;
        inputText.focus();
    }
});
