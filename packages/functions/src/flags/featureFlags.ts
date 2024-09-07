import Flags from "./flags";
import { getFlagsFromStore, type flagStore } from "./flagsStore";

  const REFRESH_SCHEDULE_MILLISECONDS = 5 * 60 * 1000;
  
  export default class FeatureFlags implements Flags {
    private flagsStore: typeof getFlagsFromStore;
    private flags!: flagStore;

    private cacheInvalidationEpochMilliSeconds: number;
    private refreshScheduleMilliseconds: number;
    private static instance?: FeatureFlags;
  
    constructor(
      flagsRepo: typeof getFlagsFromStore,
      refreshScheduleMilliseconds = REFRESH_SCHEDULE_MILLISECONDS
    ) {
      this.flagsStore = flagsRepo;
      this.refreshScheduleMilliseconds = refreshScheduleMilliseconds;
      this.cacheInvalidationEpochMilliSeconds =
        Date.now() + this.refreshScheduleMilliseconds;
    }
  
    async isFeatureFlagEnabled(featureFlag: string) {
      await this.#refreshConfig();
      return this.flags[featureFlag] ?? false;
    }
  
    /** This needs to be called before accessing the flags. */
    async #refreshConfig() {
      const now = Date.now();
      console.log("now", now);
      console.log("cache", this.cacheInvalidationEpochMilliSeconds);
      if (
        now > this.cacheInvalidationEpochMilliSeconds ||
        this.flags === undefined
      ) {
        this.flags = await this.flagsStore();
        this.cacheInvalidationEpochMilliSeconds =
          now + this.refreshScheduleMilliseconds;
      }
    }
  
    static getInstance() {
      if (!FeatureFlags.instance) {
        FeatureFlags.instance = new FeatureFlags(getFlagsFromStore);
      }
      return FeatureFlags.instance;
    }
  }
  