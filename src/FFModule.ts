'use strict';

import { Observable, of } from 'rxjs';
import { ApiFeature } from './ApiFeature';
import { FFConfig } from './FFConfig';
import { DEVICE } from './Globals';
import { map } from 'rxjs/operators';
import { Feature } from './models/Feature';
import * as lodash from 'lodash';

export class FFModule {
  // feature: Feature;
  // fflags: FeatureFlags;
  config: FFConfig;
  // featureName: string;

  get ffeature(): Feature {
    const a = Object.arguments;

    // tslint:disable-next-line:no-console
    console.log(a);
    // tslint:disable-next-line:no-console
    console.log(typeof arguments);

    return lodash.find(this.features, { name: 'featureName' }) as Feature;
  }

  getFeature(featureName: string): any {
    return lodash.find(this.features, { name: featureName });
  }

  get features(): Feature[] {
    return this.FEATURES;
  }
  set features(value: Feature[]) {
    this.FEATURES = value;
  }
  FEATURES: Feature[] = [];

  constructor(device: DEVICE, url: string) {
    this.config = new FFConfig(device, url);

    this.teste().subscribe((res) => (this.FEATURES = res));
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

    return apiFeature.teste();
  }

  testeGetFeature(featureName: string): Observable<any> {
    const apiFeature = new ApiFeature(this.config.url, this.config.device);

    return apiFeature.teste(featureName).pipe(map((item: Feature) => this.testeTransformType(item)));
  }

  testeTransformType(item: Feature) {
    let type;

    if (item.type === 'B') {
      type = JSON.parse(item.value);
    }

    return type;
  }
}
