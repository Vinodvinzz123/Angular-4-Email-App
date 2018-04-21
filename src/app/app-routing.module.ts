import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComposeComponent } from './compose/compose.component';
import { SummaryComponent } from './summary/summary.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';
import { ChatComponent } from './chat/chat.component';


const appRoutes : Routes = [
  { path: 'inbox', component: SummaryComponent, data:{type:'inbox',detail:'mail'}},
  { path: 'compose', component: ComposeComponent, data:{type:'compose',detail:'compose'}},
  { path: 'sentMail', component: SummaryComponent, data:{type:'sentMail',detail:'mail'}},
  { path: 'draft', component: SummaryComponent, data:{type:'draft',detail:'compose'}},
  { path: 'trash', component: SummaryComponent, data:{type:'trash',detail:'mail'}},
  { path: 'favorites', component: SummaryComponent, data:{type:'favorites',detail:'mail'}},
  { path: 'mail/:id', component: MailDetailComponent},
  { path: 'chat', component: ChatComponent, outlet: 'popup'},
  {path: '',   redirectTo: '/inbox', pathMatch: 'full' },
  //{path: 'compose/:id',   redirectTo: 'compose', pathMatch: 'full' },
]

@NgModule({
		
  imports: [
    RouterModule.forRoot(
      appRoutes,
     // {enableTracing : true}
    ),
  ],
  exports: [
  	RouterModule
  ]
})
export class AppRoutingModule { }