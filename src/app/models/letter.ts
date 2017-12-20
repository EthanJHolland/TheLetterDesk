import { Change } from './change';

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

  //find the first place at which the strings differ and then add a change object
  //note that it is assumed that there is only one difference between the two
  resolveDiff(newStr: string, change: string){
    const firstDiff: number = this.findFirstDifference(newStr, this.simpleText);
    if(firstDiff<0){
      //strings are identical so do nothing
      return;
    }

    //a change was made
    if(this.simpleText === ''){
      this.started = new Date(); //any time the entire letter is deleted start
    }
    //TODO: deal with block changes (example ctrl+a+backspace or pasting)
    this.changeLog.push(new Change(change, firstDiff)); //append change to changelog
    this.simpleText=newStr; //store new string
    
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

  //get the final text after all backspaces have been resolved
  //TODO: remove?
  deriveSimpleText(){
    let simple = '';

    //iterate through changes
    this.changeLog.forEach(change => {
      if(change.isDeletion()){
        simple=simple.substring(0,change.place)+simple.substring(change.place+1); //remove change specified by place
      }else{
        simple=simple.substring(0,change.place)+change.char+simple.substring(change.place); //add change in specified place
      }
    });

    return simple;
  }

  simplify(){
    //TODO: write method which simplifies changelog to something desireable and linear
  }
}