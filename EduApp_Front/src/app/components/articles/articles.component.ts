import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article, ArticlesService } from '../../services/articles.service';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit{

  Articles: Array<Article> = [];

  constructor(private articlesserviceauth: AuthenticateService) {}

  ngOnInit(): void { 

    this.getArticles();
  }

  async getArticles() {
    this.Articles = await this.articlesserviceauth.GetArticles();

    // console.log(this.Articles);

  }

  like(): void { //arg = article-id
    console.log("liked");
  }

  dislike(): void { //arg = article-id
    console.log("disliked");
  }
}
