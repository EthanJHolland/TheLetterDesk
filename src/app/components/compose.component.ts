import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordService } from '../services/password.service';
import { Constants } from '../constants'

import { environment } from '../../environments/environment';
import * as $ from 'jquery';

@Component({
    selector: 'compose-component',
    templateUrl: './templates/compose.html',
    styleUrls: ['./templates/compose.css']
})
export class ComposeComponent{
    @Input() tldid: string;
    @Output() sendEmitter: EventEmitter<any> = new EventEmitter();
    
    cursor_placement = 0; //updates on send, so it can refocus appropriately if you close the send screen 
    //parallel arrays
    order = []; //order of down presses
    down = []; //down times
    duration = []; //press duration times
    times = []; //absolute continuous times starting from 0

    debugMode = !environment.production; //debug mode indicates letter is being written for debugging/testing purposes
    i = 0; //currently on the ith element of all these parallel arrays
    text: string = ''; //store the text itself for sizing purposes
    location: string = ''; //store location
    password: string = ''; //optional password added to the letter

    constructor(private passwordService: PasswordService, private router: Router, private route: ActivatedRoute) {} //need the router for navigation

    ngOnInit() {
        console.log('is mobile?', this.isMobile())
        if(environment.production) { // if in prod, look for query params to determine if debug mode
            this.route.queryParams.subscribe(params => {
                this.debugMode = 'debug' in params && params['debug'].toLowerCase() == 'true';
            });
        }
    }

    isMobile(): boolean{
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
        return check;
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

    passwordKeyUp(e: KeyboardEvent) {
        if (e.which===13) {
            //enter button on keyboard -> saves the password
            this.savePassword();
        }   
    }
        
    //show stats
    send() {
        if (this.debugMode || this.text.length >= Constants.MIN_LETTER_LEN) {
            //if character count is satisfied or in debug mode, then proceed.
            $('.pre-send-container').toggleClass('sent');  //fade out letter writing elements
            $('.post-send-container').toggleClass('sent');  //fade in letter sending elements
            
            //get cursor placement (for future autofocus)
            var letterElem: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("LETTER");
            this.cursor_placement = letterElem.selectionStart;

            //tell container to send letter
            this.emitLetter();
        }
    };

    emitLetter(hashedPassword: string = null) {
        var letterObj: any = {
            debug: this.debugMode,
            tldid: this.tldid,
            location: this.location.toLowerCase(),
            order: this.order, down: this.down, duration: this.duration, times: this.times,
            text: this.text
        }
        if (hashedPassword) letterObj.password = hashedPassword;

        this.sendEmitter.emit(letterObj);
    }
        
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

    //click button to copy link
    copy() {
        //put the URL in a hidden input because select+copy will not work for plain text in divs
        var url_input = (<HTMLInputElement> document.getElementsByClassName('url_input')[0]);
        url_input.value = document.getElementsByClassName('myurl')[0].innerHTML;

        //select text from the hidden input, then copy
        url_input.select();
        document.execCommand('copy');

        //transition
        document.getElementsByClassName('myurl')[0].classList.add('copied');
        document.getElementsByClassName('copyalert')[0].innerHTML = "SUCCESS!";
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
        
        //refocus cursor
        setTimeout(() => { // need to wait for elements to reenter dom before focusing
            var letterElem: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("LETTER");
            letterElem.focus();
            letterElem.selectionStart = this.cursor_placement;
        }, 100);
    }

    //functions related to adding a password        
    toggleEye() {
        var x = <HTMLInputElement> document.getElementById("myPassword");
        if (x.type === "text") {
            x.type = "password";
        } else {
            x.type = "text";
        }
        document.getElementById("myPassword").focus(); //refocus the cursor
    }

    showPasswordField() {
        var password_button = document.getElementById("password-button");
        var element = document.getElementById("pw-set-container");

        //to edit password: remove password button, show password element
        password_button.classList.add("disabled");
        element.classList.remove("disabled");
        document.getElementById("myPassword").focus(); //focus the cursor
        (<HTMLInputElement> document.getElementById("myPassword")).type = "password"; //mask password by default
    }

    savePassword() {
        var password_button = document.getElementById("password-button");
        var element = document.getElementById("pw-set-container");

        //to save password: remove password element; show password button
        password_button.classList.remove("disabled");
        element.classList.add("disabled");

        //change "add password" to "edit password"
        if (this.password.length !== 0) {
            password_button.innerHTML = "EDIT PASSWORD";
        } else {
            password_button.innerHTML = "ADD PASSWORD";
        }

        //reemit letter with password
        this.emitLetter(this.passwordService.hash(this.password, this.tldid));
    }
}