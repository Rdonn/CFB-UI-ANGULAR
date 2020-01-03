import {Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class GetSingleEntityService{

    constructor(private httpClient: HttpClient){

    }

    geConference(host: string, conference_year: string, conference_name: string){
        var formattedURL = encodeURI([host, conference_year, conference_name].join("/")); 
        return this.httpClient.get(formattedURL)
    }
}