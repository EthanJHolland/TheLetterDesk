import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { ReadWriteService } from '../services/readwrite.service';

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
                .then((letter) => {
                    if(letter && !letter.error){
                        //if letter already exists reroute to new compose page
                        this.router.navigate(['/compose'], {queryParamsHandling: 'preserve'})
                    } else {
                        this.googleanalyticsService.logPage('compose');
                    }
                }); 
        });
    }

    send(doc){
        //send
        console.log('sending2');
        this.readwriteService.send(doc);
            //.then((res) => this.router.navigate(['/send/'+data._id]));
    }
}