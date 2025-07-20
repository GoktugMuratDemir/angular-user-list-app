/**
 * KULLANICI LİSTESİ KOMPONENTİ (USER LIST COMPONENT)
 *
 * Bu component kullanıcıların listelendiği ana sayfa komponentidir.
 * Aşağıdaki özellikleri içerir:
 *
 * Temel Özellikler:
 * - Kullanıcı listesini API'den çeker ve gösterir
 * - Filtreleme ve arama işlevselliği
 * - Sıralama (isim, email, şehir, şirket)
 * - Sayfalama (pagination)
 * - Responsive grid layout
 * - Loading ve error state yönetimi
 *
 * Component İlişkileri:
 * - UserService: API'den veri çekme
 * - UserFilterToolbarComponent: Filtreleme UI'ı
 * - Router: Kullanıcı detay sayfasına yönlendirme
 *
 * Modern Angular Özellikleri:
 * - Standalone component
 * - Dependency injection with inject()
 * - ViewChild ile child component referansı
 * - OnInit ve AfterViewInit lifecycle hooks
 * - ChangeDetectorRef ile manuel change detection
 */

// Angular core modülleri
import { Component, OnInit, inject, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // *ngIf, *ngFor için
import { Router } from '@angular/router';        // Sayfa navigasyonu için

// Servis ve modeller
import { UserService } from '../../../../services';
import { User } from '../../../../models';

// Child component ve veri tipleri
import { UserFilterToolbarComponent, FilterOptions } from '../../../../shared';

/**
 * Component Decorator
 *
 * selector: HTML'de kullanım şekli
 * standalone: true = Modül gerektirmez (modern Angular)
 * imports: Bu component'te kullanılan dependency'ler
 * template: HTML template (inline)
 * styles: CSS stilleri (inline)
 */

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFilterToolbarComponent],
  template: `
    <div class="user-list-container">

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
  /**
   * ViewChild - Child Component Referansı
   *
   * filterToolbar: UserFilterToolbarComponent'e direkt erişim sağlar
   * Bu sayede parent component'ten child component'in metodlarını çağırabiliriz
   * ! operatörü: TypeScript'e bu değerin undefined olmayacağını garanti eder
   */
  @ViewChild('filterToolbar') filterToolbar!: UserFilterToolbarComponent;

  /**
   * Component State (Durum) Özellikleri
   *
   * Bu özellikler component'in mevcut durumunu temsil eder
   */

  /** users: Mevcut sayfada gösterilen kullanıcılar (pagination sonrası) */
  users: User[] = [];

  /** allUsers: API'den çekilen tüm kullanıcılar (cache) */
  allUsers: User[] = [];

  /** filteredUsers: Filtreleme uygulandıktan sonraki kullanıcılar */
  filteredUsers: User[] = [];

  /** loading: Veri yüklenme durumu (spinner göstermek için) */
  loading = true;

  /** error: Hata mesajı (null ise hata yok) */
  error: string | null = null;

  /**
   * Pagination (Sayfalama) Özellikleri
   *
   * Bu özellikler sayfalama sistemini yönetir
   */

  /** currentPage: Mevcut sayfa numarası (1'den başlar) */
  currentPage = 1;

  /** pageSize: Her sayfada gösterilecek kullanıcı sayısı */
  pageSize = 4;

  /** totalPages: Toplam sayfa sayısı (hesaplanır) */
  totalPages = 0;

  /** totalUsers: Toplam kullanıcı sayısı (allUsers.length) */
  totalUsers = 0;

  /** totalFilteredUsers: Filtreleme sonrası kullanıcı sayısı */
  totalFilteredUsers = 0;

  /**
   * Filter (Filtre) Özellikleri
   *
   * currentFilters: Mevcut aktif filtreler
   * FilterOptions interface'ini kullanır
   */
  currentFilters: FilterOptions = {
    searchTerm: '',    // Arama terimi
    sortBy: 'name',    // Sıralama kriteri
    sortOrder: 'asc',  // Sıralama yönü
    cityFilter: ''     // Şehir filtresi
  };

  /**
   * Dependency Injection - Modern Angular Yaklaşımı
   *
   * inject() fonksiyonu ile servisleri enjekte ediyoruz.
   * Bu yaklaşım constructor injection'a alternatiftir (Angular 14+)
   *
   * private: Bu özellikler sadece bu class içinde kullanılabilir
   */

  /** userService: API işlemleri için */
  private userService = inject(UserService);

  /** router: Sayfa navigasyonu için */
  private router = inject(Router);

  /** cdr: Manuel change detection için */
  private cdr = inject(ChangeDetectorRef);

  /**
   * Angular Lifecycle Hooks
   *
   * Bu metodlar Angular'ın component yaşam döngüsü (lifecycle) aşamalarında çalışır
   */

  /**
   * ngOnInit: Component initialize edildiğinde çalışır
   *
   * OnInit interface'ini implement eder.
   * Constructor'dan sonra, ViewChild'lar initialize edilmeden önce çalışır.
   * Genellikle veri yükleme işlemleri burada yapılır.
   */
  ngOnInit(): void {
    this.loadAllUsers(); // Kullanıcı verilerini yükle
  }

  /**
   * ngAfterViewInit: View ve ViewChild'lar initialize edildikten sonra çalışır
   *
   * AfterViewInit interface'ini implement eder.
   * @ViewChild ile tanımlanan elementler burada hazır olur.
   * DOM manipülasyonları burada yapılabilir.
   */
  ngAfterViewInit(): void {
    // ViewChild init edildiğinde çağrılır
    // Şu anda özel bir işlem yapılmıyor, gelecekte gerekirse kullanılabilir
  }

  /**
   * Ana Veri Yükleme Metodu
   *
   * API'den tüm kullanıcıları çeker ve component state'ini initialize eder.
   * Observable pattern ile asenkron veri çekme yapılır.
   */
  loadAllUsers(): void {
    console.log('Loading all users...'); // Debug için log
    this.loading = true;  // Loading spinner'ı göster
    this.error = null;    // Önceki hataları temizle

    /**
     * Observable Subscribe Pattern
     *
     * userService.getUsers() bir Observable döner
     * subscribe() ile bu Observable'ı dinleriz
     *
     * subscribe() parametreleri:
     * - next: Veri başarıyla geldiğinde çalışır
     * - error: Hata oluştuğunda çalışır
     * - complete: İşlem tamamlandığında çalışır (opsiyonel)
     */
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('All users received:', users); // Debug log

        // State güncelleme
        this.allUsers = users;                    // Cache'e kaydet
        this.totalUsers = users.length;          // Toplam sayıyı güncelle

        /**
         * Child Component Güncelleme
         *
         * Şehir listesini filter toolbar'a gönder
         * map() ile her user'dan city'yi çıkar
         */
        const cities = users.map(user => user.address.city);
        if (this.filterToolbar) {
          this.filterToolbar.updateAvailableCities(cities);
        }

        // Filtreleme ve sayfalama uygula
        this.applyFilters();
        this.loading = false; // Loading'i kapat

        /**
         * Manual Change Detection
         *
         * Angular'a view'ı güncellenmesi gerektiğini söyler
         * Zoneless change detection kullandığımız için gerekli
         */
        this.cdr.detectChanges();

        // Debug için component state'ini log'la
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
        console.error('Error loading users:', err); // Error log
        this.error = 'Kullanıcılar yüklenirken bir hata oluştu.'; // Kullanıcı dostu hata mesajı
        this.loading = false;
        this.cdr.detectChanges(); // View'ı güncelle
      }
    });
  }

  /**
   * Filter Değişiklik Event Handler
   *
   * UserFilterToolbarComponent'ten gelen filtre değişikliklerini yakalar.
   * @Output decorator ile child component'ten gelen event'i dinler.
   *
   * @param filters - Yeni filtre ayarları
   */
  onFiltersChanged(filters: FilterOptions): void {
    this.currentFilters = filters;        // Yeni filtreleri kaydet
    this.currentPage = 1;                 // Filtreleme yapıldığında ilk sayfaya git
    this.applyFilters();                  // Filtreleri uygula
  }

  /**
   * Ana Filtreleme Metodu
   *
   * Bu metod tüm filtreleme mantığını içerir:
   * 1. Arama terimi filtresi
   * 2. Şehir filtresi
   * 3. Sıralama
   * 4. Sayfalama hesaplaması
   * 5. UI güncellemesi
   */
  applyFilters(): void {
    // allUsers'tan başlayarak filtreleme yap
    let filtered = [...this.allUsers]; // Spread operator ile kopyala

    /**
     * Arama Terimi Filtresi
     *
     * Kullanıcının yazdığı terimi şu alanlarda arar:
     * - İsim (name)
     * - Email
     * - Şirket adı (company.name)
     * - Kullanıcı adı (username)
     * - Şehir (address.city)
     */
    if (this.currentFilters.searchTerm) {
      const searchTerm = this.currentFilters.searchTerm.toLowerCase(); // Büyük/küçük harf duyarsız

      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.company.name.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm) ||
        user.address.city.toLowerCase().includes(searchTerm)
      );
    }

    /**
     * Şehir Filtresi
     *
     * Belirli bir şehir seçildiyse sadece o şehirdeki kullanıcıları göster
     */
    if (this.currentFilters.cityFilter) {
      filtered = filtered.filter(user =>
        user.address.city === this.currentFilters.cityFilter
      );
    }

    /**
     * Sıralama (Sorting)
     *
     * sort() metodu ile array'i sırala
     * localeCompare() ile string'leri karşılaştır (Türkçe karakterler için uygun)
     */
    filtered.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      // Sıralama kriterine göre değerleri al
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

      // Karşılaştırma yap
      const result = aValue.localeCompare(bValue);

      // Sıralama yönüne göre sonucu döndür
      return this.currentFilters.sortOrder === 'asc' ? result : -result;
    });

    /**
     * Filtreleme Sonuçlarını Kaydet ve Sayfalama Hesapla
     */
    this.filteredUsers = filtered;
    this.totalFilteredUsers = filtered.length;

    // Math.ceil ile yukarıya yuvarlama yap (örn: 4.2 -> 5)
    this.totalPages = Math.ceil(this.totalFilteredUsers / this.pageSize);

    /**
     * Sayfa Kontrolü
     *
     * Eğer mevcut sayfa total pages'den büyükse, son sayfaya git
     * Örn: 10 sayfa varken kullanıcı 15. sayfada ise, 10. sayfaya götür
     */
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }

    // Mevcut sayfa için kullanıcıları güncelle
    this.updateCurrentPageUsers();

    /**
     * Child Component Güncelleme
     *
     * Filter toolbar'da sonuç sayısını güncelle
     */
    if (this.filterToolbar) {
      this.filterToolbar.updateTotalResults(this.totalFilteredUsers);
    }
  }

  /**
   * Sayfalama - Mevcut Sayfa Kullanıcılarını Güncelleme
   *
   * filteredUsers'tan mevcut sayfa için gerekli kullanıcıları slice() ile al
   */
  updateCurrentPageUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize; // Başlangıç indeksi
    const endIndex = startIndex + this.pageSize;               // Bitiş indeksi

    // slice() ile belirli aralıktaki elemanları al
    this.users = this.filteredUsers.slice(startIndex, endIndex);
  }

  /**
   * Sayfa Değiştirme Metodu
   *
   * Kullanıcı farklı bir sayfaya tıkladığında çalışır.
   * Sayfa kontrolü yapar ve geçerli sayfalara geçiş sağlar.
   *
   * @param page - Gidilecek sayfa numarası
   */
  goToPage(page: number): void {
    // Sayfa kontrolü: 1 ile totalPages arasında olmalı ve mevcut sayfadan farklı olmalı
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;                  // Yeni sayfayı set et
      this.updateCurrentPageUsers();           // O sayfa için kullanıcıları getir
      this.cdr.detectChanges();               // View'ı güncelle

      // Debug için log
      console.log(`Switched to page ${page}, showing users:`, this.users.map(u => u.name));
    }
  }

  /**
   * Görünür Sayfa Numaralarını Hesaplama Metodu
   *
   * Pagination UI'ında hangi sayfa numaralarının gösterileceğini hesaplar.
   * Google tarzı pagination: 1 ... 4 5 6 ... 10
   *
   * Returns: (number | string)[] - Sayfa numaraları ve "..." string'leri
   */
  getVisiblePages(): (number | string)[] {
    const visible: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;

    /**
     * Az Sayfa Durumu (≤7 sayfa)
     *
     * Tüm sayfaları göster: 1 2 3 4 5 6 7
     */
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        visible.push(i);
      }
    } else {
      /**
       * Çok Sayfa Durumu (>7 sayfa)
       *
       * Akıllı pagination: 1 ... 4 5 6 ... 10
       */

      // İlk sayfa her zaman göster
      visible.push(1);

      // Mevcut sayfa baştan uzaksa "..." ekle
      if (current > 4) {
        visible.push('...');
      }

      // Mevcut sayfa etrafındaki sayfalar (±1)
      const start = Math.max(2, current - 1);        // En az 2. sayfa
      const end = Math.min(total - 1, current + 1);  // En fazla son-1. sayfa

      for (let i = start; i <= end; i++) {
        // İlk ve son sayfayı tekrarlama
        if (i !== 1 && i !== total) {
          visible.push(i);
        }
      }

      // Mevcut sayfa sondan uzaksa "..." ekle
      if (current < total - 3) {
        visible.push('...');
      }

      // Son sayfa her zaman göster (1'den farklıysa)
      if (total > 1) {
        visible.push(total);
      }
    }

    return visible;
  }

  /**
   * Kullanıcı Detay Sayfasına Yönlendirme
   *
   * Bir kullanıcı kartına tıklandığında detay sayfasına yönlendirir.
   * Angular Router kullanır.
   *
   * @param userId - Detayı görüntülenecek kullanıcının ID'si
   */
  goToUserDetail(userId: number): void {
    // router.navigate ile programmatik navigasyon
    // ['/users', userId] -> /users/123 URL'i oluşturur
    this.router.navigate(['/users', userId]);
  }
}
