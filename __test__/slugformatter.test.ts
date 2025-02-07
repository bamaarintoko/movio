import { slugformatter } from "@/lib/functions";

describe("slugformatter function", () => {
    test("replaces spaces with hyphens", () => {
      expect(slugformatter("Hello World")).toBe("hello-world");
    });
  
    test("removes special characters", () => {
      expect(slugformatter("Next.js is awesome!!")).toBe("next-js-is-awesome");
    });
  
    test("replaces underscores with hyphens", () => {
      expect(slugformatter("React_Next_Test")).toBe("react-next-test");
    });
  
    test("converts uppercase letters to lowercase", () => {
      expect(slugformatter("Hello")).toBe("hello");
    });
  
    test("keeps already formatted slugs unchanged", () => {
      expect(slugformatter("already-formatted")).toBe("already-formatted");
    });
  
    test("returns empty string when input is empty", () => {
      expect(slugformatter("")).toBe("");
    });
  });