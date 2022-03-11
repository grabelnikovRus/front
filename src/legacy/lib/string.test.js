/**
 * @format
 */

import string from "./string";

test("string.formatGroup returns group formatted string", () => {
  expect(string.formatGroup("")).toStrictEqual("");
  expect(string.formatGroup("", "-", 0)).toStrictEqual("");
  expect(string.formatGroup("", "-", 1)).toStrictEqual("");
  expect(string.formatGroup("1")).toStrictEqual("1");
  expect(string.formatGroup("12")).toStrictEqual("12");
  expect(string.formatGroup("123")).toStrictEqual("123");
  expect(string.formatGroup("1234")).toStrictEqual("1 234");
  expect(string.formatGroup("12345")).toStrictEqual("12 345");
  expect(string.formatGroup("123456")).toStrictEqual("123 456");
  expect(string.formatGroup("abcd", "-", 0)).toStrictEqual("a-b-c-d");
  expect(string.formatGroup("abcd", "-", 1)).toStrictEqual("a-b-c-d");
  expect(string.formatGroup("abcd", "-", 2)).toStrictEqual("ab-cd");
});
test("string.splice returns spliced string", () => {
  expect(string.splice("abc")).toStrictEqual("abc");
  expect(string.splice("abc", 0)).toStrictEqual("abc");
  expect(string.splice("abc", 1)).toStrictEqual("abc");
  expect(string.splice("abc", 2)).toStrictEqual("abc");
  expect(string.splice("abc", 3)).toStrictEqual("abc");
  expect(string.splice("abc", 0, 0)).toStrictEqual("abc");
  expect(string.splice("abc", 1, 0)).toStrictEqual("abc");
  expect(string.splice("abc", 2, 0)).toStrictEqual("abc");
  expect(string.splice("abc", 3, 0)).toStrictEqual("abc");
  expect(string.splice("abc", 0, 1)).toStrictEqual("bc");
  expect(string.splice("abc", 1, 1)).toStrictEqual("ac");
  expect(string.splice("abc", 2, 1)).toStrictEqual("ab");
  expect(string.splice("abc", 3, 1)).toStrictEqual("abc");
  expect(string.splice("abc", 0, 2)).toStrictEqual("c");
  expect(string.splice("abc", 1, 2)).toStrictEqual("a");
  expect(string.splice("abc", 2, 2)).toStrictEqual("ab");
  expect(string.splice("abc", 3, 2)).toStrictEqual("abc");
  expect(string.splice("abc", 0, 3)).toStrictEqual("");
  expect(string.splice("abc", 1, 3)).toStrictEqual("a");
  expect(string.splice("abc", 2, 3)).toStrictEqual("ab");
  expect(string.splice("abc", 3, 3)).toStrictEqual("abc");
  expect(string.splice("abc", 0, 0, "-")).toStrictEqual("-abc");
  expect(string.splice("abc", 1, 0, "-")).toStrictEqual("a-bc");
  expect(string.splice("abc", 2, 0, "-")).toStrictEqual("ab-c");
  expect(string.splice("abc", 3, 0, "-")).toStrictEqual("abc-");
  expect(string.splice("abc", 0, 1, "-")).toStrictEqual("-bc");
  expect(string.splice("abc", 1, 1, "-")).toStrictEqual("a-c");
  expect(string.splice("abc", 2, 1, "-")).toStrictEqual("ab-");
  expect(string.splice("abc", 3, 1, "-")).toStrictEqual("abc-");
  expect(string.splice("abc", 0, 2, "-")).toStrictEqual("-c");
  expect(string.splice("abc", 1, 2, "-")).toStrictEqual("a-");
  expect(string.splice("abc", 2, 2, "-")).toStrictEqual("ab-");
  expect(string.splice("abc", 3, 2, "-")).toStrictEqual("abc-");
  expect(string.splice("abc", 0, 3, "-")).toStrictEqual("-");
  expect(string.splice("abc", 1, 3, "-")).toStrictEqual("a-");
  expect(string.splice("abc", 2, 3, "-")).toStrictEqual("ab-");
  expect(string.splice("abc", 3, 3, "-")).toStrictEqual("abc-");
});
