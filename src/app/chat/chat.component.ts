import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
	details: string;
  sending = false;
 
  constructor(private router: Router) {}
  ngOnInit() {
  }
 
	send() {
  	this.sending = true;
  	this.details = 'Sending Message...';

    setTimeout(() => {
  		this.sending = false;
    		this.closePopup();
  	}, 1000);
	}

	cancel() {
  	this.closePopup();
	}

	closePopup() {
  	// Providing a `null` value to the named outlet
  	// clears the contents of the named outlet
  	this.router.navigate([{ outlets: { popup: null }}]);
	}

}
