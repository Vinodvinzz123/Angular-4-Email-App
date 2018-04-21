import { Component, OnInit } from '@angular/core';
import { MailServiceService } from '../services/mail-service.service';
import {ActivatedRoute,Params,Router} from '@angular/router';

@Component({
  selector: 'app-mail-detail',
  templateUrl: './mail-detail.component.html',
  styleUrls: ['./mail-detail.component.css']
})
export class MailDetailComponent implements OnInit {
	mail;
  constructor(private mailService:MailServiceService,
  		private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit() {
      this.route.params.subscribe((params: Params) => {
	        let mailArray =  this.mailService.getMailDetail(params['id'])
          if(mailArray){
            this.mail = mailArray[0];
          }
    		})
    
  }

}
