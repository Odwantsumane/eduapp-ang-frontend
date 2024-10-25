import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HorizontalNavBarComponent } from './components/horizontal-nav-bar/horizontal-nav-bar.component';
import { VerticalNavBarComponent } from './components/vertical-nav-bar/vertical-nav-bar.component';
import { ChatsViewComponent } from './components/chats-view/chats-view.component';
import { ArticlesComponent } from './components/articles/articles.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HorizontalNavBarComponent, VerticalNavBarComponent, ChatsViewComponent,ArticlesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EduApp_Front';
}
