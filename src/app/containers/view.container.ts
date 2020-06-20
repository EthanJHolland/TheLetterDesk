import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { ReadWriteService } from '../services/readwrite.service';

import { Letter, RetrieveResponse, doesNotExist, PasswordRequired } from '../models/letter.model';

import 'rxjs/add/operator/filter';

@Component({
    selector: 'view-page',
    template: `<view-component
    [tldid]=tldid
    [preview]=preview>
    </view-component>
    `,
})
export class ViewPageComponent implements OnInit{
    tldid: string;
    preview: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private googleanalyticsService: GoogleAnalyticsService
      ) {}

    ngOnInit(){
        //note this can be navigated to either by /view/:id or /preview/:id
        //if the path starts with /preview set preview mode to true
        this.preview=this.router.url.startsWith('/preview')

        this.googleanalyticsService.logPage(this.preview ? 'preview' : 'view');

        this.route.paramMap.subscribe((params: ParamMap) => {
            this.tldid = params.get('id');
        });
    }
}