import LING from "./index.js"

const jsonString = "{\"id\": 1610942076946493412, \"offered\": true, \"group\": {\"name\": \"jn\", \"address\": \"hello world\"}}"

console.log(LING.parse(jsonString))
console.log(JSON.parse(jsonString));
