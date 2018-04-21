import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }   from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ComposeComponent } from './compose/compose.component';

import { MailServiceService } from './services/mail-service.service';
import { SearchService } from './services/search.service';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SummaryComponent } from './summary/summary.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';
import { SearchPipe } from './pipes/search.pipe';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ComposeComponent,
    SummaryComponent,
    MailDetailComponent,
    SearchPipe,
    ChatComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [FormBuilder,MailServiceService,SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
