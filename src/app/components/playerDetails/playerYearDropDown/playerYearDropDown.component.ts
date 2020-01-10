import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";
import { Players } from 'src/app/models/players.model';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'player-year-dropdown',
    templateUrl: 'playerYearDropDown.component.html',
    styleUrls: ['playerYearDropDown.component.scss']
})

export class PlayerYearDropDownComponent implements OnInit{
    @Input() player: Players; 
    @Output() yearChange: EventEmitter<string> = new EventEmitter<string>(); 

    formControl: FormControl = new FormControl('')
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.formControl.valueChanges.subscribe(result=>{
            
            this.yearChange.emit(result); 
        })

        
    }


}