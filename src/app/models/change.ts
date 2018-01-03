import { Selection } from "./selection";

export class Insertion{
  text: string; //the text inserted
  index: number; //the index of the first character of the inserted text
  time: number;

  constructor(text: string, index: number){
    this.text=text;
    this.index=index;
    this.time=Date.now()
  }
}

export class Deletion{
  selection: Selection;
  time: number;

  constructor(start: number, end: number){
    this.selection={
      start: start,
      end: end
    } as Selection
    this.time=Date.now()
  }
}

export type Change = Insertion | Deletion; //a change is either an insertion or a deletion