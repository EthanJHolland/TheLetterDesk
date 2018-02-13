import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

import { ReadWriteService } from '../services/readwrite.service';

import 'rxjs/add/operator/filter';

@Component({
    selector: 'view-page',
    template: `<view-component
    [letter]=letter>
    </view-component>
    `,
})
export class ViewPageComponent implements OnInit{
    letter: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private reaadWriteService: ReadWriteService 
      ) {}
    
    ngOnInit(){
        console.log('view page component');
        // this.route.paramMap.subscribe((params: ParamMap) => {
        //     this.reaadWriteService.retrieve(params.get('id'))
        //         .then((letter) => {
        //             if(letter){
        //                 this.letter=letter;
        //             }else{
        //                 //letter does not exist so redirect to compose page for now
        //                 this.router.navigate(['/compose']);
        //             }
        //         });
        // });

    }
}