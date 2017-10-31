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

    onClick(){
        console.log('clicked');
        this.buttonClick.emit(this.letter);
    }
}