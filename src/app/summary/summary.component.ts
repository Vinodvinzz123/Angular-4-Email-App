import { Component, OnInit } from '@angular/core';
import { MailServiceService } from '../services/mail-service.service';
import { SearchService } from '../services/search.service';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
	routeType  = "";
  detailRoute = ""
	mailsArray = [];
  isSelectAllChecked = false;
  searchText;
	
	constructor(private mailService:MailServiceService,
    private searchService:SearchService,
		private route: ActivatedRoute,
		private router : Router,) { }

	ngOnInit() {
    this.route.data.subscribe((data) => {
      this.routeType = data.type;
      this.detailRoute = data.detail;
      this.getSummaryData(this.routeType);
    });

    this.searchService.eventStream.subscribe(searchText => this.searchText = searchText);
  }

  getSummaryData(routeType){
    this.mailService.getSummaryData(routeType).subscribe(data => {
        this.mailsArray = data;
    });
  }

	handleCheckBox(mail,selected){
    this.mailsArray.forEach((selectMail) => {
      if(mail.id === selectMail.id){
        selectMail.isSelected  = selected;
      }
    });
    var selectedCities = [];
    selectedCities = this.mailsArray.filter(mail => mail.isSelected);
    if(this.mailsArray.length == selectedCities.length){
      this.isSelectAllChecked = true;
    }else{
      this.isSelectAllChecked = false;
    }
  }
 
  handleDelete(event){
    this.isSelectAllChecked = false;
    this.mailsArray.forEach((selectMail) => {
      if(selectMail.isSelected == true){
        if(selectMail.isTrash == true){
          this.mailService.deleteFromList(selectMail);
        }else{
          selectMail.isTrash = true;
          selectMail.isSelected = false;
        }
      }
    })
    this.getSummaryData(this.routeType);
  }

  handleFavorite(){
    this.mailsArray.forEach((selectMail) => {
      if(selectMail.isSelected == true){
        if(selectMail.isFavorite == true){
          selectMail.isFavorite = false;
          selectMail.isSelected = false;
        }else{
          selectMail.isFavorite = true;
          selectMail.isSelected = false;
          this.router.navigate(['favorites']);
        }
     
      }
    });
    this.getSummaryData(this.routeType);
    
  }

  handleSelectAll(selected){
    this.mailsArray.forEach((selectMail) =>{
      selectMail.isSelected = selected;
    })
  }

  handleRowClick(event,mail){
    let route = this.detailRoute;
    if(event.target.nodeName == "TD"){
      if(this.detailRoute != 'compose'){
        route +=  '/' + mail.id;  
      };
      this.router.navigate([route],{ queryParams: { id: mail.id } });
    }
  }
 
}
