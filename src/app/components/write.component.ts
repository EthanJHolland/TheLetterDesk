import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReadWriteService } from '../services/readwrite.service';

import * as $ from 'jquery';

@Component({
    selector: 'write-component',
    templateUrl: './templates/write.html',
    styleUrls: ['./templates/readwrite.css']
})
export class WriteComponent{ 
    @Output() send: EventEmitter<any> = new EventEmitter();
    @Input() tldId: string;
    url: string = 'http://localhost:4200/view/'; //add the tldId to get the url where the sent letter can be viewed
    sent: boolean =  false; //indicate when to show that the message has been sent
   
    //parallel arrays
    order: number[] = []; //order of down presses
    down: number[] = []; //down times
    duration: number[] = []; //press duration times
    times: number[] = []; //absolute continuous times starting from 0
    i = 0; //currently on the ith element of all these parallel arrays

    constructor(private readwriteService: ReadWriteService){}
    
    keydown(e) {
        this.order[this.i] = e.which;
        this.down[this.i] = e.timeStamp;
        this.times[this.i] = Math.floor((e.timeStamp - this.down[0]) * 1000) / 1000000;
        
        //press durations must be kept in the same order as other arrays to ensure it is parallel
        //use -1 as a placeholder for now to keep parallel
        //press durations will be updated when the key is released (onkeyup)
        this.duration[this.i] = -1;
        
        this.i++;
    }

    keyup(e) {
        //find most recent (and only) occurence of e.which in duration for which the value is -1;
        for (var recent = this.i-1; recent>=0; recent--) {
            if ((this.duration[recent] === -1) && (this.order[recent]===e.which)) {                    
                //recent is now set in terms of i
                this.duration[recent] = Math.floor((e.timeStamp - this.down[recent]) * 1000) / 1000000;
            }
        }
    }
    
    onSend() {
        console.log(this.order);
        console.log(this.times);
        console.log(this.duration);
        
        this.send.emit({tldId: this.tldId, order: this.order, times: this.times, duration: this.duration});
           // .then((res) => this.router.navigate(['/send/'+data._id]));
        this.sent=true;
        $(".body").toggleClass("typing"); //change the body background
    }
}