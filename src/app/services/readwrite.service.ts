import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Constants } from '../constants';
 
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class ReadWriteService {
    private headers = new Headers({'Content-Type': 'application/json'});

    private apiUrl = Constants.API_URL+'/readwrite';  // Url that all info Letter 's will be stored at

    constructor(private http: Http) { }

    send(doc: any): Promise<boolean> {
        const url = `${this.apiUrl}/send`;//${letter._id}`;
        return this.http.post(url, JSON.stringify({doc: doc}), {headers: this.headers}) 
          .toPromise()      //makes the server wait until information is returned
          .then((res) => res['success'])   //indicate success
          .catch(this.handleError);     //catches an error if no letter class object exists
    }

    retrieve(tldid: string): Promise<any> {
        const url = `${this.apiUrl}/retrieve/${tldid}`;
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {     //error message if any error occurs
        console.error('An error occurred', error); 
        return Promise.reject(error.message || error);
    }
};