import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../constants'

import { ReadWriteService } from '../services/readwrite.service'

import * as $ from 'jquery';

@Component({
    selector: 'compose-component',
    templateUrl: './templates/compose.html',
    styleUrls: ['./templates/compose.css']
})
export class ComposeComponent{
    @Input() tldid: string;
    @Output() sendEmitter: EventEmitter<any> = new EventEmitter();
        
    //parallel arrays
    order = []; //order of down presses
    down = []; //down times
    duration = []; //press duration times
    times = []; //absolute continuous times starting from 0
    i = 0; //currently on the ith element of all these parallel arrays
    y = 0; //how many characters in the textarea?
    text: string = ''; //store the text itself for sizing purposes
    location: string = ''; //store location

    constructor(private router: Router, private readwriteService: ReadWriteService) {} //need the router for navigation
        
    keyDown(e) {
        this.order[this.i] = e.which;
        this.down[this.i] = e.timeStamp;
        this.times[this.i] = Math.floor((e.timeStamp - this.down[0]) * 1000) / 1000000;
        
        //press durations must be kept in the same order as other arrays to ensure it is parallel
        //use -1 as a placeholder for now to keep parallel
        //press durations will be updated when the key is released (onkeyup)
        this.duration[this.i] = -1;
        
        this.i++;
    }

    keyUp(e) {
        //find most recent (and only) occurence of e.which in duration for which the value is -1;
        for (var recent = this.i-1; recent>=0; recent--) {
            if ((this.duration[recent] === -1) && (this.order[recent]===e.which)) {                    
                //recent is now set in terms of i
                this.duration[recent] = Math.floor((e.timeStamp - this.down[recent]) * 1000) / 1000000;
            }
        }
        
        //count how many characters until you can send (280+)!
        this.y = this.text.length;
        document.getElementsByClassName('send')[0].innerHTML = "<span style='color: #c62f5a; font-size: 1.15em;'>" + (280-this.y).toString() + "+ </span><span style=''> </span>";
        if (this.y>=280) {
            document.getElementsByClassName('send')[0].innerHTML = "SEND LETTER";
        }
    }
        
    //show stats
    send() {
        if (this.y>=2) {
            //if character count is satisfied (280), then proceed.
            //fade OUT letter writing stuff
            $('.letter').toggleClass('sent');
            $('.send').toggleClass('sent');
            $('.location').toggleClass('sent');
            //fade in new stuff
            $('.getLink-container').toggleClass('sent');

            //tell container to send letter
            console.log('sending1')
            this.sendEmitter.emit({tldid: this.tldid, location: this.location.toLowerCase(), order: this.order, down: this.down, duration: this.duration, times: this.times, text: this.text});
        }
    };
        
    // //copy button -- doesn't work :(
    // copyLink(){
    //     var copyText = document.getElementsByClassName("myurl")[0];
    //     copyText.select();
    //     document.execCommand('copy');
    //     alert("Copied the text: " + copyText.value);
    // }
        
    //generate the appropriate url
    getUrl(){
        return Constants.URL+'/view/'+this.tldid
    }

    //get url for previewing
    getPreviewUrl(){
        // return Constants.URL+'/preview/'+this.tldid
        //for now, make preview same as view
        return Constants.URL+'/view/'+this.tldid
    }

    //preview -- go to link in new tab
    preview(){
        //router can't navigate in new tab so need to use traditional html methods
        window.open(this.getPreviewUrl());
    }
        
    //close -- go back to editing letter if you wish
    close(){
        //fade out link stuff
        $('.getLink-container').toggleClass('sent');
        //fade in old letter writing stuff
        $('.letter').toggleClass('sent');
        $('.send').toggleClass('sent');
        $('.location').toggleClass('sent');   
    }
}