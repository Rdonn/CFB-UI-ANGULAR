import {Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { GlobalVars } from 'src/globals';


@Injectable()
export class GetSingleEntityService{
    host: string = GlobalVars.host; 
    constructor(private httpClient: HttpClient){

    }

    getRepresentation(player_id: string, player_year: string){
        //players/stats/categories/representation/1069835/2018
        var formattedURL = encodeURI([this.host, 'players', 'stats', 'categories', 'representation', player_id, player_year].join("/"))
        return this.httpClient.get(formattedURL); 
    }

    getConference(conference_year: string, conference_name: string){
        var formattedURL = encodeURI([this.host, conference_year, conference_name].join("/")); 
        return this.httpClient.get(formattedURL)
    }

    getPlayerWithYears(player_id: string){
        //http://localhost:3000/players/player/1069835
        return this.httpClient.get(encodeURI([this.host, 'players', 'player', player_id].join('/')))

    }
    ///players/stats/{player_id}/{player_year}/{category}
    getPlayerStatByCategory(player_id: string, player_year: string, category: string){
        var formattedURL = encodeURI([this.host,'players', 'stats', player_id, player_year, category].join('/'))
        return this.httpClient.get(formattedURL); 
    }
}