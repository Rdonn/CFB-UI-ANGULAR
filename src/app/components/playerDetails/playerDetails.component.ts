import { Component, OnInit } from "@angular/core";
import { GetSingleEntityService } from 'src/app/Services/getSingleEntity.service';
import { Representation } from 'src/app/models/representation';
import { ActivatedRoute, Router } from '@angular/router';
import { Players, Player } from 'src/app/models/players.model';
import { take } from 'rxjs/operators';
import { isUndefined } from 'util';


@Component({
    selector: 'player-details',
    templateUrl: 'playerDetails.component.html',
    styleUrls: ['playerDetails.component.scss']
})

export class PlayerDetailsComponent implements OnInit{
    private representation: Representation; 
    private playerID: string; 
    private playerTuples: Players; 
    private player: Player; 
    private selectedYear: string; 
    private category: string; 
    private navigatedTo: boolean; 
    constructor(private getSingleEntityService: GetSingleEntityService, 
                private activatedRoute: ActivatedRoute, 
                private router: Router ){
    }

    ngOnInit(){
        this.activatedRoute.params.subscribe(result=>{
            this.playerID = result['player_id']

            this.getSingleEntityService.getPlayerWithYears(this.playerID)
            .pipe(take(1))
            .subscribe((result: Players)=>{
                this.player = result.players[0]
                this.playerTuples = result;
                this.selectedYear = result.players[0].year_played;
                this.getSingleEntityService.getRepresentation(this.playerID, this.selectedYear)
                .subscribe((playerRep: Representation)=>{
                    this.representation = playerRep; 
                })
            })
        })

        
        
    }

    handleYearChange(year: string){
        console.log(this.router.url);
        
        this.selectedYear = year; 
        this.getSingleEntityService.getRepresentation(this.playerID, this.selectedYear)
        .subscribe((playerRep: Representation)=>{
            this.representation = playerRep;
            if(!isUndefined(this.category)){
                this.router.navigate([this.selectedYear, this.category], {relativeTo: this.activatedRoute})
                this.navigatedTo = true;
            }
            
        })
        
        console.log(year);
        
    }

    handleCategoryChange(category: string){
        this.category = category; 
        this.router.navigate([this.selectedYear, this.category], {relativeTo: this.activatedRoute})
        
    }
}