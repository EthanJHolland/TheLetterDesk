import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ReadWriteService } from '../services/readwrite.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'compose-page',
    template: `<compose-component
     [tldid]=tldid
     (send)=send($event)>
     </compose-component>
     `
})
export class ComposePageComponent implements OnInit {
    tldid: string = 'new';

    constructor(
        private readwriteService: ReadWriteService,
         private route: ActivatedRoute, 
         private router: Router){}

    ngOnInit(){
        this.route.paramMap.subscribe((params: ParamMap) => this.tldid=params.get('id'));
    }

    send(doc){
        //send
        console.log('sending');
        this.readwriteService.send(doc);
            //.then((res) => this.router.navigate(['/send/'+data._id]));
    }
}