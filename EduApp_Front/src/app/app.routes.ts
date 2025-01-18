import { Routes } from '@angular/router';
import { AllchatsComponent } from './components/allchats/allchats.component';
import { HomecontentComponent } from './components/homecontent/homecontent.component';
import { GroupChatComponent } from './components/group-chat/group-chat.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { RouteGuardServiceService } from './services/route-guard-service.service';
import { RepositoryComponent } from './components/repository/repository.component';
import { HelpComponent } from './components/help/help.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';
import { ManagerComponent } from './components/Administration/manager/manager.component';
import { AdminRouteGuardService } from './services/Aministration/admin-route-guard.service';
import { MarketPlaceComponent } from './components/market-place/market-place.component';
import { FolderComponent } from './components/folder/folder.component';

export const routes: Routes = [
    { path: '', component: HomecontentComponent, },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'newchat', component: NewChatComponent, canActivate: [RouteGuardServiceService]},
    { path: 'allchats', component: AllchatsComponent, canActivate: [RouteGuardServiceService]},
    { path: 'chatgroups', component: GroupChatComponent, canActivate: [RouteGuardServiceService]},
    { path: 'repository', component: RepositoryComponent, canActivate: [RouteGuardServiceService]},
    { path: 'help', component: HelpComponent, canActivate: [RouteGuardServiceService]},
    { path: 'settings', component: SettingsComponent, canActivate: [RouteGuardServiceService]},
    { path: 'profile', component: ProfileComponent, canActivate: [RouteGuardServiceService]},
    { path: 'manager', component: ManagerComponent, canActivate: [AdminRouteGuardService]},
    { path: 'market', component: MarketPlaceComponent, canActivate: [RouteGuardServiceService]},
    { path: 'repository/folder/:id', component: FolderComponent, canActivate: [RouteGuardServiceService]},
    { path: 'logout', component: LogoutComponent},
    { path: '**', component: ErrorPageComponent},
];
