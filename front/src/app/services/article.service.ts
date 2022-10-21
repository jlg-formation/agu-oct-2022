import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../interfaces/article';

const ARTICLES_KEY = 'articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject(this.getArticles());

  constructor() {
    this.articles$.subscribe((articles) => {
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
    });
  }

  async add(a: Article) {
    this.articles$.value.push(a);
    this.articles$.next(this.articles$.value);
  }

  getArticles(): Article[] {
    const str = localStorage.getItem(ARTICLES_KEY);
    if (str === null) {
      return [];
    }
    return JSON.parse(str);
  }

  async refresh() {
    this.articles$.next(this.getArticles());
  }

  async remove(selectedArticles: Set<Article>) {
    this.articles$.next(
      this.articles$.value.filter((a) => !selectedArticles.has(a))
    );
  }
}
