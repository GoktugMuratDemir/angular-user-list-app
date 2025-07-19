import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteSelectComponent } from '../autocomplete-select/autocomplete-select.component';

export interface FilterOptions {
  searchTerm: string;
  sortBy: 'name' | 'email' | 'city' | 'company';
  sortOrder: 'asc' | 'desc';
  cityFilter: string;
}

@Component({
  selector: 'app-user-filter-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule, AutocompleteSelectComponent],
  template: `
    <div class="filter-toolbar">
      <!-- Ana Filtre Kısmı -->
      <div class="main-filters">
        <!-- Arama Bölümü -->
        <div class="search-container">
          <div class="search-wrapper">
            <div class="search-icon">🔍</div>
            <input
              id="search"
              type="text"
              [(ngModel)]="filters.searchTerm"
              (ngModelChange)="onFilterChange()"
              placeholder="Kullanıcı ara (isim, email, şirket, şehir...)"
              class="search-input"
            />
            <button
              *ngIf="filters.searchTerm"
              class="clear-search-btn"
              (click)="clearSearch()"
              title="Aramayı temizle"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Filtre ve Sıralama Bölümü -->
        <div class="controls-container">
          <div class="filter-group">
            <label class="control-label">
              <span class="label-icon">🏙️</span>
              <span class="label-text">Şehir Filtresi</span>
            </label>
            <app-autocomplete-select
              [items]="availableCities"
              [(ngModel)]="filters.cityFilter"
              (ngModelChange)="onFilterChange()"
              placeholder="Şehir seçiniz..."
              allItemsText="Tüm şehirler"
            ></app-autocomplete-select>
          </div>

          <div class="sort-group">
            <label class="control-label">
              <span class="label-icon">📊</span>
              <span class="label-text">Sıralama</span>
            </label>
            <div class="sort-controls">
              <div class="sort-by">
                <app-autocomplete-select
                  [items]="sortOptionLabels"
                  [ngModel]="getCurrentSortLabel()"
                  (selectionChange)="onSortByChange($event)"
                  placeholder="Sıralama seçiniz..."
                  allItemsText="Varsayılan"
                ></app-autocomplete-select>
              </div>
              <button
                class="sort-order-btn"
                [class.desc]="filters.sortOrder === 'desc'"
                (click)="toggleSortOrder()"
                [title]="filters.sortOrder === 'asc' ? 'A-Z sıralama' : 'Z-A sıralama'"
              >
                <span class="sort-icon">{{ filters.sortOrder === 'asc' ? '↑' : '↓' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Alt Bilgi ve Aksiyon Kısmı -->
      <div class="bottom-section">
        <div class="results-info">
          <div class="results-badge">
            <span class="results-count">{{ totalResults }}</span>
            <span class="results-text">sonuç bulundu</span>
          </div>
        </div>

        <div class="actions">
          <button
            class="action-btn reset-btn"
            (click)="clearFilters()"
            [disabled]="!hasActiveFilters()"
            title="Tüm filtreleri temizle"
          >
            <span class="btn-icon">🔄</span>
            <span class="btn-text">Sıfırla</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filter-toolbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      padding: 25px;
      margin-bottom: 25px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      color: white;
    }

    .main-filters {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 20px;
    }

    /* Arama Bölümü */
    .search-container {
      width: 100%;
    }

    .search-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 15px;
      padding: 4px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .search-wrapper:focus-within {
      background: white;
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    .search-icon {
      padding: 12px 15px;
      color: #666;
      font-size: 18px;
    }

    .search-input {
      flex: 1;
      border: none;
      outline: none;
      padding: 12px 15px;
      font-size: 16px;
      background: transparent;
      color: #333;
      border-radius: 12px;
    }

    .search-input::placeholder {
      color: #999;
      font-style: italic;
    }

    .clear-search-btn {
      background: #e74c3c;
      color: white;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .clear-search-btn:hover {
      background: #c0392b;
      transform: scale(1.1);
    }

    /* Kontroller */
    .controls-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .filter-group,
    .sort-group {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 20px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .control-label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      font-weight: 600;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .label-icon {
      font-size: 16px;
    }

    .label-text {
      color: rgba(255, 255, 255, 0.9);
    }

    /* Sıralama Kontrolleri */
    .sort-controls {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .sort-by {
      flex: 1;
    }

    .sort-order-btn {
      background: white;
      border: none;
      width: 45px;
      height: 45px;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .sort-order-btn:hover {
      background: #f8f9fa;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }

    .sort-order-btn.desc {
      background: #3498db;
      color: white;
    }

    .sort-order-btn.desc:hover {
      background: #2980b9;
    }

    .sort-icon {
      font-size: 18px;
      font-weight: bold;
    }

    /* Alt Bölüm */
    .bottom-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    .results-info {
      display: flex;
      align-items: center;
    }

    .results-badge {
      background: rgba(255, 255, 255, 0.2);
      padding: 8px 16px;
      border-radius: 25px;
      display: flex;
      align-items: center;
      gap: 6px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .results-count {
      font-weight: bold;
      font-size: 16px;
      color: #fff;
    }

    .results-text {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
    }

    .actions {
      display: flex;
      gap: 10px;
    }

    .action-btn {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 10px 20px;
      border-radius: 25px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .action-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .action-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .reset-btn:hover:not(:disabled) {
      background: #e74c3c;
      border-color: #e74c3c;
    }

    .btn-icon {
      font-size: 16px;
    }

    .btn-text {
      font-weight: 600;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .filter-toolbar {
        padding: 20px;
        border-radius: 15px;
      }

      .controls-container {
        grid-template-columns: 1fr;
        gap: 15px;
      }

      .bottom-section {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
      }

      .results-info,
      .actions {
        justify-content: center;
      }

      .sort-controls {
        flex-direction: column;
        gap: 15px;
      }

      .sort-order-btn {
        width: 100%;
        height: 45px;
      }
    }

    @media (max-width: 480px) {
      .search-input {
        font-size: 14px;
      }

      .filter-group,
      .sort-group {
        padding: 15px;
      }

      .action-btn {
        width: 100%;
        justify-content: center;
      }
    }

    /* Animasyonlar */
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .filter-toolbar {
      animation: slideIn 0.3s ease-out;
    }

    /* Hover Efektleri */
  `]
})
export class UserFilterToolbarComponent {
  @Output() filtersChanged = new EventEmitter<FilterOptions>();

