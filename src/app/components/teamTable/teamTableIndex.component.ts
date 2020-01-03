import { Component, OnInit, OnDestroy } from "@angular/core";
import { FilterData } from 'src/app/models/filter.model';
import { Teams, Team } from 'src/app/models/team.model';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalVars } from 'src/globals';
import { GetDataSourceService } from 'src/app/Services/getDatasource.service';

@Component({
    selector: 'team-table', 
    templateUrl: 'teamTableIndex.component.html', 
    styleUrls: ['teamTableIndex.component.scss']
})

export class TeamTableIndexComponent implements OnInit, OnDestroy{
    dataSource: Team[]; 
    filterValues = {name: {name: 'name', value: ''} as FilterData, 
                    year: {name: 'year', value: ''} as FilterData}

    nameFilter = new FormControl('');
    yearFilter = new FormControl('');
    
    year: string = '2009'; 

    subscriptionMonitor: Subscription; 
    urlLocationPath: string[] = [GlobalVars.host, 'teams', this.year]
    constructor(private getDataSourceService: GetDataSourceService){
      
    }

    ngOnInit(): void {
      

      this.nameFilter.valueChanges
      .subscribe(name=>{
        this.filterValues.name.value = name; 
      })

      this.yearFilter.valueChanges
      .subscribe(year=>{
        this.filterValues.year.value = year; 
      })

      this.subscriptionMonitor = this.getDataSourceService
      .getMany(this.urlLocationPath)
      .subscribe((result)=>{
        result.subscribe((team: Teams)=>{
          this.dataSource = team.teams;
        })
        
      });
      
      
      
    }

    filterEdited(){
      this.subscriptionMonitor.unsubscribe();
      this.getDataSourceService.applyFilters(this.filterValues)
      this.subscriptionMonitor = this.getDataSourceService.getMany(this.urlLocationPath).subscribe((result)=>{
        result.subscribe((team: Teams)=>{
          this.dataSource = team.teams;
        })
        
      })

    }

    handleYearChange(year: string){
      this.year = year; 
      this.urlLocationPath[2] = this.year; 
      this.subscriptionMonitor.unsubscribe(); 
      this.subscriptionMonitor = this.getDataSourceService.getMany(this.urlLocationPath).subscribe((result)=>{
        result.subscribe((team: Teams)=>{
          this.dataSource = team.teams; 
        })
      })
    }

    ngOnDestroy(): void {
        this.getDataSourceService.clearParams(); 
        
    }
}