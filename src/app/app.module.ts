
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FilterpipePipe } from './filterpipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FilterpipePipe 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

