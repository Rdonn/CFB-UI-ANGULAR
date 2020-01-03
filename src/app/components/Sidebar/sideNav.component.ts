import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'nav-side-bar', 
    templateUrl: 'NavSidebarComponent.component.html',
    styleUrls: ['navSidebar.component.scss']
})

export class NavSidebarComponent implements OnInit{
    constructor(private activatedRoute: ActivatedRoute){
        
    }
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        console.log(this.activatedRoute.outlet);
        
        
    }
    handleClick(){
        console.log
        ('click'); 
    }
}