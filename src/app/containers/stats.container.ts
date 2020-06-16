import { Component, OnInit } from '@angular/core';

import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { ReadWriteService } from '../services/readwrite.service';


@Component({
    selector: 'stats-page',
    template: `
    <div class="center">
        <p>Letters sent...</p>
        <p *ngFor="let title of keys(stats)" class="button-text">
            {{title}}: {{stats[title]}}
        </p>
    </div>`
})
export class StatsPageComponent implements OnInit{
    stats: any;

    constructor(private googleanalyticsService: GoogleAnalyticsService, private readWriteService: ReadWriteService) {}

    ngOnInit(){
        this.googleanalyticsService.logPage('stats');

        this.readWriteService.getStats()
            .then((stats) => {
                if(stats){
                    this.stats = stats;
                }
            });
    }

    keys (obj) {
        return obj ? Object.keys(obj): [];
    }
}