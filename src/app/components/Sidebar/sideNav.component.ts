import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import {Location} from '@angular/common';
import { NavigationDepthService } from 'src/app/Services/navigationDepth.service';
import {trigger, style, state, animate, transition, AnimationEvent} from '@angular/animations';
import { Observable, of } from 'rxjs';
import { PlayerCategories } from 'src/app/models/representation';
@Component({
    selector: 'nav-side-bar', 
    templateUrl: 'NavSidebarComponent.component.html',
    styleUrls: ['navSidebar.component.scss'],
    animations: [
        trigger('openClose', [
          // ...
          state('closed', style({
            height: '0px',
            
          })),
          state('opened', style({
            height: "*",
          })),
          transition('opened => closed', animate('400ms ease-in')),
          transition('closed => opened', animate('400ms ease-in'))
        ]),
      ]
})

export class NavSidebarComponent implements OnInit{
    display: boolean = false; 
    animationState: string = 'closed'; 
    showSubButtons: Observable<boolean> = of(true); 
    categories: string[] = ['offense','defense','specialTeams']
    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private location: Location, 
                private navigationDepthService: NavigationDepthService){
        
    }
    ngOnInit(): void {
        //Called after the c1onstructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        console.log(this.categories);
        
        
        
    }

    handleNavigation(){
        console.log(this.navigationDepthService.navigate);
        this.navigationDepthService.navigate(); 
    }

    handleToggle(){
        this.display = !this.display;
    }

    toggleAnimation(){
        this.animationState = (this.animationState === 'opened' ? 'closed' : 'opened');
    }

    animationStarted(event: AnimationEvent){
      
    }

}