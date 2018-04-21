import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
	transform(value: any, searchText?: any,keys?:any): any {
	    keys = keys.split(',');
	    
	    if(searchText){
	    	searchText = searchText.toLowerCase()
	  		let filteredItems = value.filter((item)=>{
	        	return keys.some(key => {
	          		//console.log(item[key]);
	          		return item[key].toLowerCase().indexOf(searchText)>-1;
	        	})
	  		})  
	  		return filteredItems;
	  	} else {
	  		return value;	
	  	}
	}
}