  filters: FilterOptions = {
    searchTerm: '',
    sortBy: 'name',
    sortOrder: 'asc',
    cityFilter: ''
  };

  availableCities: string[] = [];
  sortOptions: { value: string, label: string }[] = [
    { value: 'name', label: 'İsim' },
    { value: 'email', label: 'E-posta' },
    { value: 'city', label: 'Şehir' },
    { value: 'company', label: 'Şirket' }
  ];
  sortOptionLabels: string[] = [];
  totalResults = 0;

  constructor() {
    this.sortOptionLabels = this.sortOptions.map(option => option.label);
  }

  onFilterChange(): void {
    this.filtersChanged.emit({ ...this.filters });
  }

  clearSearch(): void {
    this.filters.searchTerm = '';
    this.onFilterChange();
  }

  toggleSortOrder(): void {
    this.filters.sortOrder = this.filters.sortOrder === 'asc' ? 'desc' : 'asc';
    this.onFilterChange();
  }

  onSortByChange(selectedLabel: string): void {
    const selectedOption = this.sortOptions.find(option => option.label === selectedLabel);
    if (selectedOption) {
      this.filters.sortBy = selectedOption.value as 'name' | 'email' | 'city' | 'company';
      this.onFilterChange();
    }
  }

  getCurrentSortLabel(): string {
    const currentOption = this.sortOptions.find(option => option.value === this.filters.sortBy);
    return currentOption ? currentOption.label : 'İsim';
  }

  hasActiveFilters(): boolean {
    return this.filters.searchTerm !== '' ||
           this.filters.cityFilter !== '' ||
           this.filters.sortBy !== 'name' ||
           this.filters.sortOrder !== 'asc';
  }

  clearFilters(): void {
    this.filters = {
      searchTerm: '',
      sortBy: 'name',
      sortOrder: 'asc',
      cityFilter: ''
    };
    this.onFilterChange();
  }

  updateAvailableCities(cities: string[]): void {
    this.availableCities = [...new Set(cities)].sort();
  }

  updateTotalResults(count: number): void {
    this.totalResults = count;
  }
}
