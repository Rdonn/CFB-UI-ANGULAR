import { Component, OnInit, ElementRef, OnChanges } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Conference } from 'src/app/models/conferences.model';
import { GetSingleEntityService } from 'src/app/Services/getSingleEntity.service';
import { GetDataSourceService } from 'src/app/Services/getDatasource.service';
import { FilterData } from 'src/app/models/filter.model';
import { Location } from '@angular/common'
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalVars } from 'src/globals';
import { Team, Teams } from 'src/app/models/team.model';
import * as $ from 'jquery';
import { MatButtonToggleChange } from '@angular/material';




@Component({
    selector: 'conference-details',
    templateUrl: 'conferenceDetails.component.html', 
    styleUrls: ['conferenceDetails.component.scss']
})

export class ConferenceDetailsComponent implements OnInit{
    private conference: Conference; 
    private teams: Conference; 
    private value: any = "teams"
    subscriptionMonitor: Subscription; 


    pseudoForm = {
        teams : true, 
        players: false
    }

    constructor(private activatedRoute: ActivatedRoute, 
                private location: Location) {
        
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.activatedRoute.paramMap.subscribe(result=>{
            this.conference = {
                name: result.get('conference_name'), 
                year: result.get('conference_year')
            }
            
            
        });
        
        
    }
    handleChange(change: MatButtonToggleChange){
        if(!(this.value == change.value)){
            this.value = change.value;
        }
        
    }
    goBack(){
        this.location.back(); 
        
    }

}