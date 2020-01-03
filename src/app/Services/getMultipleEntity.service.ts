import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class GetMultipleEntityService{

    constructor(private httpClient: HttpClient){

    }
}