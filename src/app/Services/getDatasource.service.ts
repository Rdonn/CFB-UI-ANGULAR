import { Injectable } from "@angular/core";
import { HttpClient, HttpParams} from '@angular/common/http';
import { FilterData } from '../models/filter.model';
import {delay} from 'rxjs/operators'; 
import { Observable, timer, of } from 'rxjs';
import { isUndefined } from 'util';

//THIS NEEDS to be independent from get multiple entities,
//as we need to return an observable that artificially slows down the retrieval


@Injectable(
    {
        providedIn: 'root'
    }
)
export class GetDataSourceService {

    param_map: Map<string, HttpParams> = new Map<string, HttpParams>(); 
    constructor(private httpClient: HttpClient){
    }

    //if somebody is just hemmering the filter.... need to delay the request from being sent
    //could easily overload the server
    getMany(url:string[], hash){
        console.log(this.param_map);
        
        if(this.param_map.has(hash)){
            return of(this.httpClient.get(encodeURI(url.join('/')), {params: this.param_map.get(hash)}))
            .pipe(delay(500));
        }
        else{
            return of(this.httpClient.get(encodeURI(url.join('/'))))
            .pipe(delay(500)); 
        }
        
        
    }

    removeSpecificParam(hash: string, name: string, value?: string){
        var temp_params: HttpParams; 
        if(this.param_map.has(hash)){
            temp_params = this.param_map.get(hash); 
        }
        else{
            temp_params = new HttpParams(); 
        }

        if(!isUndefined(value)){
            temp_params = temp_params.delete(name, value); 
        }
        else{
            temp_params = temp_params.delete(name); 
        }
        this.param_map.set(hash, temp_params); 
    }


    addQueryParam(hash: string, name: string, value: string){
        var temp_params:HttpParams; 
        if(this.param_map.has(hash)){
            temp_params = this.param_map.get(hash); 
        }
        else{
            temp_params = new HttpParams(); 
        }

        temp_params = temp_params.set(name, value); 
        this.param_map.set(hash, temp_params); 
    }

    setParamsInitial(hash: string, params: {name: string, value: string}[]){
        var temp_params:HttpParams;
        if(this.param_map.has(hash)){
            temp_params = this.param_map.get(hash); 
        }
        else{
            temp_params = new HttpParams(); 
        }
         

        params.forEach(result=>{
            temp_params = temp_params.append(result.name, result.value)
        })
        this.param_map.set(hash, temp_params); 
    }

    clearParams(hash){
        this.param_map.delete(hash); 
    }

    applyFilters(filters: any, hash: string){
        if(!this.param_map.has(hash)){
            this.param_map.set(hash, new HttpParams()); 
        }
        else{
            this.param_map.set(hash, this.param_map.get(hash).delete('filter'))
        }
        Object.keys(filters).forEach(key=>{
            if((filters[key] as FilterData).value.length != 0){
                var value = `${filters[key].name}|${filters[key].value}`
                
                if(this.param_map.get(hash).has('filter')){
                    this.param_map.set(hash, this.param_map.get(hash).append('filter', value))   
                }
                else{
                    this.param_map.set(hash, this.param_map.get(hash).set('filter', value));
                }
                 
            }
            
        })
        
        
        
    }

    applySpecificFilter(filters: any, filterKey: string, hash: string){
        if(!this.param_map.has(hash)){
            this.param_map.set(hash, new HttpParams()); 
        }
        else{
            this.param_map.set(hash, this.param_map.get(hash).delete(filterKey))
        }
        Object.keys(filters).forEach(key=>{
            if((filters[key] as FilterData).value.length != 0){
                var value = `${filters[key].name}|${filters[key].value}`
                
                if(this.param_map.get(hash).has(filterKey)){
                    this.param_map.set(hash, this.param_map.get(hash).append(filterKey, value))   
                }
                else{
                    this.param_map.set(hash, this.param_map.get(hash).set(filterKey, value));
                }
                 
            }
            
        })
    }

    setPaginationValues(hash:string, limit: string, offset: string){
        var temp_params: HttpParams; 
        if (this.param_map.has(hash)){
            temp_params = this.param_map.get(hash); 
        }
        else{
            temp_params = new HttpParams(); 
        }
        temp_params = temp_params.set('limit', limit)
        temp_params = temp_params.set('offset', offset)
        this.param_map.set(hash, temp_params)
    }


}