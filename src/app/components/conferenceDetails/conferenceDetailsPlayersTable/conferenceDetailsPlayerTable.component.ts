import { Component, Input, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { Conference } from 'src/app/models/conferences.model';
import { GlobalVars } from 'src/globals';
import { Player, Players } from 'src/app/models/players.model';
import { Subscription } from 'rxjs';
import { GetDataSourceService } from 'src/app/Services/getDatasource.service';
import { FormControl } from '@angular/forms';
import { FilterData } from 'src/app/models/filter.model';
import { PageEvent } from '@angular/material';
import { BaseTable } from '../../baseClasses/baseTable';



@Component({
    selector: 'conference-details-player-table',
    templateUrl: 'conferenceDetailsPlayerTable.component.html', 
    styleUrls: ['conferenceDetailsPlayerTable.component.scss']
})

export class ConferenceDetailsPlayerTableComponent extends BaseTable implements OnInit, OnDestroy{
    @Input() conference: Conference
    identifier = 'ConferenceDetailsPlayerTableComponent'
    dataSource: Player[];
    initial_params: {name: string, value: string}[];  
    
    subscriptionMonitor: Subscription; 
    urlLocationPath: string[] = [GlobalVars.host, 'players', 'conference']


    columnDefs: string[] = ['first_name', 'last_name', 'pos', 'num', 'year', 'height',
    'weight', 'team.name', 'team.year']

    filterValues = {first_name: {name: 'first_name', value: ''} as FilterData, 
                    last_name: {name: 'last_name', value: ''} as FilterData}

    firstNameFilter = new FormControl('');

    lastNameFilter = new FormControl('');


    teamNameFormValue = new FormControl(''); 
    constructor(private getDataSourceService:GetDataSourceService){
        super();
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        console.log(this.paginator);
        
        
        this.initial_params = [{
            name: 'conference',
            value: this.conference.name
        },
        {
            name: 'conference_year',
            value: this.conference.year
        }];

        this.getDataSourceService.setPaginationValues(this.identifier, String(this.pageSize), String(0)); 


        this.firstNameFilter.valueChanges.pipe().subscribe(result=>{

            this.filterValues.first_name.value = result; 
            this.subscriptionMonitor.unsubscribe()
            this.getDataSourceService.applyFilters(this.filterValues, this.identifier)
            this.getDataSourceService.setPaginationValues(this.identifier, String(this.pageSize), String(0)); 
            this.subscriptionMonitor = this.getDataSourceService.getMany(this.urlLocationPath, this.identifier)
            .subscribe(result=>{
                result.subscribe((players: Players)=>{
                    this.dataSource = players.players; 
                    this.length = players.count
                    this.paginator.firstPage(); 
                })
            })
            
        })
        this.lastNameFilter.valueChanges.subscribe(result=>{
            this.filterValues.last_name.value = result; 
            this.subscriptionMonitor.unsubscribe()
            this.getDataSourceService.applyFilters(this.filterValues, this.identifier); 
            this.getDataSourceService.setPaginationValues(this.identifier, String(this.pageSize), String(0)); 
            this.subscriptionMonitor = this.getDataSourceService.getMany(this.urlLocationPath, this.identifier)
            .subscribe(result=>{
                result.subscribe((players: Players)=>{
                    this.dataSource = players.players; 
                    this.length = players.count
                    this.paginator.firstPage();
                })
            })
        })

        this.teamNameFormValue.valueChanges.subscribe(result=>{
            if (result == ''){
                this.getDataSourceService.removeSpecificParam(this.identifier, 'team_name')
            }
            else{
                this.getDataSourceService.addQueryParam(this.identifier, 'team_name', result); 
            }
            this.getDataSourceService.setPaginationValues(this.identifier, String(this.pageSize), String(0)); 
            this.subscriptionMonitor.unsubscribe()
            this.subscriptionMonitor = this.getDataSourceService.getMany(this.urlLocationPath, this.identifier)
            .subscribe(result=>{
                result.subscribe((players: Players)=>{
                    this.dataSource = players.players; 
                    this.length = players.count
                    this.paginator.firstPage();

                })
            })
        })

        this.getDataSourceService.setParamsInitial(this.identifier,this.initial_params)
        this.getDataSourceService.setPaginationValues(this.identifier, String(this.pageSize), String(0)); 

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

    ngOnDestroy(){
        this.getDataSourceService.clearParams(this.identifier); 
        
    }

}