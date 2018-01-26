import { Change, Insertion, Deletion } from './change';
import { Selection } from './selection';

export class Letter {
  _id: string; //the id which specifies the url at which it should be shown
  changeLog: Change[]; //an array of change objects
  started: Date; //date and time at which first change was typed
  simpleText: string; //the final letter after all deletions have been resolved

  constructor(_id: string){
    this._id=_id;
    this.changeLog=[];
    this.started = new Date();
    this.simpleText='';
  }

  /*
  assumtions:
    it is impossible to trigger an InputEvent and immediatly after triggering the event be selecting text
    text dragging nd dropping has been disabled for the text area
  */
  resolveDiff(newStr: string, beforeSelection: Selection, afterSelection: Selection){
    if(newStr === this.simpleText)return; //no detectable changes so do nothing

    if(beforeSelection.start == beforeSelection.end){
      //the user was not selecting text so characters were either inserted or deleted but not both
      const before=beforeSelection.start;
      const after=afterSelection.start;

      if(before<after){
        //insertion of some type (ex. typing, pasting, etc)
        const added: string = newStr.substring(before, after);
        this.changeLog.push(new Insertion(added, before))
      }else{
        //deletion of some sort
        const lenDiff = this.simpleText.length - newStr.length; //find number of characters deleted

      }
    }else{
      //user started with a selection so assume those characters were deleted

    }
  }

  //find the first index at which two strings differ
  //returns -1 if strings are the same
  //if one string is a subset of the other returns the length of the shorter string
  findFirstDifference(a: string, b: string){
    let i = 0;
    if (a === b){
      //same string
      return -1;
    }
    while (a[i] === b[i]){
      //note that index out of bounds returns undefined
      i++;
    } 
    return i;
  }

  simplify(){
    //TODO: write method which simplifies changelog to something desireable and linear
  }
}