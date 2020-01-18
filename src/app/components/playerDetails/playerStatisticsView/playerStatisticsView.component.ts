import { Component, OnInit, OnDestroy, AfterViewInit, OnChanges } from "@angular/core";
import { GetSingleEntityService } from 'src/app/Services/getSingleEntity.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PlayerCategories } from 'src/app/models/representation';

@Component({
    selector: 'player-statistics', 
    templateUrl: 'playerStatisticsView.component.html', 
    styleUrls: ['playerStatisticsView.component.scss']
})

export class PlayerStatisticsViewComponent implements OnInit {

    player_id: string; 
    year_played: string; 
    category: string; 
    player_name: string; 
    player_number: string; 
    statistic: any; 
    iterable_stats: Array<{name: string, value: number}>;
    displayColumns: string[] = []; 
    constructor(private getSingleEntityService: GetSingleEntityService,
                private activatedRoute: ActivatedRoute,
                private router: Router){
                
    }

    ngOnInit(){
        this.activatedRoute.params.subscribe(
            params=>{
                
                
                this.player_id = params['player_id']; 
                this.year_played = params['year_played']; 
                this.category = params['category']
                this.getSingleEntityService.getPlayerStatByCategory(this.player_id, 
                    this.year_played, 
                    this.category)
                    .subscribe(result=>{
                        try {
                            this.player_name = `${result['first_name']} ${result['last_name']}`; 
                            this.player_number = result['num']
                        } catch (error) {
                            this.router.navigate(['../../'], {relativeTo: this.activatedRoute})
                            return;
                        }
                        
                        Object.keys(result).forEach(key=>{
                            if (Object.keys(PlayerCategories).includes(key)){
                                this.statistic = result[key]
                                this.iterable_stats = new Array(); 
                                Object.keys(this.statistic).forEach(key=>{
                                    if(key != "playerid" && key!="yearplayed" && key != "Split"){
                                        this.iterable_stats.push({name: key, value: this.statistic[key]});
                                    }
                                    
                                })
                                this.iterable_stats.forEach(value=>{
                                    this.displayColumns.push(value.name); 
                                })
                                
                                
                            }

                        })
                        
                        
                    })
            }
        )        
    }

}