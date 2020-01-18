import { Injectable } from "@angular/core";

@Injectable()
export class NavigationDepthService{
    static navigationDepthService: NavigationDepthService; 
    private directions: Function; 
    constructor(){
        if (NavigationDepthService === null){
            NavigationDepthService.navigationDepthService = new NavigationDepthService(); 
        }
        else{
            return NavigationDepthService.navigationDepthService; 
        }
    }
    setDirections(directions: Function){
        console.log('setting');
        
        this.directions = directions;
    }

    get navigate(){
        return this.directions;
    }
}