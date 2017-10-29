import { Envelope } from '../models/envelope';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
 
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class EnvelopeService {

    private headers = new Headers({'Content-Type': 'application/json'});
    
    private envelopeUrl = 'http://localhost:3000/envelope';  // Url that all Envelope 's will be stored at
    
    constructor(private http: Http) { }

    getEnvelope(_id: string): Promise<Envelope> {  //pulls off a envelope class object envelope from a storage at a url
        console.log('retrieving envelope');
        const url = `${this.envelopeUrl}/retrieve/${_id}`;  //creates the url that will be accessed, based on the id given
        return this.http.get(url)
                .toPromise()    //makes the server wait until information is returned
                .then(response => response.json().data as Envelope)
                .catch(this.handleError);   //catches an error if no envelope class object exists at that url
    }
    update(envelope: Envelope): Promise<Envelope> {   //puts a Envelope class object envelope at the url envelopeUrl/letter.id
        console.log('getting envelope');
        console.log(envelope);
        const url = `${this.envelopeUrl}/send`;//${envelope._id}`;   //generates the storage url for envelope
        return this.http.post(url, JSON.stringify({envelope: envelope}), {headers: this.headers}) 
          .toPromise()      //makes the server wait until information is returned
          .then(() => envelope)   //???
          .catch(this.handleError);     //catches an error if no envelope class object exists
    }
    private handleError(error: any): Promise<any> {     //error message if any error occurs
        console.error('An error occurred', error); 
        return Promise.reject(error.message || error);
    }

}
