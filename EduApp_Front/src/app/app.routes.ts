import { Routes } from '@angular/router';
import { AllchatsComponent } from './components/allchats/allchats.component';
import { HomecontentComponent } from './components/homecontent/homecontent.component';
import { GroupChatComponent } from './components/group-chat/group-chat.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [
    { path: '', component: HomecontentComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'allchats', component: AllchatsComponent},
    { path: 'chatgroups', component: GroupChatComponent},
    { path: 'logout', component: LogoutComponent},
    { path: '**', component: ErrorPageComponent},
];
