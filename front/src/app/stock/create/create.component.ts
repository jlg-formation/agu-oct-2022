import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  isAdding = false;
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  f = new FormGroup({
    name: new FormControl('Truc', [
      Validators.required,
      Validators.minLength(3),
    ]),
    price: new FormControl(1, [Validators.required]),
    qty: new FormControl(1, [Validators.required]),
  });

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  async submit() {
    try {
      console.log('submit');
      this.isAdding = true;
      await this.articleService.add(this.f.value as Article);
      await this.articleService.refresh();
      this.router.navigate(['..'], { relativeTo: this.route });
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isAdding = false;
    }
  }

  complain() {
    alert('oh it must not be empty...');
  }
}
