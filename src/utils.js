/**
 * 判断是否是数字
 * @param {char} char 正在处理的字符
 * @returns 是否是数字
 */
function isNumber(char) {
  return char >= "0" && char <= "9";
}
/**
 * 空格不需要处理，判断是否是空格
 * @param {char} char 正在处理的字符
 * @returns 返回是否需要跳过
 */
function skip(char) {
  return char === " " || char === "\n" || char === "\t" || char === "\r";
}

/**
 * 将不易观察的字符转换成易观察的字符或字符串
 * @param {char} char 可能是个不可见的字符
 * @returns 人类友好的字符或字符串
 */
function visibleChar(char) {
  if (char === "\n") {
    return "\\n";
  }
  if (char === " ") {
    return "backspace";
  }
  return char;
}

export { isNumber, skip, visibleChar };
