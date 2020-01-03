import { Injectable } from "@angular/core";
import { HttpClient, HttpParams} from '@angular/common/http';
import { FilterData } from '../models/filter.model';
import {delay} from 'rxjs/operators'; 
import { Observable, timer, of } from 'rxjs';

//THIS NEEDS to be independent from get multiple entities,
//as we need to return an observable that artificially slows down the retrieval


@Injectable(
    {
        providedIn: 'root'
    }
)
export class GetDataSourceService {

    params: HttpParams = new HttpParams(); 

    constructor(private httpClient: HttpClient){
    }

    //if somebody is just hemmering the filter.... need to delay the request from being sent
    //could easily overload the server
    getMany(url:string[]){
        
        return of(this.httpClient.get(encodeURI(url.join('/')), {params: this.params}))
        .pipe(delay(500))
        
    }

    clearParams(){
        this.params = new HttpParams(); 
    }

    applyFilters(filters: any){
        this.params = new HttpParams(); 
        Object.keys(filters).forEach(key=>{
            if((filters[key] as FilterData).value.length != 0){
                var value = `${filters[key].name}|${filters[key].value}`
                if(this.params.has('filter')){
                    this.params = this.params.append('filter', value)
                    console.log('contains');
                    
                }
                else{
                    console.log('doesnt contain');
                    
                    this.params = this.params.set('filter', value);
                }
                 
            }
            
        })
        
        
        
    }


}