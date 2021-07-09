import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppListComponent } from './app-list/app-list.component';
import { AppFormComponent } from './app-form/app-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { AlertComponent } from './alert/alert.component';
import { AppFormPositionComponent } from './app-form-position/app-form-position.component';
import { FormGroupComponent } from './form-group/form-group.component';

@NgModule({
  declarations: [
    AppComponent,
    AppListComponent,
    AppFormComponent,
    CardComponent,
    AlertComponent,
    AppFormPositionComponent,
    FormGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
