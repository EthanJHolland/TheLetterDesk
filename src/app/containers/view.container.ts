import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { ReadWriteService } from '../services/readwrite.service';

import { Letter } from '../models/letter.model';
import { DBError, isDBError } from '../models/dberror.model';

import 'rxjs/add/operator/filter';
import { Constants } from '../constants';

@Component({
    selector: 'view-page',
    template: `<view-component
    [letter]=letter
    [preview]=preview>
    </view-component>
    `,
})
export class ViewPageComponent implements OnInit{
    letter: Letter;
    preview: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private googleanalyticsService: GoogleAnalyticsService,
        private readWriteService: ReadWriteService 
      ) {}

    ngOnInit(){
        //note this can be navigated to either by /view/:id or /preview/:id
        //if the path starts with /preview set preview mode to true
        this.preview=this.router.url.startsWith('/preview')

        this.googleanalyticsService.logPage(this.preview ? 'preview' : 'view');

        this.route.paramMap.subscribe((params: ParamMap) => {
            //get letter based on id
            this.readWriteService.retrieve(params.get('id'))
                .then((letter: Letter | DBError) => {
                    if (isDBError(letter)) {
                        //db error
                        this.letter = Constants.LETTER_NOT_FOUND;
                    } else if (letter) {
                        this.googleanalyticsService.logEvent('view', 'existing letter');
                        this.letter=letter;
                    } else {
                        //letter does not exist
                        this.googleanalyticsService.logEvent('view', 'non-existent letter');
                        this.letter = Constants.LETTER_NOT_FOUND;
                    }
                });
        });
        
    }
}