import { afterEach, beforeEach, describe, it, vi } from "vitest";
import FeatureFlags from "../src/flags/featureFlags";
import { mockDeep } from "vitest-mock-extended";
import { FlagsStore, getFlagsFromStore } from "../src/flags/flagsStore";

// TODO: Make concurrent once issue related to importing/mocking getFlagRepo within FeatureFlags is resolved.
describe.concurrent("FeatureFlags", () => {
  const fakeDate = Date.now();
  const zeroRefreshScheduleMilliseconds = 0;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(fakeDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("gets a disabled flag", async ({ expect }) => {
    const mockedGetFlagsStore = mockDeep<FlagsStore>();

    const fakeFlags = {
      testFlagOff: false,
    };
    mockedGetFlagsStore.getFlagsFromStore.mockResolvedValue(fakeFlags);

    const featureFlags = new FeatureFlags(mockedGetFlagsStore);
    const exampleEnabled = await featureFlags.isFeatureFlagEnabled(
      "testFlagOff"
    );
    expect(exampleEnabled).toBeFalsy();
  });

  it("gets an enabled flag", async ({ expect }) => {
    const mockedGetFlagsStore = mockDeep<FlagsStore>();

    const fakeFlags = {
      testFlagOn: true,
    };
    mockedGetFlagsStore.getFlagsFromStore.mockResolvedValue(fakeFlags);

    const featureFlags = new FeatureFlags(mockedGetFlagsStore);
    const flagValue = await featureFlags.isFeatureFlagEnabled("testFlagOn");
    expect(flagValue).toBeTruthy();
  });

  it("returns false when given a valid unset flag", async ({ expect }) => {
    const mockedGetFlagsStore = mockDeep<FlagsStore>();
    mockedGetFlagsStore.getFlagsFromStore.mockResolvedValue({});

    const featureFlags = new FeatureFlags(mockedGetFlagsStore);
    const flagValue = await featureFlags.isFeatureFlagEnabled("unsetFlag");

    expect(flagValue).toBeFalsy();
  });

  it("does not refresh when under the schedule", async ({ expect }) => {
    const mockedGetFlagsStore = mockDeep<FlagsStore>();
    mockedGetFlagsStore.getFlagsFromStore.mockResolvedValue({});

    const featureFlags = new FeatureFlags(
      mockedGetFlagsStore,
      zeroRefreshScheduleMilliseconds
    );

    await featureFlags.isFeatureFlagEnabled("testFlag");
    expect(mockedGetFlagsStore.getFlagsFromStore
    ).toHaveBeenCalledTimes(1);

    await featureFlags.isFeatureFlagEnabled("testFlag");
    expect(mockedGetFlagsStore.getFlagsFromStore).toHaveBeenCalledTimes(1);
  });

  it("does refresh when over the schedule", async ({ expect }) => {
    const mockedGetFlagsStore = mockDeep<FlagsStore>();
    mockedGetFlagsStore.getFlagsFromStore.mockResolvedValue({});

    const featureFlags = new FeatureFlags(
      mockedGetFlagsStore,
      zeroRefreshScheduleMilliseconds
    );

    await featureFlags.isFeatureFlagEnabled("testFlag");
    expect(mockedGetFlagsStore.getFlagsFromStore).toHaveBeenCalledTimes(1);

    vi.setSystemTime(fakeDate + 1);
    await featureFlags.isFeatureFlagEnabled("testFlag");
    expect(mockedGetFlagsStore.getFlagsFromStore).toHaveBeenCalledTimes(2);
  });
});
