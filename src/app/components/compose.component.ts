import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Letter } from '../models/letter';

@Component({
    selector: 'compose-component',
    templateUrl: './templates/compose.container.html',
    styleUrls: ['./templates/paper.css']
})
export class ComposeComponent{
    @Input() letter: Letter;
    @Input() buttonSrc: string;
    @Output() buttonClick: EventEmitter<any> = new EventEmitter();

    onClick(){
        console.log('clicked');
        this.buttonClick.emit(this.letter);
    }
}