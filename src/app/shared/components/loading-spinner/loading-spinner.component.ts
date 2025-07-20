/**
 * LOADING SPINNER KOMPONENTİ (LOADING SPINNER COMPONENT)
 *
 * Bu component yükleme durumlarında kullanılan modern bir spinner componentidir.
 * Proje tasarımına uygun gradient renkler ve smooth animasyonlar içerir.
 *
 * Component özellikleri:
 * - Standalone component (modül gerektirmez)
 * - Input decorator ile özelleştirilebilir
 * - Flexible boyut ve mesaj ayarları
 * - Modern CSS animations
 * - Responsive design
 *
 * Kullanım alanları:
 * - API çağrıları sırasında
 * - Sayfa geçişlerinde
 * - Veri yükleme işlemlerinde
 * - Form gönderimi sırasında
 */

// Angular core modüllerinden gerekli importlar
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @Component Decorator
 *
 * Component'in metadata'sını tanımlar:
 * - selector: HTML'de nasıl kullanılacağı
 * - standalone: true = modül gerektirmez (modern Angular)
 * - imports: Bu component'te kullanılan dependency'ler
 * - template: HTML template (inline olarak tanımlanmış)
 * - styles: CSS stilleri (inline olarak tanımlanmış)
 */
@Component({
  selector: 'app-loading-spinner',    // <app-loading-spinner></app-loading-spinner>
  standalone: true,                   // Standalone component (Angular 14+)
  imports: [CommonModule],            // CommonModule gerekli directive'ler için
  template: `
    <div class="loading-container" [class]="containerClass">
      <!-- Ana Spinner Wrapper -->
      <div class="spinner-wrapper">
        
        <!-- Modern Gradient Spinner -->
        <div class="spinner" [style.width.px]="size" [style.height.px]="size">
          <div class="spinner-inner"></div>
        </div>

        <!-- Pulse Animation Background -->
        <div class="spinner-pulse" [style.width.px]="size * 1.5" [style.height.px]="size * 1.5"></div>
        
        <!-- Loading Message -->
        <div class="loading-message" *ngIf="message">
          <span class="message-text">{{ message }}</span>
          <div class="dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>

      <!-- Backdrop (Overlay) -->
      <div class="backdrop" *ngIf="showBackdrop"></div>
    </div>
  `,
  styles: [`
    /* Ana Container */
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      min-height: 100px;
      padding: 20px;
    }

    .loading-container.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.95);
      z-index: 9999;
      min-height: 100vh;
    }

    .loading-container.overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      z-index: 10;
    }

    .loading-container.inline {
      position: relative;
      background: transparent;
      padding: 40px 20px;
    }

    /* Spinner Wrapper */
    .spinner-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    /* Modern Gradient Spinner */
    .spinner {
      position: relative;
      border-radius: 50%;
      background: conic-gradient(
        from 0deg,
        transparent 0deg,
        #667eea 90deg,
        #764ba2 180deg,
        #667eea 270deg,
        transparent 360deg
      );
      animation: spin 1.2s linear infinite;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }

    .spinner-inner {
      width: 85%;
      height: 85%;
      background: white;
      border-radius: 50%;
      position: relative;
    }

    /* Pulse Animation Background */
    .spinner-pulse {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      animation: pulse 2s ease-in-out infinite;
      z-index: 1;
    }

    /* Loading Message */
    .loading-message {
      text-align: center;
      color: #666;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .message-text {
      display: block;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 8px;
      color: #555;
      letter-spacing: 0.5px;
    }

    /* Animated Dots */
    .dots {
      display: flex;
      justify-content: center;
      gap: 4px;
    }

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      animation: dotPulse 1.4s ease-in-out infinite;
    }

    .dot:nth-child(1) {
      animation-delay: 0s;
    }

    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    /* Backdrop */
    .backdrop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.1);
      z-index: 0;
    }

    /* Animations */
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(0.8);
      }
      50% {
        opacity: 0.6;
        transform: translate(-50%, -50%) scale(1.2);
      }
    }

    @keyframes dotPulse {
      0%, 100% {
        opacity: 0.4;
        transform: scale(0.8);
      }
      50% {
        opacity: 1;
        transform: scale(1.2);
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .loading-container {
        padding: 15px;
        min-height: 80px;
      }

      .message-text {
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      .loading-container {
        padding: 10px;
        min-height: 60px;
      }

      .message-text {
        font-size: 13px;
      }

      .spinner-wrapper {
        gap: 15px;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .spinner,
      .spinner-pulse,
      .dot {
        animation-duration: 3s;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .loading-container.fullscreen,
      .loading-container.overlay {
        background: rgba(0, 0, 0, 0.9);
      }

      .spinner-inner {
        background: #2c3e50;
      }

      .message-text {
        color: #ecf0f1;
      }

      .backdrop {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  `]
})
export class LoadingSpinnerComponent {
  /**
   * @Input Properties
   *
   * Bu propertyler parent component'ten gelebilir ve spinner'ı özelleştirmek için kullanılır
   */

  /**
   * message: Loading mesajı (opsiyonel)
   * @example
   * <app-loading-spinner message="Kullanıcılar yükleniyor..."></app-loading-spinner>
   */
  @Input() message: string = '';

  /**
   * size: Spinner boyutu (pixel cinsinden)
   * Varsayılan: 50px
   * @example
   * <app-loading-spinner [size]="80"></app-loading-spinner>
   */
  @Input() size: number = 50;

  /**
   * type: Loading container tipi
   * - 'inline': Normal içerik içinde gösterim (varsayılan)
   * - 'overlay': Mevcut içerik üzerinde overlay
   * - 'fullscreen': Tam ekran loading
   * 
   * @example
   * <app-loading-spinner type="fullscreen"></app-loading-spinner>
   */
  @Input() type: 'inline' | 'overlay' | 'fullscreen' = 'inline';

  /**
   * showBackdrop: Arkaplan overlay gösterilsin mi?
   * Varsayılan: false
   * @example
   * <app-loading-spinner [showBackdrop]="true"></app-loading-spinner>
   */
  @Input() showBackdrop: boolean = false;

  /**
   * Computed property: Container CSS class'ını hesaplar
   * Type'a göre uygun CSS class'ını döner
   */
  get containerClass(): string {
    return this.type;
  }
}
