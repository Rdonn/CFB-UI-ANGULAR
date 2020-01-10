import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, ExtraOptions } from '@angular/router';
import { ConferenceTableIndexComponent } from './components/conferenceTable/conferenceTable.index.component';
import { TeamTableIndexComponent } from './components/teamTable/teamTableIndex.component';
import { HomePageComponent } from './components/homePage/homePage.component';
import { NavSidebarComponent } from './components/Sidebar/sideNav.component';
import { ConferenceDetailsComponent } from './components/conferenceDetails/conferenceDetails.component';
import { AppComponent } from './app.component';
import { TeamDetailsComponent } from './components/teamDetails/teamDetails.component';
import { PlayerTableIndexComponent } from './components/playerTable/playerTableIndex.component';
import { PlayerDetailsComponent } from './components/playerDetails/playerDetails.component';
import { PlayerStatisticsViewComponent } from './components/playerDetails/playerStatisticsView/playerStatisticsView.component';


const routes: Routes = [
  
  {path:"", component: HomePageComponent} as Route,
  {path: "conferences", component: ConferenceTableIndexComponent},
  {path: "conferences/:conference_name/:conference_year",component: ConferenceDetailsComponent},
  {path: "teams", component: TeamTableIndexComponent}, 
  {path: "teams/:team_name/:team_year", component: TeamDetailsComponent}, 
  {path: "players", component: PlayerTableIndexComponent}, 
  {path: "player/:player_id", component: PlayerDetailsComponent, children: [
    {path: ":year_played/:category", component: PlayerStatisticsViewComponent}
  ]}
  ];

const options: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
}
@NgModule({
  imports: [RouterModule.forRoot(routes, options)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
