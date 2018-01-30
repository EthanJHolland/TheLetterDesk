import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
 
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class ReadWriteService {
    private headers = new Headers({'Content-Type': 'application/json'});

    private apiUrl = 'http://localhost:3000/readwrite';  // Url that all info Letter 's will be stored at

    constructor(private http: Http) { }

    send(order: number[], times: number[], duration: number[]): Promise<boolean> {
        const url = `${this.apiUrl}/send`;//${letter._id}`;
        return this.http.post(url, JSON.stringify({doc: {order: order, times: times, duration: duration}}), {headers: this.headers}) 
          .toPromise()      //makes the server wait until information is returned
          .then((res) => res['success'])   //indicate success
          .catch(this.handleError);     //catches an error if no letter class object exists
    }

    private handleError(error: any): Promise<any> {     //error message if any error occurs
        console.error('An error occurred', error); 
        return Promise.reject(error.message || error);
    }
};