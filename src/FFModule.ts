'use strict';

import { ApiFeature } from './ApiFeature';
import { FFConfig } from './FFConfig';
import { DEVICE } from './Globals';

export class FFModule {
  // feature: Feature;
  // fflags: FeatureFlags;
  config: FFConfig;
  // featureName: string;

  constructor(device: DEVICE, url: string) {
    this.config = new FFConfig(device, url);

    // tslint:disable-next-line:no-console
    console.log(this.config);
  }

  getFeature(featureName: string, userID: string): Promise<any> {
    const apiFeature = new ApiFeature(this.config.url, this.config.device);

    return apiFeature.getFeature(featureName, userID);
  }

  isFeatureEnabled(featureName: string, userID: string): Promise<any> {
    const featurePromise = this.getFeature(featureName, userID);

    return featurePromise.then((feature: any) => {
      return feature !== undefined && feature.enabled ? true : false;
    });
  }
}
