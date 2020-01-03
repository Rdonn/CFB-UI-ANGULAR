import { Component, OnInit, OnChanges, OnDestroy } from "@angular/core";
import { Conference, Conferences } from 'src/app/models/conferences.model';
import { GetDataSourceService } from 'src/app/Services/getDatasource.service';
import { FormControl } from '@angular/forms';
import { FilterData } from 'src/app/models/filter.model'
import { Observable, Subscription, of } from 'rxjs';
import { GlobalVars } from 'src/globals';
import { delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: "conference-table", 
    templateUrl: "conferenceTable.index.component.html", 
    styleUrls: ['confernceTable.index.component.scss']
})

export class ConferenceTableIndexComponent implements OnInit, OnDestroy{
    dataSource: Conference[]; 
    filterValues = {name: {name: 'name', value: ''} as FilterData, 
                    year: {name: 'year', value: ''} as FilterData}

    nameFilter = new FormControl('');
    yearFilter = new FormControl('');
    
    year: string = '2009'; 

    subscriptionMonitor: Subscription; 
    urlLocationPath: string[] = [GlobalVars.host, 'conferences', this.year]
    constructor(private getDataSourceService: GetDataSourceService, 
                private activatedRoute: ActivatedRoute, 
                private router: Router){
      
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
        result.subscribe((conference: Conferences)=>{
          this.dataSource = conference.conferences;
        })
        
      });
      
      
      
    }

    filterEdited(){
      this.subscriptionMonitor.unsubscribe();
      this.getDataSourceService.applyFilters(this.filterValues)
      this.subscriptionMonitor = this.getDataSourceService.getMany(this.urlLocationPath).subscribe((result)=>{
        result.subscribe((conference: Conferences)=>{
          this.dataSource = conference.conferences
        })
        
      })

    }

    handleYearChange(year: string){
      this.year = year; 
      this.urlLocationPath[2] = this.year; 
      this.subscriptionMonitor.unsubscribe(); 
      this.subscriptionMonitor = this.getDataSourceService.getMany(this.urlLocationPath).subscribe((result)=>{
        result.subscribe((conference: Conferences)=>{
          this.dataSource = conference.conferences; 
        })
      })
    }
    
    navigateToConferenceDetails(conference: Conference){
      console.log(this.activatedRoute.children);
      console.log(this.activatedRoute.outlet);
      this.router.navigate(['conferences', conference.name, conference.year])
      
      
      
    }

    ngOnDestroy(){
      this.getDataSourceService.clearParams(); 
      
    }
}