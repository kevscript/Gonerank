import { noTimezone } from "@/utils/noTimezone";

describe("noTimezone", () => {
  it("returns an ISO string without timezone", () => {
    const date = new Date("2011-10-05T14:48:00.000Z");
    const dateWithoutTimezone = noTimezone(date).toISOString();

    expect(dateWithoutTimezone).toBe("2011-10-05T16:48:00.000Z");
  });
});
