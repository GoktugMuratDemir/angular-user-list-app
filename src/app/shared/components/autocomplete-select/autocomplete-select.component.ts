/**
 * AUTOCOMPLETE SELECT KOMPONENTİ (AUTOCOMPLETE SELECT COMPONENT)
 *
 * Bu component özelleştirilebilir bir autocomplete/dropdown select kutusu sağlar.
 * Arama yapabilme, keyboard navigasyonu ve ControlValueAccessor arayüzü içerir.
 *
 * Component özellikleri:
 * - ControlValueAccessor: Angular Forms ile entegrasyon (ngModel desteği)
 * - Keyboard navigation (arrow keys, enter, escape)
 * - Arama/filtreleme özelliği
 * - Customizable placeholder ve seçenekler
 * - Event-driven architecture
 * - Accessible design (ARIA desteği eklenebilir)
 *
 * ControlValueAccessor nedir?
 * - Angular Forms ile custom component'lerin entegrasyonunu sağlayan interface
 * - ngModel, FormControl ile kullanılabilir hale getirir
 * - writeValue, registerOnChange, registerOnTouched metodlarını implement eder
 */

// Angular core modüllerinden gerekli importlar
import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

// Forms modülü ve ControlValueAccessor interface'i
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @Component Decorator
 *
 * Bu component'in Angular metadata'sını tanımlar.
 * NG_VALUE_ACCESSOR provider'ı ile Angular Forms sistemi ile entegrasyon sağlar.
 */

