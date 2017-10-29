import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { shortid } from 'shortid';

import { LetterService } from '../services/letter.service';

@Component({
    selector: 'view-page',
    templateUrl: './templates/view.container.html'
})
export class ViewPageComponent implements OnInit{ 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private letterService: LetterService 
      ) {}
    
    ngOnInit(){

        // let newid = require('shortid').generate();
        // this.router.navigate(['/compose/'+ newid]);
    }

}