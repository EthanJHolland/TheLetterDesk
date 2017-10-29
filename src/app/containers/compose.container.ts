import { Component } from '@angular/core';

import { Letter } from '../models/letter';
import { LetterService } from '../services/letter.service';

@Component({
    selector: 'compose-page',
    templateUrl: './templates/compose.container.html'
})
export class ComposePageComponent{
    letter: Letter ={
        _id: 'Peach',
        content: 'Dearest Fruit'
    };

    constructor(private letterService: LetterService){}

    onSend(){
        console.log('sending');
        this.letterService.update(this.letter);
    }
}