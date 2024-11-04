import { Routes } from '@angular/router';
import { AllchatsComponent } from './components/allchats/allchats.component';
import { HomecontentComponent } from './components/homecontent/homecontent.component';
import { GroupChatComponent } from './components/group-chat/group-chat.component';

export const routes: Routes = [
    { path: '', component: HomecontentComponent},
    { path: 'allchats', component: AllchatsComponent},
    { path: 'chatgroups', component: GroupChatComponent},
];
