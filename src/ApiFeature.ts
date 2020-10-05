import { DEVICE } from './Globals';
import { IFeature } from './IFeature';
import { ApiResponse } from './models/ApiResponse';
import { Feature } from './models/Feature';
import { Observable, of } from 'rxjs';
import { mergeMap, map, finalize } from 'rxjs/operators';
import * as lodash from 'lodash';

export class ApiFeature implements IFeature {
  url: string;
  device: DEVICE;

  constructor(url: string, device: DEVICE) {
    this.url = url;
    this.device = device;
  }

  teste(featureName?: string): Observable<any> {
    if (featureName) {
      return this.testeGetFeatureName(featureName);
    }

    return this.testeGetFeatures();
  }

  testeGetFeatureName(featureName: string): Observable<any> {
    return this.testeGetFeatures().pipe(
      map(items => this.testeMapFeature(items))
    );
  }

  testeGetFeatures(): Observable<any> {
    const apiURL = this.url + '/flags/features';

    return Observable.create((observer: any) => {
      fetch(apiURL, { method: 'post', body: JSON.stringify({}) })
        .then(this.handleErrors)
        .then((response: Response) => {
          return response.json();
        })
        .then((response: ApiResponse<Feature[]>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
  }

  testeMapFeature(items: any[]): string {
    return 'teste';
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
