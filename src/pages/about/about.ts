import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';


@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {



    constructor(public platform: Platform) {

    }


}
