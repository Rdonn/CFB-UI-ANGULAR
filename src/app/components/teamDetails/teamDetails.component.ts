import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatButtonToggleChange } from '@angular/material';
import { Team } from 'src/app/models/team.model';

@Component({
    selector: 'team-details', 
    templateUrl: 'teamDetails.component.html', 
    styleUrls: ['teamDetails.component.scss']
})

export class TeamDetailsComponent implements OnInit{

    team: Team; 
    constructor(private activatedRoute: ActivatedRoute, 
        private router: Router,
        private location: Location) {

}
    ngOnInit(){
        this.activatedRoute.params.subscribe(result=>{
            console.log(result);
            this.team = {
                name: result.team_name, 
                year: result.team_year
            }
        })
    }

    handleChange(event: MatButtonToggleChange){

    }

    goBack(){
        this.location.back(); 
    }
}