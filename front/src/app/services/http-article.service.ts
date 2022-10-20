import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleService } from './article.service';

const url = 'http://localhost:3000/api/articles';

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
    this.http.get(url).subscribe({
      error: (err) => {
        console.log('err: ', err);
      },
    });
  }
}
