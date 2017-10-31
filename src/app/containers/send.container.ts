import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { shortid } from 'shortid';

import { EnvelopeService } from '../services/envelope.service';
import { Envelope } from '../models/envelope';

import 'rxjs/add/operator/filter';

@Component({
    selector: 'send-page',
    template: `<envelope-component
    [buttonSrc]=buttonSrc
    [envelope]=envelope
    [canEdit]=canEdit
    (buttonClick)=buttonClick($event)>
    </envelope-component>
    `
})
export class SendPageComponent implements OnInit{
    envelope: Envelope = {
        _id: 'new',
        sender_name: '',
        recipient_email: '',
        recipient_name: ''
    };

    canEdit=true;
    buttonSrc='assets/send.png';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private envelopeService: EnvelopeService 
      ) {}
    
    ngOnInit(){
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.envelope._id=params.get('id');
            //TODO: check if the corresponding letter exists and if not redirect
        });
    }

    buttonClick(data){
        this.envelopeService.update(data);
        //this.envelopeService.send(data);
        this.router.navigate(['/compose/'+require('shortid').generate()]);
    }
}