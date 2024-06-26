export default interface Flags {
  isFeatureFlagEnabled(toggle: string): Promise<boolean>;
}
