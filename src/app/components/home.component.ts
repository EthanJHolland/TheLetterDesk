import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleAnalyticsService } from '../services/google-analytics.service';

import * as $ from 'jquery';
import { Constants } from '../constants';

@Component({
    selector: 'home-component',
    templateUrl: './templates/home.html',
    styleUrls: ['./templates/home.css']
})
export class HomeComponent implements OnInit{
    //feed in data
    letter=Constants.ABOUT; //get about letter
    messageComplete = true; //true before letter starts or after entire message has been typed

    //global variables
    pause = false;
    totalString = ""; //what is outputted
    i=0; //what array index we are on
    shift = false; //if the shift key was pressed down 1 keypress ago

    constructor(private googleanalyticsService: GoogleAnalyticsService, private route: ActivatedRoute, private router: Router){}

    ngOnInit(){
        //write version number so that it can be seen which git commit the website is up to
        this.googleanalyticsService.logPage('home');
        console.log('version', Constants.VERSION);
    }

    //when you click WHAT IS THIS, all this happens (it plays a letter for you)
    showAbout(){
        this.googleanalyticsService.logEvent('home', 'view about page');

        $("#wrapper").fadeOut(400); //fade out the start button (using a wrapper div)
        $("#body").toggleClass("typing"); //change the body background
        $(".details").toggleClass("typing"); //fade in the details (i.e. the clock)
        $("#letter").toggleClass("typing"); //allow the letter to be visible
        
        //start typing
        this.type();
        
        //begin showing cursor
        this.messageComplete=false;
        
        //startClock(); //don't use for now because testing revealed people don't care
    }

    //pause, fast forward, rewind
    keyDown(e){
        console.log(e)
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
            while (this.letter.order[this.i]===32 && this.i<this.letter.order.length) {
                this.updateString(this.i);
                this.i++;
            }
            //add next word
            while (this.letter.order[this.i] !==32 && this.i<this.letter.order.length) {
                this.updateString(this.i);
                this.i++;
            }
        }
    }
        
    //this function takes into account the appropriate delay before calling updateString() to update the output
    type() {
        var k=1;
        if (this.i===0) {
            //wait 500ms before the letter begins, to allow transitions to take effect
            //the user must also see the spacebar and right arrow key markers appear
            var delay = 3000;
        }
        else {
            var delay = (this.letter.absTimes[this.i]-this.letter.absTimes[this.i-1])*1000;
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
        var keyCodes ={32:" ", 188:",", 190:".", 49:"!", 191:"?",13:"\n", 57:"(", 48:")", 222:"'", 189:"-", 186:":"};
        
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
        window.scrollTo(0,50000); //automatic scrolling down for long letters
    }

    //progress (time) bar
    getCharCount(){
        return this.i + " / " + this.letter.order.length;
    }       
        
    getPartialString(){
        if(this.messageComplete || this.totalString==''){
            return this.totalString;
        }else{
            return this.totalString+"|";
        }
    }
    
    toEnd() {
        //toggle everything back
        $("#body").toggleClass("typing"); //back to light gray display
        $("#cornerlogo").toggleClass("final"); //show cornerlogo
        $(".details").toggleClass("typing"); //get rid of pause, fastfor, location, time details
        $("#letter").toggleClass("typing"); //get rid of letter
    }

    backToHome(){
        window.location.reload();
    }

    // back(){
    //     $("#wrapper").fadeOut(400); //fade out the start button (using a wrapper div)
    //     $(".menu").toggleClass("typing"); //fade out the logo and other starting menu links
    //     $("#write").toggleClass("typing"); //fade out write letter icon;
    // }
}