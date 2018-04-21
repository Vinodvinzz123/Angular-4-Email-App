import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,AbstractControl,Validators,} from '@angular/forms';
import { MailServiceService } from '../services/mail-service.service';
import { Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
	mailForm: FormGroup;
	date: Date = new Date();
	id;
	mail
	draftMail
	newMail = {"fromName" : "Swati","toName" : "","subject" : "","body" : "","sentDate" : this.date,"isTrash" : false,"isFavorite" : true};
	//draftMail = this.mailService.draftMail
	
	//mail = this.newMail;	
	
	constructor(public fb: FormBuilder,
		private mailService:MailServiceService,
		private router : Router,
		private route : ActivatedRoute,
		) { }

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.id = params['id'];
            let mailArray =  this.mailService.getMailDetail(this.id);
            if(mailArray){
            	this.draftMail = mailArray[0];
            }
         	this.generateForm(); 
      	});		
	}


  
   	generateForm(){
   		this.mail = this.draftMail ? this.draftMail : this.newMail ;
   			this.mailForm = this.fb.group({
			toName : [this.mail.toName],
			fromName : [this.mail.fromName],
			subject : [this.mail.subject],
			body : [this.mail.body],
			sentDate : [this.mail.sentDate],
			isTrash : [this.mail.isTrash],
			isFavorite : [this.mail.isFavorite]
		})
	}

	handleSubmit(){
		let sendMail = this.id ? Object.assign(this.draftMail,this.mailForm.value) : this.mailForm.value
		this.mailService.addMail(sendMail);
		this.router.navigate(["sentMail"]);
	}

	handleDraft(){
		let draft = this.id ? Object.assign(this.draftMail,this.mailForm.value) : this.mailForm.value;
		this.mailService.handleDraft(draft);
		
		this.router.navigate(["draft"]);
	}

	deleteFormValues(){
		this.generateForm();
	}
}
