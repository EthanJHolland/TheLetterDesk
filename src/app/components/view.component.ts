import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from '../constants';

import * as $ from 'jquery';
import { PasswordService } from '../services/password.service';
import { DeviceService } from '../services/device.service';

@Component({
    selector: 'view-component',
    templateUrl: './templates/view.html',
    styleUrls: ['./templates/view.css']
})
export class ViewComponent{
    @Input() set letter(letter: any){
        this.locked = letter && 'password' in letter && letter.password; // locked iff letter has password which viewer has not yet entered (set in ngOnInit)
        this._letter = letter;

        if (letter && !this.locked) {
            // focus on body
            document.getElementById("body").focus();
        }
    }
    @Input() set preview(preview: boolean){
        //if this letter is being viewed in preview mode skip open scene and just show text
        if(preview){
            this.openLetterInPreview()
        }
    }

    static whitespaceChars = new Set([9, 13, 32]) //tab, enter, space

    //global variables
    _letter = undefined; //the letter itself
    locked = undefined; //indicates whether password is required (set in letter setter)
    passwordAttempt = '';
    open = false; //whether or not the letter has been opened (becomes true when viewer clicks "open letter")
    pause = false;
    pre_cursor = ""; //everything before the cursor
    post_cursor = ""; //everything after the cursor, which is nothing unless the cursor is refocused
    i=0; //what array index we are on
    capslock = false; 
    messageComplete = true; //true before letter starts or after entire message has been typed
    scrolledTo = 0; //used to automatically scroll down whenever the vertical height of the letter increases
    passwordButtonText = 'password';
    letter_seen = false; //changes permanently to 'true' after the final word is played; prevents retoggle

    constructor(private passwordService: PasswordService, private deviceService: DeviceService, private router: Router){}

    isMobile () {
        return this.deviceService.isMobile();
    }

    //if the user wants to reply open a compose page in a new screen
    openReplyWindow(){
        window.open(Constants.URL+'/compose')
    }

    openLetterInPreview(){
        //turn off all transitions before opening letter
        //$(".wrapper").addClass("notransition");
        $("#wrapper").hide(); //hide open letter button
        $("#body").addClass("notransition");
        $(".menu").addClass("notransition");
        $(".details").addClass("notransition");
        $(".letter").addClass("notransition");

        //finally open the letter
        this.openLetter()

        //turn transitions back on after typing has begun
        $("#body").removeClass("notransition");
        $(".menu").removeClass("notransition");
        $(".details").removeClass("notransition");
        $(".letter").removeClass("notransition");
    }

    openLetter(){
        this.open = true;

        //when you click .start (the open letter button), all this happens:
        $("#wrapper").fadeOut(400); //fade out the start button (using a wrapper div)
        $("#body").toggleClass("typing"); //change the body background
        $(".menu").toggleClass("typing"); //fade out the logo
        $(".details").toggleClass("typing"); //fade in the details (i.e. the clock)
        $(".letter").toggleClass("typing"); //allow the letter to be visible
        
        //start typing
        this.type();

        //begin showing cursor
        this.messageComplete=false;
    }

    //pause, fast forward, rewind
    keyDown(e: KeyboardEvent){
        console.log(e)
        if (this.locked) {
            if (e.which===13) {
                //enter button on keyboard -> submits the password
                this.submitPassword();
            }
        } else if (!this.open) {
            if (e.which === 32 || e.which === 13) {
                //spacebar or enter
                this.openLetter();
            }
        } else if (!this.messageComplete) {
            if (e.which===32) {
                //spacebar
                if (this.pause===false) {
                    //if currently playing, then pause
                    this.pause = true;
                }
                else {
                    //if currently paused, then play
                    this.pause = false;
                    
                    //keep typin'
                    this.type();
                }
            }
            if (e.which===39) {
                //right arrow key
                this.pause = true;
                
                //update for any spaces
                while (this.i < this._letter.order.length && ViewComponent.whitespaceChars.has(this._letter.order[this.i])) {
                    this.updateString(this.i);
                    this.i++;
                }
                //add next word
                while (this.i<this._letter.order.length && !ViewComponent.whitespaceChars.has(this._letter.order[this.i])) {
                    this.updateString(this.i);
                    this.i++;
                }
            }
        }
    }
        
    //this function takes into account the appropriate delay
    //before calling updateString() to update the output
    type() {
        var k=1;
        if (this.i===0) {
            //wait 500ms before the letter begins, to allow transitions to take effect
            //the user must also see the spacebar and right arrow key markers appear
            var delay = 3000;
        }
        else {
            var delay = (this._letter.times[this.i]-this._letter.times[this.i-1])*1000;
            if (delay > 2000) {delay = 2000;} //the reader doesn't want to wait forever
        }
        
        //listen for a spacebar; stop typing if paused
        if (this.pause===true) {
            return;
        }
        
        //use setTimeout
        setTimeout(() => {
            this.updateString(this.i);
            this.i++;
            if (this.i < this._letter.order.length) {
            this.type();
            }
        }, delay);
    }

