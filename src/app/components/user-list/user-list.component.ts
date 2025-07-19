import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-list-container">

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
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error: string | null = null;

  private userService = inject(UserService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    console.log('Loading users...');
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('Users received:', users);
        this.users = users;
        this.loading = false;
        this.cdr.detectChanges(); // Manuel change detection
        console.log('Component state:', { users: this.users, loading: this.loading });
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.error = 'Kullanıcılar yüklenirken bir hata oluştu.';
        this.loading = false;
        this.cdr.detectChanges(); // Manuel change detection
      }
    });
  }

  goToUserDetail(userId: number): void {
    this.router.navigate(['/users', userId]);
  }
}
