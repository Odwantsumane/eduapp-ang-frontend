import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {

  like(): void { //arg = article-id
    console.log("liked");
  }

  dislike(): void { //arg = article-id
    console.log("disliked");
  }
}
