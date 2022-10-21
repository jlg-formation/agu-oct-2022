import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, lastValueFrom } from 'rxjs';
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
  }

  override async refresh(): Promise<void> {
    await super.refresh();
    const articles = await lastValueFrom(
      this.http.get<Article[]>(url).pipe(delay(1000))
    );
    console.log('articles: ', articles);
    this.articles$.next(articles);
  }

  override async add(a: Article): Promise<void> {
    await super.add(a);
    await lastValueFrom(this.http.post<void>(url, a).pipe(delay(1000)));
  }

  override async remove(selectedArticles: Set<Article>): Promise<void> {
    const ids = [...selectedArticles].map((a) => a.id);
    await lastValueFrom(
      this.http
        .delete<void>(url, {
          body: ids,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .pipe(delay(1000))
    );
    await super.remove(selectedArticles);
  }
}
