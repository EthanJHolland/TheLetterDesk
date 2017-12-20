export class Change {
  char: string | 'backspace' | 'delete';
  place: number;
  time: Date;

  constructor(char, place){
    this.char=char;
    this.place=place;
    this.time=new Date();
  }

  isDeletion(){
    return this.char === 'backspace' || this.char === 'delete';
  }
}