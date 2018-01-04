import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Letter } from '../models/letter';
import { Selection } from '../models/selection';

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
    count=0;
    keyDownSelection: Selection;

    onClick(){
        console.log('clicked');
        this.buttonClick.emit(this.letter);
    }

    textChanged(event){
        console.log(this.keyDownSelection);
        console.log(event);
        console.log(this.getCursorPos());
        console.log('-');
        //this.letter.resolveDiff(this.currText);
    }

    keyup(){
        console.log('up');
    }

    keydown(){
        console.log('down');
    }

    getCursorPos() {
        const el = document.getElementById("textarea") as HTMLTextAreaElement; //cast so you can access textarea specific elements
        el.focus();
        var start = 0, end = 0, normalizedValue, range,
            textInputRange, len, endRange;
    
        //note this does not work for IE
        if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
            start = el.selectionStart;
            end = el.selectionEnd;
        }
    
     //   console.log(start+' '+end);
        return {
            start: start,
            end: end
        } as Selection
    }
}