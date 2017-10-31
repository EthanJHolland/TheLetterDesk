import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { shortid } from 'shortid';

import { EnvelopeService } from '../services/envelope.service';
import { Envelope } from '../models/envelope';

import 'rxjs/add/operator/filter';

@Component({
    selector: 'recieve-page',
    template: `<envelope-component
    [envelope]=envelope
    [buttonSrc]=buttonSrc
    [canEdit]=canEdit
    (buttonClick)=buttonClick($event)>
    </envelope-component>
    `
})
export class RecievePageComponent implements OnInit{
    envelope: Envelope = {
        _id: 'new',
        sender_name: '',
        recipient_email: '',
        recipient_name: ''
    };

    canEdit=false;
    buttonSrc='assets/open.png';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private envelopeService: EnvelopeService 
      ) {}
    
    ngOnInit(){
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.envelopeService.getEnvelope(params.get('id'))
                .then((envelope) => {
                    console.log(envelope);
                    if(envelope){
                        this.envelope=envelope;
                    }else{
                        this.router.navigate(['/compose/'+require('shortid').generate()]);
                    }
                });
        });

    }

    buttonClick(data){
        this.router.navigate(['/view/'+this.envelope._id]);
    }
}