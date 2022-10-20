import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
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
    const articles = await lastValueFrom(this.http.get<Article[]>(url));
    console.log('articles: ', articles);
    this.articles = articles;
    this.save();
  }

  override async add(a: Article): Promise<void> {
    await super.add(a);
    await lastValueFrom(this.http.post<void>(url, a));
  }
}
