import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl } from '@angular/forms';



@Component({
    selector: 'year-dropdown-button', 
    templateUrl: 'yearDropdownButton.component.html'
})

export class YearDropdownButtonComponent implements OnInit{
    @Input() year: string; 
    @Output() yearChange:EventEmitter<any> = new EventEmitter()
    formControl: FormControl = new FormControl(''); 
    items = [...Array(11).keys()].map(x=>x+2009);
    ngOnInit(): void {
        this.formControl
        .valueChanges
        .subscribe(result=>{
            this.year = result
            this.yearChange.emit(result); 
            
        })
    }
}