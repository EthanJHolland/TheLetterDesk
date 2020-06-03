import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../constants'

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

    debugMode = false; //debug mode indicates letter is being written for debugging/testing purposes
    i = 0; //currently on the ith element of all these parallel arrays
    text: string = ''; //store the text itself for sizing purposes
    location: string = ''; //store location

    constructor(private router: Router, private route: ActivatedRoute) {} //need the router for navigation

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.debugMode = 'debug' in params && params['debug'].toLowerCase() == 'true';
        });
    }

    placeholderText () {
        return 'write ' + Constants.MIN_LETTER_LEN + '+ characters to send a letter';
    }
        
    keyDown(e: KeyboardEvent) {
        if (!e.ctrlKey && !e.altKey && e.which != 16){ //ignore control sequences, shift key
            
            //check to see if SHIFT is being held
            if (e.shiftKey) {
                //if shift is being held while another key is pressed, store 1000X the normal keyCode
                this.order[this.i] = e.which*1000;
            }
            else {
                this.order[this.i] = e.which;
            }
            
            this.down[this.i] = e.timeStamp;
            this.times[this.i] = Math.floor((e.timeStamp - this.down[0]) * 1000) / 1000000;
            
            //press durations must be kept in the same order as other arrays to ensure it is parallel
            //use -1 as a placeholder for now to keep parallel
            //press durations will be updated when the key is released (onkeyup)
            this.duration[this.i] = -1;
            
            this.i++;
    
            //handle tabs so that they insert a tab rather than moving the focus to the next focusable element
            if (e.which === 9) {
                var letterElem: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("LETTER"); //cast to HTMLTextAreaElement to access text area properties
                const newCursorPos = letterElem.selectionStart + 1;
    
                $("#LETTER").addClass("hide-text-cursor"); //hide cursor to avoid flash
                this.text = this.text.slice(0, letterElem.selectionStart) + '\t' + this.text.slice(letterElem.selectionEnd);
    
                setTimeout(() => { //allow new text to render then move cursor to desired position
                    letterElem.setSelectionRange(newCursorPos, newCursorPos);
                    $("#LETTER").removeClass("hide-text-cursor");
                });
               
                return false; //return false to ignore default tab behaivor
            }
        }
    }

    keyUp(e: KeyboardEvent) {
        //find most recent (and only) occurence of e.which in duration for which the value is -1;
        for (var recent = this.i-1; recent>=0; recent--) {
            if ((this.duration[recent] === -1) && (this.order[recent]===e.which)) {                    
                //recent is now set in terms of i
                this.duration[recent] = Math.floor((e.timeStamp - this.down[recent]) * 1000) / 1000000;
            }
        }
        
        //count how many characters until you can send!
        document.getElementsByClassName('send')[0].innerHTML = "<span style='color: #c62f5a; font-size: 1.15em;'>" + (Constants.MIN_LETTER_LEN - this.text.length).toString() + "+ </span><span style=''> </span>";
        if (this.text.length >= Constants.MIN_LETTER_LEN) {
            document.getElementsByClassName('send')[0].innerHTML = "SEND LETTER";
        }
    }
        
    //show stats
    send() {
        if (this.debugMode || this.text.length >= Constants.MIN_LETTER_LEN) {
            //if character count is satisfied or in debug mode, then proceed.
            $('.pre-send-container').toggleClass('sent');  //fade out letter writing elements
            $('.post-send-container').toggleClass('sent');  //fade in letter sending elements

            //tell container to send letter
            this.sendEmitter.emit({debug: this.debugMode, tldid: this.tldid, location: this.location.toLowerCase(), order: this.order, down: this.down, duration: this.duration, times: this.times, text: this.text});
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

    //go to homepage
    navigateHome(){
        this.router.navigate(['/home'])
    }
        
    //close -- go back to editing letter if you wish
    close(){
        $('.pre-send-container').toggleClass('sent');  //fade in old letter writing elements
        $('.post-send-container').toggleClass('sent');  //fade out letter sending elements
    }
}