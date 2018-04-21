import { Component } from '@angular/core';
import { MailServiceService } from './services/mail-service.service';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private mailService:MailServiceService,private searchService:SearchService,){}
	handleSearch(event){
	  	//console.log(this.searchService.eventStream)
	  	this.searchService.eventStream.next(event.target.value); 
	}
}
