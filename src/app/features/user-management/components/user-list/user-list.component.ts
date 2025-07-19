import { Component, OnInit, inject, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../../services';
import { User } from '../../../../models';
import { UserFilterToolbarComponent, FilterOptions } from '../../../../shared';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFilterToolbarComponent],
  template: `
    <div class="user-list-container">
      <h1>Kullanıcı Listesi</h1>

      <!-- Filter Toolbar -->
      <app-user-filter-toolbar
        (filtersChanged)="onFiltersChanged($event)"
        #filterToolbar>
      </app-user-filter-toolbar>

      <div class="loading" *ngIf="loading">
        Yükleniyor...
      </div>

      <div class="error" *ngIf="error">
        {{ error }}
      </div>

      <div class="users-grid" *ngIf="!loading && !error">
        <div
          class="user-card"
          *ngFor="let user of users"
          (click)="goToUserDetail(user.id)"
        >
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p class="email">📧 {{ user.email }}</p>
            <p class="city">🏙️ {{ user.address.city }}</p>
            <p class="company">🏢 {{ user.company.name }}</p>
          </div>
          <div class="card-arrow">→</div>
        </div>
      </div>

      <!-- No Results Message -->
      <div class="no-results" *ngIf="!loading && !error && users.length === 0 && filteredUsers.length === 0">
        <p>🔍 Arama kriterlerinize uygun kullanıcı bulunamadı.</p>
        <p>Lütfen filtreleri değiştirip tekrar deneyin.</p>
      </div>

      <!-- Pagination -->
      <div class="pagination-container" *ngIf="!loading && !error && totalPages > 1">
        <div class="pagination">
          <button
            class="pagination-btn"
            [disabled]="currentPage === 1"
            (click)="goToPage(currentPage - 1)"
          >
            ‹ Önceki
          </button>

          <div class="page-numbers">
            <button
              *ngFor="let page of getVisiblePages()"
              class="page-btn"
              [class.active]="page === currentPage"
              [disabled]="page === '...'"
              (click)="page !== '...' && goToPage(+page)"
            >
              {{ page }}
            </button>
          </div>

          <button
            class="pagination-btn"
            [disabled]="currentPage === totalPages"
            (click)="goToPage(currentPage + 1)"
          >
            Sonraki ›
          </button>
        </div>

        <div class="pagination-info">
          Sayfa {{ currentPage }} / {{ totalPages }} (Toplam {{ totalFilteredUsers }} kullanıcı)
        </div>
      </div>

      <!-- Debug bilgisi -->
      <div class="debug-info" style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 5px; font-size: 12px;">
        <strong>Debug:</strong>
        Loading: {{ loading }} |
        Error: {{ error }} |
        Total Pages: {{ totalPages }} |
        Current Page: {{ currentPage }} |
        Total Users: {{ totalUsers }} |
        Filtered Users: {{ totalFilteredUsers }} |
        Users Length: {{ users.length }} |
        All Users Length: {{ allUsers.length }}
      </div>
    </div>
  `,
  styles: [`
    .user-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    .loading, .error {
      text-align: center;
      padding: 20px;
      font-size: 18px;
    }

    .error {
      color: #e74c3c;
      background-color: #fdf2f2;
      border: 1px solid #e74c3c;
      border-radius: 8px;
    }

    .loading {
      color: #3498db;
    }

    .no-results {
      text-align: center;
      padding: 40px 20px;
      color: #666;
      background: #f8f9fa;
      border-radius: 12px;
      border: 2px dashed #ddd;
    }

    .no-results p {
      margin: 10px 0;
      font-size: 16px;
    }

    .no-results p:first-child {
      font-size: 18px;
      font-weight: 600;
      color: #555;
    }

    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    }

    .user-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid #e1e8ed;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .user-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
      border-color: #3498db;
    }

    .user-info {
      flex: 1;
    }

    .user-info h3 {
      margin: 0 0 10px 0;
      color: #2c3e50;
      font-size: 20px;
    }

    .user-info p {
      margin: 5px 0;
      color: #666;
      font-size: 14px;
    }

    .email {
      color: #3498db !important;
    }

    .city {
      color: #27ae60 !important;
    }

    .company {
      color: #8e44ad !important;
    }

    .card-arrow {
      font-size: 24px;
      color: #3498db;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .users-grid {
        grid-template-columns: 1fr;
      }

      .user-list-container {
        padding: 15px;
      }
    }

    /* Pagination Styles */
    .pagination-container {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    .pagination {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .pagination-btn {
      background: white;
      border: 1px solid #ddd;
      color: #333;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
    }

    .pagination-btn:hover:not(:disabled) {
      background: #f8f9fa;
      border-color: #3498db;
    }

    .pagination-btn:disabled {
      background: #f8f9fa;
      color: #999;
      cursor: not-allowed;
    }

    .page-numbers {
      display: flex;
      gap: 5px;
    }

    .page-btn {
      background: white;
      border: 1px solid #ddd;
      color: #333;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
      min-width: 40px;
    }

    .page-btn:hover:not(:disabled):not(.active) {
      background: #f8f9fa;
      border-color: #3498db;
    }

    .page-btn.active {
      background: #3498db;
      color: white;
      border-color: #3498db;
    }

    .page-btn:disabled {
      background: transparent;
      border: none;
      color: #999;
      cursor: default;
    }

    .pagination-info {
      color: #666;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .pagination {
        flex-wrap: wrap;
        justify-content: center;
      }

      .page-numbers {
        order: -1;
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild('filterToolbar') filterToolbar!: UserFilterToolbarComponent;

  users: User[] = [];
  allUsers: User[] = []; // Tüm kullanıcıları cache'leyeceğiz
  filteredUsers: User[] = []; // Filtrelenmiş kullanıcılar
  loading = true;
  error: string | null = null;

  // Pagination properties
  currentPage = 1;
  pageSize = 4; // Her sayfada 4 kullanıcı göster
  totalPages = 0;
  totalUsers = 0;
  totalFilteredUsers = 0;

  // Filter properties
  currentFilters: FilterOptions = {
    searchTerm: '',
    sortBy: 'name',
    sortOrder: 'asc',
    cityFilter: ''
  };

  private userService = inject(UserService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadAllUsers();
  }

  ngAfterViewInit(): void {
    // ViewChild init edildiğinde çağrılır
  }

  loadAllUsers(): void {
    console.log('Loading all users...');
    this.loading = true;
    this.error = null;

    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('All users received:', users);
        this.allUsers = users;
        this.totalUsers = users.length;

        // Şehir listesini toolbar'a gönder
        const cities = users.map(user => user.address.city);
        if (this.filterToolbar) {
          this.filterToolbar.updateAvailableCities(cities);
        }

        this.applyFilters();
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Component state:', {
          allUsers: this.allUsers.length,
          filteredUsers: this.filteredUsers.length,
          currentPageUsers: this.users.length,
          loading: this.loading,
          currentPage: this.currentPage,
          totalPages: this.totalPages
        });
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.error = 'Kullanıcılar yüklenirken bir hata oluştu.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onFiltersChanged(filters: FilterOptions): void {
    this.currentFilters = filters;
    this.currentPage = 1; // Filtreleme yapıldığında ilk sayfaya git
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.allUsers];

    // Arama terimi filtresi
    if (this.currentFilters.searchTerm) {
      const searchTerm = this.currentFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.company.name.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm) ||
        user.address.city.toLowerCase().includes(searchTerm)
      );
    }

    // Şehir filtresi
    if (this.currentFilters.cityFilter) {
      filtered = filtered.filter(user =>
        user.address.city === this.currentFilters.cityFilter
      );
    }

    // Sıralama
    filtered.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      switch (this.currentFilters.sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'email':
          aValue = a.email;
          bValue = b.email;
          break;
        case 'city':
          aValue = a.address.city;
          bValue = b.address.city;
          break;
        case 'company':
          aValue = a.company.name;
          bValue = b.company.name;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      const result = aValue.localeCompare(bValue);
      return this.currentFilters.sortOrder === 'asc' ? result : -result;
    });

    this.filteredUsers = filtered;
    this.totalFilteredUsers = filtered.length;
    this.totalPages = Math.ceil(this.totalFilteredUsers / this.pageSize);

    // Eğer mevcut sayfa total pages'den büyükse, son sayfaya git
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }

    this.updateCurrentPageUsers();

    // Toolbar'ı güncelle
    if (this.filterToolbar) {
      this.filterToolbar.updateTotalResults(this.totalFilteredUsers);
    }
  }

  updateCurrentPageUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.users = this.filteredUsers.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.updateCurrentPageUsers();
      this.cdr.detectChanges();
      console.log(`Switched to page ${page}, showing users:`, this.users.map(u => u.name));
    }
  }

  getVisiblePages(): (number | string)[] {
    const visible: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 7) {
      // Tüm sayfaları göster
      for (let i = 1; i <= total; i++) {
        visible.push(i);
      }
    } else {
      // İlk sayfa
      visible.push(1);

      if (current > 4) {
        visible.push('...');
      }

      // Mevcut sayfa etrafındaki sayfalar
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== total) {
          visible.push(i);
        }
      }

      if (current < total - 3) {
        visible.push('...');
      }

      // Son sayfa
      if (total > 1) {
        visible.push(total);
      }
    }

    return visible;
  }

  goToUserDetail(userId: number): void {
    this.router.navigate(['/users', userId]);
  }
}
