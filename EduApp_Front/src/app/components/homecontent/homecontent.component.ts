import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticlesComponent } from '../articles/articles.component';
import { ChatsViewComponent } from '../chats-view/chats-view.component';
import { HorizontalNavBarComponent } from '../horizontal-nav-bar/horizontal-nav-bar.component';
import { VerticalNavBarComponent } from '../vertical-nav-bar/vertical-nav-bar.component';

@Component({
  selector: 'app-homecontent',
  standalone: true,
  imports: [ChatsViewComponent,ArticlesComponent, FormsModule, CommonModule],
  templateUrl: './homecontent.component.html',
  styleUrl: './homecontent.component.css'
})
export class HomecontentComponent {
  hide_chats : boolean = window.sessionStorage.getItem("show_charts_studyo") === "true" ? true : false;

  hideChats(): void {
    this.hide_chats ? window.sessionStorage.setItem("show_charts_studyo", "false") : window.sessionStorage.setItem("show_charts_studyo", "true")
    this.hide_chats ? this.hide_chats = false : this.hide_chats = true; 
  }
}