@Component({
  selector: 'app-autocomplete-select',
  standalone: true,
  imports: [CommonModule, FormsModule],

  /**
   * NG_VALUE_ACCESSOR Provider
   *
   * Bu provider Angular'a bu component'in form control olarak kullanılabileceğini söyler.
   * forwardRef: Circular dependency problemini çözer
   * multi: true: Birden fazla NG_VALUE_ACCESSOR olabileceğini belirtir
   */
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteSelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="autocomplete-container" [class.focused]="isDropdownOpen">
      <div class="input-wrapper">
        <input
          #inputElement
          type="text"
          [value]="displayValue"
          (input)="onInputChange($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (click)="onInputClick()"
          (keydown)="onKeyDown($event)"
          [placeholder]="placeholder"
          [disabled]="disabled"
          class="autocomplete-input"
          autocomplete="off"
        />
        <div class="input-actions">
          <button
            *ngIf="selectedValue && !disabled"
            type="button"
            class="clear-btn"
            (click)="clearSelection($event)"
            title="Temizle"
          >
            ✕
          </button>
          <div
            class="dropdown-arrow"
            [class.open]="isDropdownOpen"
            (click)="onArrowClick($event)"
          >
            ⌄
          </div>
        </div>
      </div>

      <div class="dropdown" *ngIf="isDropdownOpen" [class.open]="isDropdownOpen">
        <div class="dropdown-content">
          <div
            class="dropdown-item all-option"
            [class.highlighted]="highlightedIndex === -1"
            (click)="selectItem('')"
            (mouseenter)="highlightedIndex = -1"
          >
            {{ allItemsText }}
          </div>

          <div
            *ngFor="let item of filteredItems; let i = index"
            class="dropdown-item"
            [class.highlighted]="highlightedIndex === i"
            [class.selected]="item === selectedValue"
            (click)="selectItem(item)"
            (mouseenter)="highlightedIndex = i"
          >
            {{ item }}
          </div>

          <div *ngIf="filteredItems.length === 0 && searchTerm" class="no-results">
            Sonuç bulunamadı
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .autocomplete-container {
      position: relative;
      width: 100%;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .input-wrapper:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }

    .autocomplete-container.focused .input-wrapper {
      box-shadow: 0 0 0 2px #3498db;
    }

    .autocomplete-input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: #333;
      font-size: 14px;
      padding: 12px 15px;
      cursor: pointer;
    }

    .autocomplete-input:focus {
      cursor: text;
    }

    .autocomplete-input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .autocomplete-input::placeholder {
      color: #999;
    }

    .input-actions {
      display: flex;
      align-items: center;
      padding-right: 15px;
      gap: 8px;
    }

    .clear-btn {
      background: #e74c3c;
      color: white;
      border: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: all 0.3s ease;
    }

    .clear-btn:hover {
      background: #c0392b;
      transform: scale(1.1);
    }

    .dropdown-arrow {
      color: #666;
      font-size: 16px;
      transition: transform 0.3s ease;
      user-select: none;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
    }

    .dropdown-arrow:hover {
      background: rgba(52, 152, 219, 0.1);
      color: #3498db;
    }

    .dropdown-arrow.open {
      transform: rotate(180deg);
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border-radius: 10px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      z-index: 99999;
      margin-top: 4px;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.2s ease;
      max-height: 250px;
      overflow: hidden;
      border: 1px solid #e1e8ed;
    }

    .dropdown.open {
      opacity: 1;
      transform: translateY(0);
    }

    .dropdown-content {
      max-height: 250px;
      overflow-y: auto;
      padding: 8px 0;
    }

    .dropdown-content::-webkit-scrollbar {
      width: 6px;
    }

    .dropdown-content::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    .dropdown-content::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
    }

    .dropdown-content::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }

    .dropdown-item {
      padding: 12px 16px;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
      font-size: 14px;
      color: #333;
      background: white;
    }

    .dropdown-item:hover,
    .dropdown-item.highlighted {
      background: #f8f9fa;
      border-left-color: #3498db;
      color: #2c3e50;
    }

    .dropdown-item.selected {
      background: #e3f2fd;
      color: #1976d2;
      font-weight: 500;
      border-left-color: #1976d2;
    }

    .dropdown-item.all-option {
      font-weight: 600;
      color: #555;
      border-bottom: 1px solid #eee;
      margin-bottom: 4px;
      background: #f9f9f9;
    }

    .dropdown-item.all-option.highlighted {
      background: #e9ecef;
      border-left-color: #666;
      color: #333;
    }

    .no-results {
      padding: 16px;
      text-align: center;
      color: #666;
      font-style: italic;
      font-size: 14px;
      background: #f8f9fa;
      border-radius: 8px;
      margin: 8px;
    }

    @media (max-width: 768px) {
      .dropdown {
        max-height: 200px;
      }

      .dropdown-content {
        max-height: 200px;
      }
    }
  `]
})
export class AutocompleteSelectComponent implements ControlValueAccessor {
  /**
   * Component Input Özellikleri
   *
   * @Input decorator ile parent component'ten veri alınır
   */

  /** @Input items: Dropdown'da gösterilecek seçenekler listesi */
  @Input() items: string[] = [];

  /** @Input placeholder: Input kutusunda gösterilecek placeholder metni */
  @Input() placeholder: string = 'Seçiniz...';

  /** @Input allItemsText: "Tümü" seçeneği için gösterilecek metin */
  @Input() allItemsText: string = 'Tümü';

  /** @Input disabled: Component'in devre dışı olup olmadığı */
  @Input() disabled: boolean = false;

  /**
   * Component Output Özellikleri
   *
   * @Output decorator ile parent component'e event gönderilir
   */

  /** @Output selectionChange: Seçim değiştiğinde tetiklenen event */
  @Output() selectionChange = new EventEmitter<string>();

  /**
   * ViewChild - DOM Element Referansı
   *
   * Template'teki input element'ine direkt erişim için kullanılır
   * ! operatörü: TypeScript'e bu değerin undefined olmayacağını garanti eder
   */
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  /**
   * Component State (Durum) Özellikleri
   */

  /** selectedValue: Şu anda seçili olan değer */
  selectedValue: string = '';

  /** searchTerm: Kullanıcının arama için yazdığı metin */
  searchTerm: string = '';

  /** displayValue: Input kutusunda gösterilen değer */
  displayValue: string = '';

  /** isDropdownOpen: Dropdown menüsünün açık olup olmadığı */
  isDropdownOpen: boolean = false;

  /** highlightedIndex: Keyboard navigation için highlight edilen öğenin indeksi */
  highlightedIndex: number = -1;

  /** filteredItems: Arama terimine göre filtrelenmiş öğeler listesi */
  filteredItems: string[] = [];

  /**
   * ControlValueAccessor Callback Fonksiyonları
   *
   * Angular Forms sistemi bu callback'leri register eder
   * Component değeri değiştiğinde bu fonksiyonlar çağrılır
   */

  /** onChange: Değer değiştiğinde Angular Forms'a haber vermek için */
  private onChange = (value: string) => {};

  /** onTouched: Component'e dokunulduğunda Angular Forms'a haber vermek için */
  private onTouched = () => {};

  /**
   * Angular Lifecycle Hook: ngOnInit
   *
   * Component initialize edildiğinde çalışır.
   * İlk filtreleme işlemini yapar.
   */
  ngOnInit(): void {
    this.updateFilteredItems();
  }

  /**
   * Angular Lifecycle Hook: ngOnChanges
   *
   * @Input özellikler değiştiğinde çalışır.
   * items listesi değiştiğinde filtrelemeyi günceller.
   */
  ngOnChanges(): void {
    this.updateFilteredItems();
  }

  /**
   * ControlValueAccessor Interface Implementation
   *
   * Bu metodlar Angular Forms sistemi ile entegrasyon için gereklidir.
   * ngModel, FormControl gibi form directive'leri bu metodları kullanır.
   */

  /**
   * writeValue: Angular Forms'tan değer geldiğinde çalışır
   *
   * @param value - Form'dan gelen yeni değer
   *
   * Örnek: ngModel="selectedCity" değiştiğinde bu metod çalışır
   */
  writeValue(value: string): void {
    this.selectedValue = value || '';
    this.displayValue = value || '';
    this.searchTerm = '';
    this.updateFilteredItems();
  }

  /**
   * registerOnChange: Angular Forms change callback'ini register eder
   *
   * @param fn - Değer değiştiğinde çağrılacak callback fonksiyonu
   *
   * Component içinde değer değiştiğinde this.onChange(newValue) çağrılır
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * registerOnTouched: Angular Forms touched callback'ini register eder
   *
   * @param fn - Component'e dokunulduğunda çağrılacak callback fonksiyonu
   *
   * Focus/blur işlemlerinde form validation için kullanılır
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * setDisabledState: Component'in disabled durumunu set eder
   *
   * @param isDisabled - Component'in devre dışı olup olmayacağı
   *
   * Form'da FormControl.disable() çağrıldığında bu metod çalışır
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Component Event Handler Methods
   *
   * Bu metodlar kullanıcı etkileşimlerini (click, input, keyboard vs.) yönetir
   */

  /**
   * toggleDropdown: Dropdown'ı açar
   *
   * Sadece dropdown kapalıysa açar, açıksa bir şey yapmaz.
   * Açılırken arama terimini temizler ve input'a focus verir.
   */
  toggleDropdown(): void {
    if (this.disabled) return; // Disabled ise hiçbir şey yapma

    if (!this.isDropdownOpen) {
      this.isDropdownOpen = true;
      this.searchTerm = '';
      this.displayValue = '';
      this.updateFilteredItems();

      // setTimeout: DOM güncellendikten sonra focus vermek için
      setTimeout(() => this.inputElement?.nativeElement.focus(), 100);
    }
  }

  /**
   * onInputChange: Input değeri değiştiğinde çalışan event handler
   *
   * @param event - Input change event'i
   *
   * Kullanıcı yazmaya başladığında:
   * - Arama terimini günceller
   * - Filtrelemeyi yapar
   * - Dropdown'ı açar (kapalıysa)
   * - İlk öğeyi highlight eder
   */
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement; // Type casting
    this.searchTerm = target.value;
    this.displayValue = target.value;
    this.updateFilteredItems();
    this.highlightedIndex = 0; // İlk öğeyi highlight et

    // Dropdown kapalıysa aç
    if (!this.isDropdownOpen) {
      this.isDropdownOpen = true;
    }
  }

  /**
   * onFocus: Input'a focus verildiğinde çalışan event handler
   *
   * Input'a tıklandığında veya tab ile gelindiğinde dropdown'ı açar
   */
  onFocus(): void {
    if (this.disabled) return;

    if (!this.isDropdownOpen) {
      this.isDropdownOpen = true;
      this.searchTerm = '';
      this.displayValue = '';
      this.updateFilteredItems();
    }
  }

  onInputClick(): void {
    if (this.disabled) return;
    if (!this.isDropdownOpen) {
      this.toggleDropdown();
    }
  }

  /**
   * onArrowClick: Dropdown ok (arrow) ikonuna tıklandığında çalışır
   *
   * @param event - Click event'i
   *
   * Event bubbling'i durdurur (stopPropagation)
   * Dropdown açıksa kapatır, kapalıysa açar
   */
  onArrowClick(event: Event): void {
    event.preventDefault();     // Default davranışı engelle
    event.stopPropagation();   // Event bubbling'i durdur
    if (this.disabled) return;

    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
      this.displayValue = this.selectedValue; // Seçili değeri geri yükle
    } else {
      this.toggleDropdown();
    }
  }

  /**
   * onBlur: Input focus'unu kaybettiğinde çalışır
   *
   * setTimeout ile kısa bir gecikme koyar çünkü:
   * - Kullanıcı dropdown'a tıklayabilir
   * - Blur event'i click event'inden önce gelir
   * - Gecikme ile click event'inin tamamlanmasını bekler
   */
  onBlur(): void {
    setTimeout(() => {
      if (!this.isDropdownOpen) return;
      this.isDropdownOpen = false;
      this.displayValue = this.selectedValue; // Seçili değeri geri yükle
      this.searchTerm = '';
      this.onTouched(); // Angular Forms'a touched durumunu bildir
    }, 150); // 150ms gecikme
  }

  /**
   * onKeyDown: Keyboard event handler
   *
   * @param event - KeyboardEvent
   *
   * Keyboard navigasyonu için:
   * - ArrowDown: Bir sonraki öğeyi highlight et
   * - ArrowUp: Bir önceki öğeyi highlight et
   * - Enter: Highlight edilen öğeyi seç
   * - Escape: Dropdown'ı kapat
   */
  onKeyDown(event: KeyboardEvent): void {
    // Dropdown kapalıysa sadece Enter ve ArrowDown ile aç
    if (!this.isDropdownOpen) {
      if (event.key === 'Enter' || event.key === 'ArrowDown') {
        event.preventDefault();
        this.toggleDropdown();
      }
      return;
    }

    // Dropdown açıkken keyboard navigasyonu
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        // Math.min ile listenin sonunu geçmemesini sağla
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.filteredItems.length - 1);
        break;

      case 'ArrowUp':
        event.preventDefault();
        // Math.max ile -1'den (all option) yukarı çıkmamasını sağla
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
        break;

      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex === -1) {
          // All option seçili
          this.selectItem('');
        } else if (this.highlightedIndex >= 0 && this.highlightedIndex < this.filteredItems.length) {
          // Normal öğe seçili
          this.selectItem(this.filteredItems[this.highlightedIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.isDropdownOpen = false;
        this.displayValue = this.selectedValue; // Değişiklikleri iptal et
        this.inputElement?.nativeElement.blur(); // Input'tan focus'u al
        break;
    }
  }

  /**
   * selectItem: Bir öğe seçildiğinde çalışan metod
   *
   * @param value - Seçilen değer
   *
   * Bu metod tüm seçim işlemlerini yönetir:
   * - Component state'ini günceller
   * - Angular Forms'a bildirir (onChange)
   * - Parent component'e event gönderir (selectionChange)
   * - Dropdown'ı kapatır
   */
  selectItem(value: string): void {
    this.selectedValue = value;
    this.displayValue = value;
    this.searchTerm = '';
    this.isDropdownOpen = false;

    // Angular Forms'a değişikliği bildir
    this.onChange(value);

    // Parent component'e event gönder
    this.selectionChange.emit(value);

    // Filtrelemeyi güncelle
    this.updateFilteredItems();
  }

  /**
   * clearSelection: Seçimi temizleme metodu
   *
   * @param event - Click event'i
   *
   * X (temizle) butonuna tıklandığında çalışır
   * Event bubbling'i durdurarak input'a click gitmesini engeller
   */
  clearSelection(event: Event): void {
    event.stopPropagation(); // Input click event'ini tetikleme
    this.selectItem(''); // Boş değer seç (tümü seçeneği)
  }

  /**
   * updateFilteredItems: Filtreleme işlemini yapan metod
   *
   * Arama terimine göre items listesini filtreler.
   * Arama terimi yoksa tüm öğeleri gösterir.
   *
   * includes() metodu: String içinde substring arama yapar
   * toLowerCase(): Büyük/küçük harf duyarsız arama için
   */
  updateFilteredItems(): void {
    if (!this.searchTerm) {
      // Arama terimi yoksa tüm öğeleri göster
      this.filteredItems = [...this.items]; // Spread operator ile kopyala
    } else {
      // Arama terimine göre filtrele
      const term = this.searchTerm.toLowerCase();
      this.filteredItems = this.items.filter(item =>
        item.toLowerCase().includes(term)
      );
    }

    // Highlight edilen index filtreleme sonrası geçersizse düzelt
    if (this.highlightedIndex >= this.filteredItems.length) {
      this.highlightedIndex = Math.max(0, this.filteredItems.length - 1);
    }
  }

  /**
   * @HostListener: Document click event'ini dinler
   *
   * Component dışında bir yere tıklandığında dropdown'ı kapatır.
   * Bu pattern "click outside to close" olarak bilinir.
   *
   * @param event - Document click event'i
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Tıklanan element component içinde mi kontrol et
    const container = target.closest('.autocomplete-container');

    if (!container) {
      // Component dışında tıklandıysa dropdown'ı kapat
      this.isDropdownOpen = false;
      this.displayValue = this.selectedValue; // Değişiklikleri iptal et
      this.searchTerm = '';
    }
  }
}
