import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
      z-index: 1000;
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
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteSelectComponent),
      multi: true
    }
  ]
})
export class AutocompleteSelectComponent implements ControlValueAccessor {
  @Input() items: string[] = [];
  @Input() placeholder: string = 'Seçiniz...';
  @Input() allItemsText: string = 'Tümü';
  @Input() disabled: boolean = false;

  @Output() selectionChange = new EventEmitter<string>();

  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  selectedValue: string = '';
  searchTerm: string = '';
  displayValue: string = '';
  isDropdownOpen: boolean = false;
  highlightedIndex: number = -1;
  filteredItems: string[] = [];

  private onChange = (value: string) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.updateFilteredItems();
  }

  ngOnChanges(): void {
    this.updateFilteredItems();
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.selectedValue = value || '';
    this.displayValue = value || '';
    this.searchTerm = '';
    this.updateFilteredItems();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleDropdown(): void {
    if (this.disabled) return;

    if (!this.isDropdownOpen) {
      this.isDropdownOpen = true;
      this.searchTerm = '';
      this.displayValue = '';
      this.updateFilteredItems();
      setTimeout(() => this.inputElement?.nativeElement.focus(), 100);
    }
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.displayValue = target.value;
    this.updateFilteredItems();
    this.highlightedIndex = 0;

    if (!this.isDropdownOpen) {
      this.isDropdownOpen = true;
    }
  }

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

  onArrowClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) return;

    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
      this.displayValue = this.selectedValue;
    } else {
      this.toggleDropdown();
    }
  }

  onBlur(): void {
    setTimeout(() => {
      if (!this.isDropdownOpen) return;
      this.isDropdownOpen = false;
      this.displayValue = this.selectedValue;
      this.searchTerm = '';
      this.onTouched();
    }, 150);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.isDropdownOpen) {
      if (event.key === 'Enter' || event.key === 'ArrowDown') {
        event.preventDefault();
        this.toggleDropdown();
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.filteredItems.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex === -1) {
          this.selectItem('');
        } else if (this.highlightedIndex >= 0 && this.highlightedIndex < this.filteredItems.length) {
          this.selectItem(this.filteredItems[this.highlightedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.isDropdownOpen = false;
        this.displayValue = this.selectedValue;
        this.inputElement?.nativeElement.blur();
        break;
    }
  }

  selectItem(value: string): void {
    this.selectedValue = value;
    this.displayValue = value;
    this.searchTerm = '';
    this.isDropdownOpen = false;
    this.onChange(value);
    this.selectionChange.emit(value);
    this.updateFilteredItems();
  }

  clearSelection(event: Event): void {
    event.stopPropagation();
    this.selectItem('');
  }

  updateFilteredItems(): void {
    if (!this.searchTerm) {
      this.filteredItems = [...this.items];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredItems = this.items.filter(item =>
        item.toLowerCase().includes(term)
      );
    }

    // Reset highlighted index if current selection is out of bounds
    if (this.highlightedIndex >= this.filteredItems.length) {
      this.highlightedIndex = Math.max(0, this.filteredItems.length - 1);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const container = target.closest('.autocomplete-container');
    if (!container) {
      this.isDropdownOpen = false;
      this.displayValue = this.selectedValue;
      this.searchTerm = '';
    }
  }
}
