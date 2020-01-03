import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatSidenavModule} from "@angular/material/sidenav"
import { NavSidebarComponent } from './components/Sidebar/sideNav.component';
import { ConferenceTableIndexComponent } from './components/conferenceTable/conferenceTable.index.component';
import {MatTableModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatToolbarModule, MatButtonModule, MatButtonToggle, MatButtonToggleModule} from '@angular/material'
import { GetDataSourceService } from './Services/getDatasource.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YearDropdownButtonComponent } from './components/misc/buttons/yearDropdownButton.component';
import { TeamTableIndexComponent } from './components/teamTable/teamTableIndex.component';
import { HomePageComponent } from './components/homePage/homePage.component';
import { ConferenceDetailsComponent } from './components/conferenceDetails/conferenceDetails.component';
import { GetSingleEntityService } from './Services/getSingleEntity.service';
import { ConferenceDetailsTableTeamComponent } from './components/conferenceDetails/conferenceDetailsTable/conferenceDetailsTeamsTable.component';
@NgModule({
  declarations: [
    AppComponent, 
    NavSidebarComponent, 
    ConferenceTableIndexComponent, 
    YearDropdownButtonComponent, 
    TeamTableIndexComponent, 
    HomePageComponent,
    ConferenceDetailsComponent, 
    ConferenceDetailsTableTeamComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    
    HttpClientModule,
    BrowserAnimationsModule, 
    MatSidenavModule, 
    MatTableModule, 
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule, 
    RouterModule, 
    MatMenuModule, 
    MatToolbarModule, 
    FormsModule, 
    MatButtonModule, 
    MatButtonToggleModule
    
    
  ],
  providers: [
    GetDataSourceService, 
    GetSingleEntityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
