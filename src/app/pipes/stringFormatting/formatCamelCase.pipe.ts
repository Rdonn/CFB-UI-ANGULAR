import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'formatCamel'
})

export class FormatCamelCasePipe implements PipeTransform{
    transform(value: string): string{
        let toJoin = new Array<string>(); 
        for(var i = 0 ; i< value.length; i++){
            if(value.charAt(i) == value.charAt(i).toUpperCase()){
                var charToSplit = value.charAt(i); 
                toJoin.push(" " + value.charAt(i)); 
                
            }
            else{
                toJoin.push(value.charAt(i)); 
            }
        }
        toJoin[0] = toJoin[0].toUpperCase(); 
        return toJoin.join(''); 
        
        
    }
}