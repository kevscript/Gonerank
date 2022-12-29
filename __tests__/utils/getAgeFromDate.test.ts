import { getAgeFromDate } from "@/utils/getAgeFromDate";

describe("getAgeFromDate", () => {
  it("should return the correct age", () => {
    const age = getAgeFromDate("2011-10-05T14:00:00");
    const age2 = getAgeFromDate("1998-10-05T14:00:00");

    expect(age).toBe(11);
    expect(age2).toBe(24);
  });

  it("should throw error on invalid string param", () => {
    expect(() => getAgeFromDate("hello")).toThrowError(
      "hello is not a valid date string"
    );
  });
});
