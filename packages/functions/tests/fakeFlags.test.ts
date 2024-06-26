import { describe, it } from "vitest";
import FakeFlags from "./fakeFlags";

describe.concurrent("FakeFlags", () => {
    it("gets a set flag", async ({ expect }) => {
      const fakeFlags = new FakeFlags();
      const expectedFlagValue = true;
      fakeFlags.setGlobalFlagValue("enableV2ExampleFeature", true);
      const actualFlagValue = await fakeFlags.isFeatureFlagEnabled(
        "enableV2ExampleFeature"
      );
      expect(actualFlagValue).toEqual(expectedFlagValue);
    });
  
    it("errors when getting unset flag", ({ expect }) => {
      const fakeFlags = new FakeFlags();
  
      expect(
        fakeFlags.isFeatureFlagEnabled("enableV2ExampleFeature")
      ).rejects.toThrowError();
    });
  });
  