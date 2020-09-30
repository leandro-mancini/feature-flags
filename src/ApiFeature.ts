import { DEVICE } from './Globals';
import { IFeature } from './IFeature';
export class ApiFeature implements IFeature {
  url: string;
  device: DEVICE;

  constructor(url: string, device: DEVICE) {
    this.url = url;
    this.device = device;
  }

  getFeatures(): Promise<any> {
    const apiURL = this.url;

    return fetch(apiURL, { method: 'post', body: JSON.stringify({}) })
      .then(this.handleErrors)
      .then((response) => response.json())
      .then((response) => JSON.stringify(response))
      .catch((ex) => {
        // tslint:disable-next-line:no-console
        console.error('Falha ao buscar flags. ' + ex);

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
