import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { shortid } from 'shortid';

@Component({
    selector: 'redirect-page',
    template: ''
})
export class RedirectPageComponent implements OnInit{ 
    constructor(
        private route: ActivatedRoute,
        private router: Router
      ) {}
    
    ngOnInit(){
        let newid = require('shortid').generate();
        this.router.navigate(['/compose/'+ newid]);
    }

}