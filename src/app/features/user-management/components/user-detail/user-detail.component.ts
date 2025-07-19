import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services';
import { User } from '../../../../models';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-detail-container">
      <button class="back-button" (click)="goBack()">
        ← Geri Dön
      </button>

      <div class="loading" *ngIf="loading">
        Yükleniyor...
      </div>

      <div class="error" *ngIf="error">
        {{ error }}
      </div>

      <div class="user-detail" *ngIf="user && !loading && !error">
        <div class="user-header">
          <h1>{{ user.name }}</h1>
          <p class="username">{{ '@' + user.username }}</p>
        </div>

        <div class="user-info-grid">
          <div class="info-card">
            <h3>📧 İletişim Bilgileri</h3>
            <div class="info-item">
              <strong>E-posta:</strong>
              <span>{{ user.email }}</span>
            </div>
            <div class="info-item">
              <strong>Telefon:</strong>
              <span>{{ user.phone }}</span>
            </div>
            <div class="info-item">
              <strong>Website:</strong>
              <a [href]="'http://' + user.website" target="_blank">{{ user.website }}</a>
            </div>
          </div>

          <div class="info-card">
            <h3>📍 Adres Bilgileri</h3>
            <div class="info-item">
              <strong>Adres:</strong>
              <span>{{ user.address.street }}, {{ user.address.suite }}</span>
            </div>
            <div class="info-item">
              <strong>Şehir:</strong>
              <span>{{ user.address.city }}</span>
            </div>
            <div class="info-item">
              <strong>Posta Kodu:</strong>
              <span>{{ user.address.zipcode }}</span>
            </div>
            <div class="info-item">
              <strong>Koordinatlar:</strong>
              <span>{{ user.address.geo.lat }}, {{ user.address.geo.lng }}</span>
            </div>
          </div>

          <div class="info-card">
            <h3>🏢 Şirket Bilgileri</h3>
            <div class="info-item">
              <strong>Şirket Adı:</strong>
              <span>{{ user.company.name }}</span>
            </div>
            <div class="info-item">
              <strong>Slogan:</strong>
              <span class="catchphrase">{{ user.company.catchPhrase }}</span>
            </div>
            <div class="info-item">
              <strong>İş Alanı:</strong>
              <span>{{ user.company.bs }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-detail-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }

    .back-button {
      background: #3498db;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin-bottom: 20px;
      transition: background-color 0.3s ease;
    }

    .back-button:hover {
      background: #2980b9;
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

    .user-header {
      text-align: center;
      margin-bottom: 30px;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
    }

    .user-header h1 {
      margin: 0;
      font-size: 32px;
    }

    .username {
      margin: 10px 0 0 0;
      font-size: 18px;
      opacity: 0.9;
    }

    .user-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .info-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: 1px solid #e1e8ed;
    }

    .info-card h3 {
      margin: 0 0 20px 0;
      color: #2c3e50;
      font-size: 20px;
      border-bottom: 2px solid #ecf0f1;
      padding-bottom: 10px;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15px;
      padding: 8px 0;
    }

    .info-item:last-child {
      margin-bottom: 0;
    }

    .info-item strong {
      color: #34495e;
      margin-right: 15px;
      min-width: 120px;
      flex-shrink: 0;
    }

    .info-item span, .info-item a {
      color: #666;
      text-align: right;
      flex: 1;
      word-break: break-word;
    }

    .info-item a {
      color: #3498db;
      text-decoration: none;
    }

    .info-item a:hover {
      text-decoration: underline;
    }

    .catchphrase {
      font-style: italic;
      color: #8e44ad !important;
    }

    @media (max-width: 768px) {
      .user-detail-container {
        padding: 15px;
      }

      .user-info-grid {
        grid-template-columns: 1fr;
      }

      .user-header h1 {
        font-size: 24px;
      }

      .info-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .info-item strong {
        margin-bottom: 5px;
        min-width: auto;
      }

      .info-item span, .info-item a {
        text-align: left;
      }
    }
  `]
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading = true;
  error: string | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUser(Number(userId));
    } else {
      this.error = 'Geçersiz kullanıcı ID\'si';
      this.loading = false;
    }
  }

  loadUser(userId: number): void {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
        this.cdr.detectChanges(); // Manuel change detection
      },
      error: (err) => {
        this.error = 'Kullanıcı bilgileri yüklenirken bir hata oluştu.';
        this.loading = false;
        this.cdr.detectChanges(); // Manuel change detection
        console.error('Error loading user:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
