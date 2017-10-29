import { Component } from '@angular/core';
export class Letter {
  id: string;
  content: string;
}
@Component({
    selector: 'view-page',
    template: `<h1>The Letter Desk</h1>
    <h4>Brainchild of Ethan Holland</h4>
    <label>To:</label>
     <input [(ngModel)]="letter.name" placeholder="name">
<label>Receiver's Email:</label> <input id="sendAddress" />
<br >
<div>
    <label>Message to {{letter.id}}:</label> 
    </div>
    
    <div>
    <textarea [(ngModel)]="letter.content" placeholder="  [Insert letter body here]">
      
        </textarea>
</div>
    <button (click)="onSend()">Send</button>
    <!-- skeleton -->`
})
export class ComposePageComponent{
letter: Letter ={
    id: 'Peach',
    content: 'Dearest Fruit'
};
}