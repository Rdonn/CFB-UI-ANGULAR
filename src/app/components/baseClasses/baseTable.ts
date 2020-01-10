import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material';


export class BaseTable{
    @ViewChild(MatPaginator, {static: false}) paginator !: MatPaginator;
    pageSizeOptions = [10,25,50,100,200];
    pageSize = 10; 
    length: number; 
    

}