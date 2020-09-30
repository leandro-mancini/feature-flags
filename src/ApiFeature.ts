import { DEVICE } from './Globals';
import { IFeature } from './IFeature';
import { ApiResponse } from './models/ApiResponse';
import { Feature } from './models/Feature';
export class ApiFeature implements IFeature {
  url: string;
  device: DEVICE;

  constructor(url: string, device: DEVICE) {
    this.url = url;
    this.device = device;
  }

  getFeatures(): Promise<any> {
    const apiURL = this.url + '/flags/features';

    return fetch(apiURL, { method: 'post', body: JSON.stringify({}) })
      .then(this.handleErrors)
      .then((response: Response) => {
        return response.json();
      })
      .then((response: ApiResponse<Feature[]>) => {
        if (response.data && response.data.length > 0) {
          return response.data;
        }

        return response;
      })
      .catch((ex) => {
        // tslint:disable-next-line:no-console
        console.error('Falha ao buscar flags. ' + ex);

        throw Error(ex);
      });
  }

  handleErrors(response: Response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response;
  }
}
