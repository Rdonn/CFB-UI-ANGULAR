import { Component, OnInit, Input } from "@angular/core";
import { BaseTable } from '../../baseClasses/baseTable';
import { Team } from 'src/app/models/team.model';
import { Player, Players } from 'src/app/models/players.model';
import { Subscription } from 'rxjs';
import { GlobalVars } from 'src/globals';
import { PageEvent } from '@angular/material';
import { GetDataSourceService } from 'src/app/Services/getDatasource.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'team-roster-table',
    templateUrl: 'teamRosterTable.component.html', 
    styleUrls: ['teamRosterTable.component.scss']
})
export class TeamRosterTableComponent extends BaseTable implements OnInit{
    
    @Input() team: Team
    dataSource: Player[];
    identifier = 'TeamRosterTableComponent';
    subscriptionMonitor: Subscription; 
    urlLocationPath: string[] = [GlobalVars.host, 'players', 'team'];
    columnDefs: string[] = ['first_name', 'last_name', 'pos', 'num', 'year', 'height',
    'weight'];


    firstNameFilter = new FormControl('');

    lastNameFilter = new FormControl('');


    constructor(private getDataSourceService: GetDataSourceService){
        super(); 
    }

    ngOnInit(): void {

        this.getDataSourceService.setParamsInitial(this.identifier,
            [{
                name: 'school', 
                value: this.team.name
            },
            {
                name: 'year',
                value: this.team.year
            }])

        this.subscriptionMonitor = this.getDataSourceService.getMany(this.urlLocationPath, this.identifier)
        .subscribe(result=>{
            result.subscribe((players: Players)=>{
                this.dataSource = players.players; 
                this.length = players.count; 
            })
        })
        
    }


    handlePage(event: PageEvent){
        console.log(event);
        
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.getDataSourceService.clearParams(this.identifier);
        
    }

}
