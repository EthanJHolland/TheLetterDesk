import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { ReadWriteService } from '../services/readwrite.service';

import { DBError, isDBError } from '../models/dberror.model';
import { Letter, RetrieveResponse, doesNotExist } from '../models/letter.model';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'compose-page',
    template: `<compose-component
     [tldid]=tldid
     (sendEmitter)=send($event)>
     </compose-component>
     `
})
export class ComposePageComponent implements OnInit {
    tldid: string = 'new';

    constructor(
        private googleanalyticsService: GoogleAnalyticsService,
        private readwriteService: ReadWriteService,
        private route: ActivatedRoute, 
        private router: Router){}

    ngOnInit(){
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.tldid=params.get('id');
            //check if letter exists
            this.readwriteService.retrieve(this.tldid)
                .then((letter: DBError | RetrieveResponse) => {
                    if(isDBError(letter)) {
                        this.googleanalyticsService.logError('checking if tldid is taken', letter.error);
                    } else if (doesNotExist(letter)) {
                        // letter does not exist so can compose
                        this.googleanalyticsService.logPage('compose');
                    } else {
                        // letter already exists so reroute to new compose page
                        this.router.navigate(['/compose'], {queryParamsHandling: 'preserve'})
                    }
                }); 
        });
    }

    send(doc: {letter: Letter} | {letter: Letter, password: string}){
        //send
        console.log('sending2');
        this.readwriteService.send(doc.letter, 'password' in doc ? doc['password'] : undefined);
    }
}