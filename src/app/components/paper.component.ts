import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Letter } from '../models/letter';

@Component({
    selector: 'paper-component',
    templateUrl: './templates/paper.html',
    styleUrls: ['./templates/paper.css']
})
export class PaperComponent{
    @Input() letter: Letter;
    @Input() buttonSrc: string;
    @Input() canEdit: boolean;
    @Output() buttonClick: EventEmitter<any> = new EventEmitter();
    currText: string; //the current text
    cursorPos = 0; //the index of the cursor
    count=0;

    onClick(){
        console.log('clicked');
        this.buttonClick.emit(this.letter);
    }

    textChanged(event){
        console.log('&');
        // this.letter.resolveDiff(this.currText);
        // console.log(this.letter);
        // console.log(this.letter.deriveSimpleText());
        console.log(this.cursorPos);
        this.getCursorPosition(event);
    }
        
    getCursorPosition($event){
        //to add support for other browsers see 
        //http://blog.sodhanalibrary.com/2015/02/get-cursor-position-in-text-input-field.html#.WjnbXt-nFPY

        console.log('.');
        const field=$event.target; 
        if(field.selectionStart){
            this.cursorPos = field.selectionStart;
        }else{
            this.cursorPos = 0;
        }

        console.log(this.cursorPos);        
    }
}