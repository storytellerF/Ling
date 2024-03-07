function isNumber(char) {
    return char >= '0' && char <= '9'
}
function skip(char) {
    return char === ' ' || char === '\n' || char === "\t" || char === "\r"
}
function visibleChar(char) {
    if(char === '\n') {
        return "\\n"
    }
    if (char === ' ') {
        return 'backspace'
    }
    return char
}
export {
    isNumber,skip,visibleChar
}