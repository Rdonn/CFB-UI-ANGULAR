import { Component, Input, OnInit } from "@angular/core";
import { Team, Teams } from 'src/app/models/team.model';
import { Conference } from 'src/app/models/conferences.model';
import { FilterData } from 'src/app/models/filter.model';
import { Subscription } from 'rxjs';
import { GlobalVars } from 'src/globals';
import { GetDataSourceService } from 'src/app/Services/getDatasource.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'conference-details-team-table', 
    templateUrl: 'conferenceDetailsTeamTable.component.html', 
    styleUrls: ['conferenceDetailsTeamsTable.component.scss']
})

export class ConferenceDetailsTableTeamComponent implements OnInit{
    @Input() conference: Conference;
    identifier = 'ConferenceDetailsTableTeamComponent'
    dataSource: Team[];

    filterValues = {name: {name: 'name', value: ''} as FilterData}



    subscriptionMonitor: Subscription; 
    urlLocationPath: string[] = [GlobalVars.host, 'teams']



    nameFilter = new FormControl('');

    constructor(private getDataSourceService: GetDataSourceService) {
        
    }

    ngOnInit(){

        this.nameFilter.valueChanges.subscribe(result=>{
            
            this.filterValues.name.value = result;
            
            this.getDataSourceService.applyFilters(this.filterValues, this.identifier); 
            this.subscriptionMonitor.unsubscribe()
            this.subscriptionMonitor = this.getDataSourceService.getMany(this.urlLocationPath, this.identifier)
            .subscribe(result=>{
                result.subscribe((teams: Teams)=>{
                    this.dataSource = teams.teams
                })
            })
        })


        this.urlLocationPath.push(this.conference.year)
        this.urlLocationPath.push(this.conference.name)
        this.subscriptionMonitor = this.getDataSourceService.getMany(this.urlLocationPath, this.identifier)
            .subscribe((result)=>{
                result.subscribe((teams: Teams)=>{
                    this.dataSource = teams.teams; 
                })
            })
    }

}