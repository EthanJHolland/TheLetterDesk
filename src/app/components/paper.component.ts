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

    onClick(){
        console.log('clicked');
        this.buttonClick.emit(this.letter);
    }

    textChanged(event){
        console.log(event, event.inputType);

        switch(event.inputType){
            case 'insertText': //text
                this.letter.resolveDiff(this.currText, event.data); //event.data holds what was typed    
                break;      
            case 'deleteContentBackward': //backspace
                this.letter.resolveDiff(this.currText, 'backspace' as 'backspace'); //make sure the type is backspace not string
                break;
            case 'deleteContentForward': //delete
                this.letter.resolveDiff(this.currText, 'delete' as 'delete'); //make sure the type is delete not string            
                break;
            case 'insertLineBreak': //new line
                this.letter.resolveDiff(this.currText, '\n');
                break;
            case 'insertFromPaste': //text inserted by pasting

                break;
            case 'deleteByCut': //text cut
                break;
        }

        console.log(this.letter);
        console.log(this.letter.deriveSimpleText());
    }
}