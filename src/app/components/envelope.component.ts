import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Envelope } from '../models/envelope';

@Component({
    selector: 'envelope-component',
    templateUrl: './templates/envelope.html',
    styleUrls: ['./templates/envelope.css']
})
export class EnvelopeComponent{
    @Input() envelope: Envelope;
    @Input() buttonSrc: string;
    @Input() canEdit: boolean;
    @Output() buttonClick: EventEmitter<any> = new EventEmitter();

    onClick(){
        this.buttonClick.emit(this.envelope);
    }
}