    //each time this is called, one letter is added to the output (or backspaced)
    updateString(index) {
        //c is a keycode
        var c = this._letter.order[index];
        
        //special characters (anything that is not a letter)
        //stored in a dictionary that maps a keycode to the resulting character
        var keyCodes = {9: "\t", 13:"\n", 32:" "};
        
        var keyCodesSpecial ={49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 48:"0", 189:"-", 187:"=", 219:"[", 221:"]", 220: "\\", 186:";", 222:"'", 188:",", 190:".", 191:"/", 192:"`"};
        
        var keyCodesSpecialShift = {49:"!", 50:"@", 51:"#", 52:"$", 53:"%", 54:"^", 55:"&", 56:"*", 57:"(", 48:")", 189:"_", 187:"+", 219:"{", 221:"}", 220:"|", 186:":", 222:'"', 188:"<", 190:">", 191:"?", 192:"~"};
        
        
        if (c<0) { // cursor moved
            if (c == -0.1) {c = 0;} //cursor moves to the top of the letter
            var totalstring = this.pre_cursor + this.post_cursor; //remove cursor before slicing

            if (c<-1000000) {
                //delete highlighted text
                var start = -(c % 1000000);
                var end = (c + start) / -1000000;
                this.pre_cursor = totalstring.slice(0,start);
                this.post_cursor = totalstring.slice(end);
            } else {
                //move the cursor
                this.pre_cursor = totalstring.slice(0,-c);
                this.post_cursor = totalstring.slice(-c, totalstring.length);
            }
        } else { // character typed
            //check if SHIFT is being held
            var shift: boolean;
            if (c>1000) {
                shift = true;
                c = c/1000;
            } else {
                shift = false;
            }

            //letters have keycodes from [65,90]
            if (c>=65 && c<=90) {
                if ((shift || this.capslock) && !(shift && this.capslock)) { //uppercase if shift or capslock but not both
                    this.pre_cursor += String.fromCharCode(c); //uppercase
                }
                else {
                    this.pre_cursor += String.fromCharCode(c).toLowerCase(); //lowercase
                }
            }
            else if (c in keyCodes) {
                //special character WITHOUT Shift consideration
                this.pre_cursor += keyCodes[c];
            }
            else if (c in keyCodesSpecial) {
                //special character WITH Shift consideration
                if (shift) {
                    this.pre_cursor += keyCodesSpecialShift[c];
                } else {
                    this.pre_cursor += keyCodesSpecial[c];
                }
            }

            else if (c===8 && this._letter.order[this.i-1] > -1000000) {
                //backspace
                this.pre_cursor = this.pre_cursor.slice(0,-1);
            }
            else if (c===46 && this._letter.order[this.i-1] > -1000000) {
                //delete
                this.post_cursor = this.post_cursor.slice(1);
            }
            else if (c===20) {
                //toggle capslock
                this.capslock = !this.capslock;
            }
            else {
                //for debugging only -- output the keycode if it's a character not accounted for
                //pre_cursor += c;
            }

            if (index>=this._letter.order.length-1) {
                //indicate message is complete so no longer show cursor
                this.messageComplete=true
                //wait 1 second before transitioning out
                setTimeout(this.toEnd,1000);
            }

            //automatically scroll down as letter appears
            if (document.getElementById("body").scrollHeight > this.scrolledTo){
                this.scrolledTo = document.getElementById("body").scrollHeight
                document.getElementById("body").scrollTo(0, this.scrolledTo)
            }
        }
    }

    //progress (time) bar
    getCharCount(){
        //TODO: 1 when space bar is pressed before the first letter appears counter is off
        //TODO: 2 pressing spacebar toggles back to blue
        return this.i + " / " + this._letter.order.length;
    }       
       
    getPartialString(){
        if(this.messageComplete || (this.pre_cursor + this.post_cursor) == ''){
            return this.pre_cursor + this.post_cursor;
        }else{
            return this.pre_cursor+"|" + this.post_cursor;
        }
    }

    toEnd() {
        if (letter_seen===false) {
            
            letter_seen = true; //prevent retoggling into darkness from multiple events
            
            //toggle everything back to the original (gray) display
            $("#body").toggleClass("typing");
            $("#logo").toggleClass("typing");
            $(".details").toggleClass("typing");
            $(".letter").toggleClass("typing");

            //add new some new details
            $("#reply").toggleClass("final"); //show WRITE LETTER option (they want to reply!)
        }
    }

    mouseEnter() {
        this.passwordButtonText = 'enter';
    }

    mouseExit() {
        if(this.passwordButtonText === 'enter') {
            this.passwordButtonText = 'password';
        }
    }

    submitPassword() {
        if (this.passwordService.verify(this._letter.password, this.passwordAttempt, this._letter.tldid)) {
            this.locked = false;
            document.getElementById("body").focus(); // focus on body so space/enter can be used to open letter without having to click on page
        } else {
            //password is wrong; reset password field
            this.passwordAttempt = '';
            this.passwordButtonText = 'try again';
            document.getElementById("password").focus();
        }
    }
}