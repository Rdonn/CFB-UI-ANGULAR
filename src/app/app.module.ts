import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatSidenavModule} from "@angular/material/sidenav"
import { NavSidebarComponent } from './components/Sidebar/sideNav.component';
import { ConferenceTableIndexComponent } from './components/conferenceTable/conferenceTable.index.component';
import {MatTableModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatToolbarModule, MatButtonModule, MatButtonToggle, MatButtonToggleModule, MatPaginatorModule} from '@angular/material'
import { GetDataSourceService } from './Services/getDatasource.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YearDropdownButtonComponent } from './components/misc/buttons/yearDropdownButton.component';
import { TeamTableIndexComponent } from './components/teamTable/teamTableIndex.component';
import { HomePageComponent } from './components/homePage/homePage.component';
import { ConferenceDetailsComponent } from './components/conferenceDetails/conferenceDetails.component';
import { GetSingleEntityService } from './Services/getSingleEntity.service';
import { ConferenceDetailsTableTeamComponent } from './components/conferenceDetails/conferenceDetailsTable/conferenceDetailsTeamsTable.component';
import { ConferenceDetailsPlayerTableComponent } from './components/conferenceDetails/conferenceDetailsPlayersTable/conferenceDetailsPlayerTable.component';
import { TeamDetailsComponent } from './components/teamDetails/teamDetails.component';
import { TeamRosterTableComponent } from './components/teamDetails/teamRosterTable/teamRosterTable.component';
import { PlayerTableIndexComponent } from './components/playerTable/playerTableIndex.component';
import { PlayerDetailsComponent } from './components/playerDetails/playerDetails.component';
import { PlayerYearDropDownComponent } from './components/playerDetails/playerYearDropDown/playerYearDropDown.component';
import { PlayerRepresentationRadioButtons } from './components/playerDetails/representationRadio/representationRadioButtons.component';
import { PlayerStatisticsViewComponent } from './components/playerDetails/playerStatisticsView/playerStatisticsView.component';
import { FormatCamelCasePipe } from './pipes/stringFormatting/formatCamelCase.pipe';
@NgModule({
  declarations: [
    AppComponent, 
    NavSidebarComponent, 
    ConferenceTableIndexComponent, 
    YearDropdownButtonComponent, 
    TeamTableIndexComponent, 
    HomePageComponent,
    ConferenceDetailsComponent, 
    ConferenceDetailsTableTeamComponent, 
    ConferenceDetailsPlayerTableComponent,
    TeamDetailsComponent,
    TeamRosterTableComponent, 
    PlayerTableIndexComponent,
    PlayerDetailsComponent,
    PlayerYearDropDownComponent, 
    PlayerRepresentationRadioButtons,
    PlayerStatisticsViewComponent,
    FormatCamelCasePipe
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
    MatButtonToggleModule, 
    MatPaginatorModule
    
    
  ],
  providers: [
    GetDataSourceService, 
    GetSingleEntityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
