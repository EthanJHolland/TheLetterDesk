import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';

import { Letter } from '../models/letter';
import { LetterService } from '../services/letter.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'compose-page',
    template: `<compose-component
     [buttonSrc]=buttonSrc
     [letter]=letter
     (buttonClick)=buttonClick($event)>
     </compose-component>
     `
})
export class ComposePageComponent implements OnInit {
    letter: Letter ={
        _id: 'new',
        content: ''
    };
    buttonSrc='/assets/seal_clean.png';

    constructor(private letterService: LetterService, private route: ActivatedRoute, private router: Router){}

    ngOnInit(){
        this.route.paramMap.subscribe((params: ParamMap) => this.letter._id=params.get('id'));
    }

    buttonClick(data){
        //send
        console.log('sending');
        console.log(this.letter);
        this.letterService.update(data);
        this.letterService.send({
            'recipientEmail': 'ontheejh@gmail.com',
            'senderName': 'brad',
            'letterId': 'Peach'
        });
    }
}