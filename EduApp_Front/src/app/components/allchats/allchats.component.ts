import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatsViewComponent } from '../chats-view/chats-view.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-allchats',
  standalone: true,
  imports: [RouterLink,ChatsViewComponent, FormsModule],
  templateUrl: './allchats.component.html',
  styleUrl: './allchats.component.css'
})
export class AllchatsComponent {

}
