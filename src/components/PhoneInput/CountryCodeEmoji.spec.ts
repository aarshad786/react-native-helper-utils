/* eslint-env jest */
import { countryCodeEmoji, emojiCountryCode } from "./CountryCodeEmoji";

const INVALID_INPUTS = [undefined, null, false, true, 100, [], {}, "s", "very long string", "ΓΓ", "Γ»Ε", "20"];

const VALID_INPUTS = [
  ["AE", "π¦πͺ"],
  ["CN", "π¨π³"],
  ["GB", "π¬π§"],
  ["UK", "πΊπ°"],
  ["US", "πΊπΈ"],
];

describe("countryCodeEmoji", () => {
  describe.each(INVALID_INPUTS.concat("πΊπΈ"))("`%p` input", (input) => {
    it("should throw a `TypeError`", () => {
      expect(() => countryCodeEmoji(input)).toThrow(TypeError);
    });
  });

  describe.each([...VALID_INPUTS, ["Us", "πΊπΈ"], ["uS", "πΊπΈ"], ["us", "πΊπΈ"]])("`%p` input", (input, expected) => {
    it(`should return '${expected}'`, () => {
      expect(countryCodeEmoji(input)).toBe(expected);
    });
  });
});

describe("emojiCountryCode", () => {
  describe.each(INVALID_INPUTS.concat("π"))("`%p` input", (input) => {
    it("should throw a `TypeError`", () => {
      expect(() => emojiCountryCode(input)).toThrow(TypeError);
    });
  });

  describe.each(VALID_INPUTS.map(([cc, flag]) => [flag, cc]))("`%p` input", (input, expected) => {
    it(`should return '${expected}'`, () => {
      expect(emojiCountryCode(input)).toBe(expected);
    });
  });
});
