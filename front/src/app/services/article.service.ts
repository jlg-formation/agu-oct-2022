import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

const ARTICLES_KEY = 'articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = this.getArticles();

  constructor() {}

  async add(a: Article) {
    this.articles.push(a);
    this.save();
  }

  getArticles(): Article[] {
    const str = localStorage.getItem(ARTICLES_KEY);
    if (str === null) {
      return [
        { name: 'Tournevis', price: 2.56, qty: 10 },
        { name: 'Marteau', price: 5, qty: 56 },
        { name: 'Ciseaux', price: 2, qty: 100 },
        { name: 'Pelle', price: 3.4, qty: 50 },
      ];
    }
    return JSON.parse(str);
  }

  refresh() {
    this.articles = this.getArticles();
  }

  save() {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(this.articles));
  }
}
