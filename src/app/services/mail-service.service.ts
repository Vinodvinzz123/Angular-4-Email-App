import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class MailServiceService {
	url = "/resources/inbox.json";
	id:number = 106;
	mailList : any = [];
	dataFetchedFromServer = false;
  	constructor(private http: Http) { }

 	getSummaryData(routeType){
 		let mailsArray = [];
		if(this.dataFetchedFromServer){
			mailsArray = this.getMailByType(routeType);
			//console.log(mailsArray);
			return Observable.of(mailsArray);
		} else {
			return this.http.get(this.url).map((response)=>{
				let mails = response.json().mails.map(mail => {
					mail["isSelected"] = false;
					mail["isDraft"] = false;
					return mail;
				});
				this.mailList = this.mailList.concat(mails)
				mailsArray = this.getMailByType(routeType);
				//console.log(mailsArray);
				this.dataFetchedFromServer = true;
				return mailsArray;
			})
		}
	}
		
	getMailByType(routeType){
		//console.log(this.mailList)	
		let mailsArray = [];	
		switch (routeType) {
  			case "inbox":
  				mailsArray = this.mailList.filter(mail => {
  					return (mail.toName == "Swati" && mail.isTrash == false && mail.isDraft == false);
  				})
  				break;
  			case "sentMail":
  				mailsArray = this.mailList.filter(mail => {
  					return (mail.fromName == "Swati" && mail.isTrash == false && mail.isDraft == false);
  				})
  				break;
  			case "trash":
  				mailsArray = this.mailList.filter(mail => {
  					return (mail.isTrash == true);
  				})
  				
  				break;
  			case "draft":
  				mailsArray = this.mailList.filter(mail => {
  					return (mail.isDraft == true  && mail.isTrash == false);
  				})
  				break;
  			case "favorites":
  				mailsArray = this.mailList.filter(mail => {
  					return (mail.isFavorite == true && mail.isTrash == false && mail.isDraft == false);
  				})
  				break;
  			default:
  				break;
  		}
  	 	return mailsArray;
	}

	addMail(mail){
  		if(!mail.id){
  			mail = this.addMailProperties(mail);
  			this.mailList.push(mail);
  		}else{
  			this.mailList.forEach((mailObj) => {
  				if(mailObj.id == mail.id){
					mailObj.isDraft = false;
				}
			})
  		}
  	}

	addMailProperties(newMail){
		newMail["id"] = this.id++;
  		newMail["isSelected"] = false;
		newMail["isDraft"] = false;
		return newMail;
	}

	handleDraft(draft){
		if(!draft.id){
			this.addMail(draft);
		}
		this.mailList.map((mail) => {
			if(mail.id == draft.id){
				mail.isDraft = true;
			}
		})
		
	}

	
	getMailDetail(id){
		if(this.dataFetchedFromServer){
			return this.mailList.filter(mail => mail.id == id)
	 	}
	}

	deleteFromList(deleteMail){
		this.mailList =  this.mailList.filter(mail => {
			return mail.id !== deleteMail.id
		})
	}
	
	// handleSearch(searchText){
	// 	console.log(this.mailList);
	// 	if(searchText){
	// 		searchText = searchText.toLowerCase();
	// 		this.mailList = this.mailList.filter(mail => {

	// 			return mail['toName'].toLowerCase().indexOf(searchText)>-1;
	// 		});
	// 		console.log(this.mailList);
	// 	}
		
	// }
 
}

