import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';

import { Letter } from '../models/letter';
import { LetterService } from '../services/letter.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'compose-page',
    templateUrl: './templates/compose.container.html',
    styleUrls: ['./templates/compose.container.css']
})
export class ComposePageComponent implements OnInit {
    letter: Letter ={
        _id: 'new',
        content: ''
    };

    constructor(private letterService: LetterService, private route: ActivatedRoute, private router: Router){}

    ngOnInit(){
        this.route.paramMap.subscribe((params: ParamMap) => this.letter._id=params.get('id'));
    }

    onSend(){
        console.log('sending');
        console.log(this.letter);
        this.letterService.update(this.letter);
    }
}