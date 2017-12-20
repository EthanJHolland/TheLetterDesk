import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { shortid } from 'shortid';

import { LetterService } from '../services/letter.service';
import { Letter } from '../models/letter';

import 'rxjs/add/operator/filter';

@Component({
    selector: 'view-page',
    template: `<paper-component
    [buttonSrc]=buttonSrc
    [letter]=letter
    [canEdit]=canEdit
    (buttonClick)=buttonClick($event)>
    </paper-component>
    `,
})
export class ViewPageComponent implements OnInit{
    letter = new Letter('new');

    canEdit=false;
    buttonSrc='/assets/write_clean.png';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private letterService: LetterService 
      ) {}
    
    ngOnInit(){
        console.log('view page component');
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.letterService.getLetter(params.get('id'))
                .then((letter) => {
                    console.log(letter);
                    if(letter){
                        this.letter=letter;
                    }else{
                        this.router.navigate(['/compose/'+require('shortid').generate()]);
                    }
                });
        });

    }

    buttonClick(){
        //redirect to a new compose
        this.router.navigate(['/compose/'+require('shortid').generate()]);
    }
}