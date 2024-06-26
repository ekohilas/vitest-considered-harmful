import Flags from "../src/flags/flags";

/** Fake flags to be used for testing only. */
export default class FakeFlags implements Flags {
  flagValues = new Map<string, boolean>();

  setGlobalFlagValue(featureFlag: string, value: boolean) {
    this.flagValues.set(featureFlag, value);
  }

  async isFeatureFlagEnabled(featureFlag: string) {
    const flagValue = this.flagValues.get(featureFlag);
    if (flagValue === undefined) {
      throw new Error(
        `FeatureFlag ${featureFlag} not set in fake implementation. Please set it using setGlobalFlagValue.`
      );
    }
    return await Promise.resolve(flagValue);
  }
}
