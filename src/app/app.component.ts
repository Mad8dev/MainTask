import { Component, Pipe } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgForOf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  data: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    const url = 'https://kep.uz/api/problems';

    const params = {
      page: this.currentPage.toString(),
      limit: this.itemsPerPage.toString(),
    };
    this.http.get(url, { params }).subscribe((response: any) => {
      this.data = response;
    });
    console.log(this.data);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllProduct();
    console.log(this.currentPage);
  }

  public sortProductsDesc() {
    this.data.data = this.data.data.sort((a: any, b: any) => a.id - b.id);
  }

  public sortProductsAsc() {
    this.data.data = this.data.data.sort((a: any, b: any) => b.id - a.id);
  }
}
