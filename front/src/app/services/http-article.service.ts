import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { ArticleService } from './article.service';

const url = '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private http: HttpClient) {
    super();
    console.log('http service');
    this.refresh();
  }

  override async refresh(): Promise<void> {
    await super.refresh();
    this.http.get<Article[]>(url).subscribe({
      error: (err) => {
        console.log('err: ', err);
      },
      next: (articles) => {
        console.log('articles: ', articles);
        this.articles = articles;
        this.save();
      },
    });
  }
}
