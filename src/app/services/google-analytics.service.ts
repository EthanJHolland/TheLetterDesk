import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { PrivateConstants } from '../constants.private';

declare let gtag; //gtag comes from google analytics script in head of index.html

@Injectable()
export class GoogleAnalyticsService {
    public logPage(pageName: string) {
        if (environment.production) { // only log pages in production mode
            gtag('config', PrivateConstants.GOOGLE_ANALYTICS_ID, {page_title: pageName, page_path: '/' + pageName});
            this.logEvent('pageview', pageName); //additionally log an event under the pageview category
        }
    }

    public logEvent(category: string, eventName: string) {
        if (environment.production) { // only log events in production mode
            gtag('event', eventName, {event_category: category});
        }
    }
}
