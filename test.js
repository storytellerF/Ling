import LING from "./index.js"

// const jsonString = "{\"id\": 1610942076946493412, \"offered\": true, \"group\": {\"name\": \"jn\", \"address\": \"hello world\"}, \"top up\": [456, 789], \"decimal\":6.88}"
const jsonString = "{\"test\": 6.88}"
console.log(LING.parse(jsonString))
console.log(JSON.parse(jsonString));
