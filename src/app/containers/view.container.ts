import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { shortid } from 'shortid';

import { LetterService } from '../services/letter.service';
import { Letter } from '../models/letter';

import 'rxjs/add/operator/filter';

@Component({
    selector: 'view-page',
    templateUrl: './templates/view.container.html'
})
export class ViewPageComponent implements OnInit{
    letter: Letter;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private letterService: LetterService 
      ) {}
    
    ngOnInit(){
        this.letter={
            _id: 'temp',
            content: 'loading...'
        };

        this.letterService.getLetter('Peach')
            .then((letter) => {
                console.log(letter);
                if(letter){
                    this.letter=letter;
                }else{
                    this.router.navigate(['/compose/'+require('shortid').generate()]);
                }
            });

    }

    onReply(){
        this.router.navigate(['/compose/'+require('shortid').generate()]);
    }
}