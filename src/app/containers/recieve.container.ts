import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { shortid } from 'shortid';

import { LetterService } from '../services/letter.service';
import { Letter } from '../models/letter';

import 'rxjs/add/operator/filter';

@Component({
    selector: 'recieve-page',
    templateUrl: '../components/templates/paper.html'
})
export class RecievePageComponent implements OnInit{
    letter: Letter={
        _id: 'new',
        content: 'loading...'
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private letterService: LetterService 
      ) {}
    
    ngOnInit(){
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.letter.content=params.get('id');
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

    onReply(){
        this.router.navigate(['/compose/'+require('shortid').generate()]);
    }
}