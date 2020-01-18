import { Team } from './team.model';

export interface Player{

    player_id: number;
    
    year_played: string;
    
    first_name: string;
    
    last_name: string;
    
    name: string;
    
    pos: string
    
    num: string
    
    year: string;

    height: string; 
    
    height_inches: number; 

    weight: number; 
    
    hometown: string; 
    
    last_school: string; 
    
    team?: Team;

    has_stats: boolean; 
}

export interface Players{
    players: Player[]; 

    count: number; 
}