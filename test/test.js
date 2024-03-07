import { equal, ok } from "assert";
import ling from "../src/index.js";

describe("deserialization", function () {
  it("BigInt 反序列化", function () {
    const jsonString =
      '{"id": 1610942076946493412, "offered": true, "group": {"name": "jn", "address": "hello world"}, "top up": [456, 789], "decimal":6.88}';
    const o = ling.parse(jsonString);
    equal(o.id, 1610942076946493412n);
  });
});

describe("serialization", function () {
  it("BigInt 序列化", function () {
    const o = {
        id: 1610942076946493412n
    }
    ok(ling.stringify(o).indexOf("1610942076946493412n"))
  });
  it("传递多个replacer", function () {
    const o = {
        id: 1610942076946493412n
    }
    ok(ling.stringify(o, function(_key, value) {
      return value
    }).indexOf("1610942076946493412n"))
  });
});
