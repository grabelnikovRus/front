/**!
 * HTML Form related methods for common application wide use cases.
 *
 * @format
 */

import { formatGroup, splice } from "./string";

export default {
  maskPhone,
  maskNumber,
};

/**
 * Mask value of a phone input field.
 *
 * @public
 * @param {HTMLInputElement} field Form input field element to apply phone mask.
 */
export function maskPhone(field) {
  field.addEventListener(
    "keydown",
    ({ key, target, target: { selectionEnd, selectionStart } }) => {
      if ("0123456789".includes(key)) {
        if (selectionStart < 4) selectionStart = 5;
        else if (selectionStart === 6) selectionStart += 3;
        else if (selectionStart === 11) selectionStart += 2;
        else if (selectionStart === 14) selectionStart += 2;
        else selectionStart += 1;
      } else if (key === "Backspace") {
        if (selectionStart === selectionEnd) {
          if (selectionStart === 8) selectionStart -= 2;
          else selectionStart -= 1;
        }
      } else if (key === "Delete") {
        if (selectionStart === 6) selectionStart += 2;
        if (selectionStart === 11) selectionStart += 1;
        if (selectionStart === 14) selectionStart += 1;
      } else selectionStart = "";
      target.dataset.caret = selectionStart;
    }
  );
  field.addEventListener("input", ({ target, target: { value } }) => {
    let digits = value.replace(/\D/g, "").replace(/^[78]/, "");

    if (digits) {
      let index = 0;

      if (digits.length > index) {
        value = digits;
        index += 3;
        if (digits.length > index) {
          value = splice(value, index, 0, ") ");
          index += 5;
          if (digits.length > index - 2) {
            value = splice(value, index, 0, "-");
            index += 3;
            if (digits.length > index - 3) {
              value = splice(value, index, 0, "-");
            }
          }
        }
        target.value = "+7(" + value.slice(0, 14);
        if (target.dataset.caret)
          target.setSelectionRange(target.dataset.caret, target.dataset.caret);
      } // else target.value = "+7(" + digits;
    } else target.value = "+7(";
    target.dispatchEvent(
      new InputEvent("change", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
  });
}

/**
 * Mask value of a number input field.
 *
 * @public
 * @param {HTMLInputElement} field Form input field element to apply number mask.
 * @param {boolean} float Allow float numbers
 */
export function maskNumber(field, float = false) {
  const allowedChars = "0123456789" + (float ? ".," : ""),
    formatInput = (target) => {
      let haveDot = false;
      const { value } = target,
        digits = float
          ? (value || "")
              .replace(/[^\d\.,]/g, "")
              .split("")
              .reduce((acc, el) => {
                if (el === "." || el === ",") {
                  if (haveDot) return acc;
                  else haveDot = true;
                }
                return (acc += el);
              }, "")
          : (value || "").replace(/\D/g, "");
      if (!digits) {
        target.value = "";
        return;
      }
      target.value = float ? digits : formatGroup(digits);
      if (target.dataset.caret) {
        let caret = Number(target.dataset.caret);
        if (target.value.length < value.length && caret) caret--;
        else if (target.value.length > value.length) caret++;
        target.setSelectionRange(caret, caret);
        target.dataset.caret = caret;
      }
    };
  field.addEventListener("keydown", ({ key, target }) => {
    let { selectionEnd, selectionStart, value } = target;
    if (allowedChars.includes(key)) selectionStart += 1;
    else if (key === "Backspace") {
      if (selectionStart === selectionEnd) {
        if (value[selectionStart - 1] === " ") selectionStart -= 2;
        else selectionStart -= 1;
      }
    } else if (key === "Delete") {
      void 0;
    } else selectionStart += 1;
    target.dataset.caret = selectionStart;
  });
  field.addEventListener("input", ({ target }) => formatInput(target));
  formatInput(field);
}
