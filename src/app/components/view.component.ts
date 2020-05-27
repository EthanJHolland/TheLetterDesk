import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from '../constants';

import * as $ from 'jquery';

@Component({
    selector: 'view-component',
    templateUrl: './templates/view.html',
    styleUrls: ['./templates/view.css']
})
export class ViewComponent{  
    @Input() letter: any;
    @Input() set preview(preview: boolean){
        //if this letter is being viewed in preview mode skip open scene and just show text
        if(preview){
            this.openLetterInPreview()
        }
    }

    static whitespaceChars = new Set([9, 13, 32]) //tab, enter, space

    //feed in data!
    //order = [16,83,73,78,67,69,32,84,72,69,32,78,79,84,69,32,73,83,32,73,78,32,77,89,32,78,79,84,69,66,79,79,75,188,32,73,84,32,80,82,69,83,85,77,65,66,66,8,76,89,32,72,65,83,32,83,79,77,69,32,77,69,65,78,73,78,71,32,84,79,32,77,69,190,32,16,73,32,83,84,85,68,89,32,73,84,32,70,79,82,32,65,32,76,79,78,71,32,87,72,69,73,76,8,8,8,73,76,69,190];
    //absTimes = [0,0.082265,0.159135,0.232569,0.27749,0.365655,0.38208,0.509105,0.535275,0.5996,0.65045,0.72723,0.79514,0.84679,0.91475,0.947315,1.013015,1.079255,1.167655,1.28932,1.36046,1.42292,1.5205,1.693625,1.74269,1.957145,2.0245,2.113195,2.18488,2.25123,2.27543,2.408005,2.48109,2.640085,2.721365,2.79957,2.874575,2.968975,3.609835,3.679565,3.74832,3.77633,3.86989,4.034214,4.18954,4.223965,4.364425,4.75758,5.2492,5.38899,5.50237,5.564805,5.65714,5.70789,5.7766,5.90076,5.929035,5.97265,6.0584,6.12976,6.197309,6.54608,6.61145,6.645945,6.70153,6.77192,6.846309,6.958995,7.08103,7.12214,7.195095,7.277495,7.329375,7.407125,7.502715,7.9243,8.04959,8.18247,8.26986,8.34411,8.41372,8.547535,8.572505,8.71095,8.824915,8.974415,9.012375,9.22282,9.240795,9.35502,9.368855,9.493675,9.533095,9.596125,9.749505,9.77449,9.864605,10.21014,10.332335,10.357245,10.40338,10.41497,10.476915,10.760945,10.92612,11.10169,11.61688,11.692115,11.779345,11.887975];
    //locationString = "gothic reading room";
        
    //global variables
    open = false; //whether or not the letter has been opened (becomes true when viewer clicks "open letter")
    pause = false;
    totalString = ""; //what is outputted
    i=0; //what array index we are on
    shift = false; //if the shift key was pressed down 1 keypress ago
    messageComplete = true; //true before letter starts or after entire message has been typed
    scrolledTo = 0; //used to automatically scroll down whenever the vertical height of the letter increases

    constructor(private router: Router){}
        
    //if the user wants to reply open a compose page in a new screen
    openReplyWindow(){
        window.open(Constants.URL+'/compose')
    }

    openLetterInPreview(){
        //turn off all transitions before opening letter
        //$(".wrapper").addClass("notransition");
        $(".wrapper").hide(); //hide open letter button
        $(".body").addClass("notransition");
        $(".menu").addClass("notransition");
        $(".details").addClass("notransition");
        $(".letter").addClass("notransition");

        //finally open the letter
        this.openLetter()

        //turn transitions back on after typing has begun
        $(".body").removeClass("notransition");
        $(".menu").removeClass("notransition");
        $(".details").removeClass("notransition");
        $(".letter").removeClass("notransition");
    }

    openLetter(){
        this.open = true;

        //when you click .start (the open letter button), all this happens:
        $(".wrapper").fadeOut(400); //fade out the start button (using a wrapper div)
        $(".body").toggleClass("typing"); //change the body background
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
        if (!this.open) {
            if (e.which === 32 || e.which === 13) {
                //spacebar or enter
                this.openLetter();
            }
        } else {
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
                while (this.i < this.letter.order.length && ViewComponent.whitespaceChars.has(this.letter.order[this.i])) {
                    this.updateString(this.i);
                    this.i++;
                }
                //add next word
                while (this.i<this.letter.order.length && !ViewComponent.whitespaceChars.has(this.letter.order[this.i])) {
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
            var delay = (this.letter.times[this.i]-this.letter.times[this.i-1])*1000;
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
            if (this.i < this.letter.order.length) {
            this.type();
            }
        }, delay);
    }

    //each time this is called, one letter is added to the output (or backspaced)
    updateString(index) {
        //c is a keycode
        var c = this.letter.order[index];
        
        //special characters (anything that is not a letter)
        //stored in a dictionary that maps a keycode to the resulting character
        var keyCodes ={9: "\t", 32:" ", 188:",", 190:".", 49:"!", 191:"?",13:"\n", 57:"(", 48:")", 222:"'", 189:"-", 186:":"};
        
        //letters have keycodes from [65,90]
        if (c>=65 && c<=90) {
            if (this.shift===true) {
                this.shift = false;
                this.totalString += String.fromCharCode(c); //uppercase
            }
            else {
                this.totalString += String.fromCharCode(c).toLowerCase(); //lowercase
            }
        }
        else if (c in keyCodes) {
            //special character (e.g. punctuation)
            this.totalString += keyCodes[c];
        }
        else if (c===8) {
            //backspace has keycode 8
            this.totalString = this.totalString.slice(0,-1);
        }
        else if (c===16) {
            //shift has keycode 16
            this.shift = true;
        }
        else {
            //for debugging only -- output the keycode if it's a character not accounted for
            //totalString += c;
        }
        
        if (index>=this.letter.order.length-1) {
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

    //progress (time) bar
    getCharCount(){
        //TODO: 1 when space bar is pressed before the first letter appears counter is off
        //TODO: 2 pressing spacebar toggles back to blue
        return this.i + " / " + this.letter.order.length;
    }       
       
    getPartialString(){
        if(this.messageComplete || this.totalString==''){
            return this.totalString;
        }else{
            return this.totalString+"|";
        }
    }

    //go to homepage
    navigateHome(){
        this.router.navigate(['/home'])
    }
        
    toEnd() {
        //toggle everything back to the original (gray) display
        $(".body").toggleClass("typing");
        $(".logo").toggleClass("typing");
        $(".details").toggleClass("typing");
        $(".letter").toggleClass("typing");
        
        //add new some new details
        $(".postLetterWrite").toggleClass("final"); //show WRITE LETTER option (they want to reply!)
        $(".postLetterLocation").toggleClass("final"); //still show the location
    }
}