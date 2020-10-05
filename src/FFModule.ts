'use strict';

import { Observable, of } from 'rxjs';
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
  }

  getFeatures(): Promise<any> {
    const apiFeature = new ApiFeature(this.config.url, this.config.device);

    return apiFeature.getFeatures();
  }

  isFeatureEnabled(): Promise<any> {
    const featurePromise = this.getFeatures();

    return featurePromise.then((features: any) => {
      return features;
    });
  }

  teste(): Observable<any> {
    const apiFeature = new ApiFeature(this.config.url, this.config.device);

    return of(apiFeature.teste());
  }
}
