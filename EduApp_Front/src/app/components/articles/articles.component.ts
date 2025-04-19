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
  reply:boolean = false;
  articleId:string = "";

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

  replyFun(article_id:string) { 
    this.reply && this.articleId !== article_id ? this.reply = true : this.reply ? this.reply = false : this.reply = true;
    
    this.articleId = article_id;
    
  }

  delete(id:string) {

  }

  update(id:string, article: Article) {

  }

  create() {
    
  }
}
