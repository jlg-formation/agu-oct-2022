import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [
    { name: 'Tournevis', price: 2.56, qty: 10 },
    { name: 'Marteau', price: 5, qty: 56 },
    { name: 'Ciseaux', price: 2, qty: 100 },
    { name: 'Pelle', price: 3.4, qty: 50 },
  ];

  constructor() {}
}
