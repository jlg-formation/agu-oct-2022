import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';
import {
  faPlus,
  faRotateRight,
  faTrashCan,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  isRemoving = false;
  isRefreshing = false;
  faRotateRight = faRotateRight;
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faTrashCan = faTrashCan;
  selectedArticles = new Set<Article>();

  constructor(public articleService: ArticleService) {
    console.log('articleService: ', articleService);
    this.articleService.refresh();
  }

  ngOnInit(): void {}

  async refresh() {
    console.log('refresh');
    try {
      this.isRefreshing = true;
      await this.articleService.refresh();
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isRefreshing = false;
    }
  }

  async remove() {
    console.log('remove');
    try {
      this.isRemoving = true;
      await this.articleService.remove(this.selectedArticles);
      this.selectedArticles.clear();
      await this.articleService.refresh();
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isRemoving = false;
    }
  }

  toggle(a: Article) {
    console.log('toggle');
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
