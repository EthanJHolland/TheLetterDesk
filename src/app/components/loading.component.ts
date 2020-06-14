import { Component, Input } from '@angular/core';


@Component({
    selector: 'loading-component',
    templateUrl: './templates/loading.html'//,
    // styleUrls: ['./templates/loading.css']
})
export class LoadingComponent{
    @Input() phrase: string = 'Loading';
    @Input() numDots: number = 3;

    dots = [];

    ngOnInit () {
        setTimeout(() => this.step(), 2000);
    }

    step () {
        if (this.dots.length >= this.numDots) {
            this.dots = [];
        } else {
            this.dots.push('.');
        }
        setTimeout(() => this.step(), 1000);
    }
}