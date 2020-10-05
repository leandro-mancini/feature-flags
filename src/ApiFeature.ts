import { DEVICE } from './Globals';
import { IFeature } from './IFeature';
import { ApiResponse } from './models/ApiResponse';
import { Feature } from './models/Feature';
import { Observable, of } from 'rxjs';
export class ApiFeature implements IFeature {
  url: string;
  device: DEVICE;

  constructor(url: string, device: DEVICE) {
    this.url = url;
    this.device = device;
  }

  teste(): Observable<any> {
    // return of('teste');
    const apiURL = this.url + '/flags/features';

    return Observable.create((observer: any) => {
      fetch(apiURL, { method: 'post', body: JSON.stringify({}) })
        .then(this.handleErrors)
        .then((response: Response) => {
          return response.json();
        })
        .then((response: ApiResponse<Feature[]>) => {
          if (response.data && response.data.length > 0) {
            observer.next(response.data);
            // return response.data;
          }

          observer.next(response);
          observer.complete();

          return response;
        })
        .catch((err) => observer.error(err));
    });
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
