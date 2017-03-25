import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';
import { WelcomeComponent } from "./home/welcome.component";
import { RouterModule } from '@angular/router'
import { ProductModule } from "./products/product.module";
//import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  imports: [BrowserModule,
    FormsModule,
    HttpModule,
    //AppRoutingModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    ProductModule
  ],
  declarations: [AppComponent, WelcomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
