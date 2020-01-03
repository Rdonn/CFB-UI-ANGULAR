import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { ConferenceTableIndexComponent } from './components/conferenceTable/conferenceTable.index.component';
import { TeamTableIndexComponent } from './components/teamTable/teamTableIndex.component';
import { HomePageComponent } from './components/homePage/homePage.component';
import { NavSidebarComponent } from './components/Sidebar/sideNav.component';
import { ConferenceDetailsComponent } from './components/conferenceDetails/conferenceDetails.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  
  {path:"", component: HomePageComponent} as Route,
  {path: "conferences", component: ConferenceTableIndexComponent},
  {path: "conferences/:conference_name/:conference_year",component: ConferenceDetailsComponent},
  {path: "teams", component: TeamTableIndexComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
