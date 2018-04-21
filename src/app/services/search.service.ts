import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import * as Rx from 'rxjs';

@Injectable()
export class SearchService {
	// getSearchText$;
	// observer;
	eventStream = new Rx.Subject();
	
  	constructor() { }
 //  	searchText
 //  	getSearchText = new Observable((observer) => {
    
 //    	// observable execution
 //    	console.log(this.searchText)
 //    	observer.next(this.searchText);
 //    	observer.complete()
	// })

  	// updateText(value){
  	// 	console.log(value);
  		
  // 	 	this.getSearchText$ = Rx.Observable.create(observer => {
		// 	observer.next(value);});
		// this.observer = {
	 //  		next: function(next) {
	 //    	console.log(next);
	 //  		},
	 //  		error: function(error) {
	 //    	console.log(error);
	 //  		},
	 //  		complete: function() {
	 //    	console.log("done");
	 //  		}
		// }
	
}
