import { Component, OnInit, OnDestroy } from "@angular/core";
import { BaseTable } from '../baseClasses/baseTable';
import { Player, Players } from 'src/app/models/players.model';
import { Subscription } from 'rxjs';
import { GlobalVars } from 'src/globals';
import { GetDataSourceService } from 'src/app/Services/getDatasource.service';
import { PageEvent } from '@angular/material';
import { FilterData } from 'src/app/models/filter.model';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'player-table-index',
    templateUrl: 'playerTableIndex.component.html',
    styleUrls: ['playerTableIndex.component.scss']
})

export class PlayerTableIndexComponent extends BaseTable implements OnInit, OnDestroy{
    dataSource: Player[];
    identifier = 'PlayerTableIndexComponent';
    subscriptionMonitor: Subscription; 
    urlLocationPath: string[] = [GlobalVars.host, 'players'];
    columnDefs: string[] = ['first_name', 'last_name', 'pos', 'num', 'year', 'height',
    'weight', 'team.name', 'team.year', 'details'];

    playerFilterValues= {
        first_name: {name: 'first_name', value: ''} as FilterData, 
        last_name: {name: 'last_name', value: ''} as FilterData, 
        pos: {name: 'pos', value: ''} as FilterData
    }

    teamFilterValues={
        year: {name: 'year', value: ''} as FilterData, 
        name: {name: 'name', value: ''} as FilterData
    }

    firstNameFilter = new FormControl('');

    lastNameFilter = new FormControl('');

    teamNameFilter = new FormControl(''); 

    teamYearFilter = new FormControl(''); 

    posFilter = new FormControl(''); 
    
    constructor(private getDataSourceService: GetDataSourceService, 
                private activatedRouter: ActivatedRoute,
                private router: Router){
        super(); 
    }

    ngOnInit(){

        this.posFilter.valueChanges.subscribe(result=>{
            this.playerFilterValues.pos.value = result; 
            this.subscriptionMonitor.unsubscribe(); 
            this.getDataSourceService.applySpecificFilter(this.playerFilterValues, 'player_filter', this.identifier); 
            this.newLoad(); 
        })

        this.firstNameFilter.valueChanges.subscribe(result=>{
            this.playerFilterValues.first_name.value = result; 
            this.subscriptionMonitor.unsubscribe(); 
            this.getDataSourceService.applySpecificFilter(this.playerFilterValues, 'player_filter', this.identifier)
            this.newLoad()
        })

        this.lastNameFilter.valueChanges.subscribe(result=>{
            this.playerFilterValues.last_name.value = result; 
            this.subscriptionMonitor.unsubscribe(); 
            this.getDataSourceService.applySpecificFilter(this.playerFilterValues, 'player_filter', this.identifier); 
            this.newLoad(); 
        })

        this.teamNameFilter.valueChanges.subscribe(result=>{
            this.teamFilterValues.name.value = result; 
            this.subscriptionMonitor.unsubscribe(); 
            this.getDataSourceService.applySpecificFilter(this.teamFilterValues, 'team_filter', this.identifier); 
            this.newLoad(); 
        })

        this.teamYearFilter.valueChanges.subscribe(result=>{
            this.teamFilterValues.year.value = result; 
            this.subscriptionMonitor.unsubscribe(); 
            this.getDataSourceService.applySpecificFilter(this.teamFilterValues, 'team_filter', this.identifier); 
            this.newLoad(); 
        })


        this.getDataSourceService.setPaginationValues(this.identifier, String(this.pageSize), String(0))
        this.subscriptionMonitor = this.getDataSourceService.getMany(this.urlLocationPath, this.identifier)
        .subscribe(result=>{
            result.subscribe((players: Players)=>{
                this.length = players.count; 
                this.dataSource = players.players; 
            })
        })
    }

    
    newLoad(){
        this.getDataSourceService.setPaginationValues(this.identifier, String(this.pageSize), String(0)); 
            this.subscriptionMonitor = this.getDataSourceService.getMany(this.urlLocationPath, this.identifier)
            .subscribe(result=>{
                result.subscribe((players: Players)=>{
                    this.dataSource = players.players; 
                    this.length = players.count
                    this.paginator.firstPage(); 
                })
            })
    }

    handlePage(event: PageEvent){
        
        this.pageSize = event.pageSize; 
        this.getDataSourceService.setPaginationValues(this.identifier, String(event.pageSize), String(event.pageIndex * event.pageSize)); 
        this.subscriptionMonitor.unsubscribe()
        this.subscriptionMonitor = this.getDataSourceService.getMany(this.urlLocationPath, this.identifier).subscribe(result=>{
            result.subscribe((players: Players)=>{
                this.dataSource = players.players; 
                this.length = players.count
            })
        })
    }

    handleClick(id: string){
        console.log(id);
        
        this.router.navigate(['/player', id])
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.

        this.getDataSourceService.clearParams(this.identifier); 
        
    }
    handleYearChange(year: string){
        
    }
}