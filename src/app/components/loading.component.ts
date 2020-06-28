import { Component, Input } from '@angular/core';


@Component({
    selector: 'loading-component',
    templateUrl: './templates/loading.html'//,
    // styleUrls: ['./templates/loading.css']
})
export class LoadingComponent{
    @Input() phrase: string = 'Loading';
    @Input() numDots: number = 3;

    DOT = '.';
    dots = [this.DOT, this.DOT, this.DOT];

    ngOnInit () {
        setTimeout(() => this.step(), 3000);
    }

    step () {
        if (this.dots.length >= this.numDots) {
            this.dots = [this.DOT];
        } else {
            this.dots.push(this.DOT);
        }
        setTimeout(() => this.step(), 1000);
    }
}