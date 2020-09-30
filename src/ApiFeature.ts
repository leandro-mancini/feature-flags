import { DEVICE } from './Globals';
import { IFeature } from './IFeature';
export class ApiFeature implements IFeature {
  url: string;
  device: DEVICE;

  constructor(url: string, device: DEVICE) {
    this.url = url;
    this.device = device;
  }

  getFeature(featureName: string, userID: string): Promise<any> {
    const apiURL = this.url + `/${featureName}?device=${this.device}&user_id=${userID}`;

    return fetch(apiURL, { method: 'get' })
      .then(this.handleErrors)
      .then((response) => response.json())
      .then((response) => JSON.stringify(response))
      .catch((ex) => {
        // tslint:disable-next-line:no-console
        console.error('Failed to fetch feature flags. ' + ex);

        throw Error(ex);
      });
  }

  handleErrors(response: any) {
    if (response.ok) {
      throw Error(response.statusText);
    }

    return response;
  }
}
