export class Representation{


    player_id: number;

    year_played: string;

    allPurposeRunning: boolean;
    
    fumbleReturns: boolean;
   
    interceptions: boolean;
    
    kickoffReturn: boolean;
    
    kickoffs: boolean;
    
    miscDefense: boolean;
    
    passing: boolean;
    
    placeKicking: boolean;
    
    puntReturn: boolean;
    
    punting: boolean;
    
    receiving: boolean;
    
    rushing: boolean;
    
    sacks: boolean;
    
    scoring: boolean;
    
    tackles: boolean;
    
    tacklesForLoss: boolean;
    
    totalOffense: boolean;
    
    yardsFromScrimmage: boolean;
}

export enum PlayerCategories {
    allPurposeRunning,
    fumbleReturns,
    interceptions,
    kickoffReturn,
    kickoffs,
    miscDefense,
    passing,
    placeKicking,
    puntReturn,
    punting,
    receiving,
    rushing,
    sacks,
    scoring,
    tackles,
    tacklesForLoss,
    totalOffense,
    yardsFromScrimmage,
};

