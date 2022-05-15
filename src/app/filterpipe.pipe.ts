import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(values: any,input:any) {
    if (input){
      return values.filter(function(element:any){
        if(element.name != undefined)
        return element.name.toUpperCase().startsWith(input.toUpperCase())
      })
    }
    return values;
  }

}
