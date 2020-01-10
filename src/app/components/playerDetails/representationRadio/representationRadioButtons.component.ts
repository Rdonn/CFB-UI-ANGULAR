import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { Representation } from 'src/app/models/representation';
import { MatButtonToggleChange } from '@angular/material';
import { GetSingleEntityService } from 'src/app/Services/getSingleEntity.service';

@Component(
    {
        selector: 'player-rep-radio-buttons',
        templateUrl: 'representationRadioButtons.component.html',
        styleUrls: ['representationRadioButtons.component.scss']
    }
)



export class PlayerRepresentationRadioButtons implements OnInit, OnChanges{
    
    @Input() playerRepresentation: Representation; 
    @Output() change: EventEmitter<string> = new EventEmitter<string>(); 
    representationIterable: Array<string> = new Array<string>(); 

    ngOnInit(){
        
    }

    ngOnChanges(): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        console.log('there was a change from the child component');
        this.representationIterable = new Array(); 
        Object.keys(this.playerRepresentation).forEach(key=>{
            if(this.playerRepresentation[key] && key!="player_id" && key != "year_played"){
                this.representationIterable.push(key)
            }
             
        })
        
        
        
    }

    handleChange(category: MatButtonToggleChange){
        this.change.emit(category.value); 
    }
}