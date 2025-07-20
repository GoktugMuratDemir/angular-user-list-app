/**
 * ANA UYGULAMA KOMPONENTİ (ROOT COMPONENT)
 *
 * Bu dosya Angular uygulamasının ana (root) komponentidir.
 * Tüm diğer componentler bu komponentin içinde çalışır.
 *
 * Component nedir?
 * - Angular uygulamasının yapı taşları
 * - HTML template + TypeScript class + CSS styles içerir
 * - Kullanıcı arayüzünün belirli bir bölümünü yönetir
 */

// Angular core'dan gerekli decorator ve sinyaller
import { Component, signal } from '@angular/core';
// Router çıktısını göstermek için RouterOutlet
import { RouterOutlet } from '@angular/router';

/**
 * @Component Decorator'ı
 *
 * Bu decorator bir TypeScript class'ını Angular component'ine dönüştürür.
 *
 * Özellikler:
 * - selector: HTML'de bu componenti çağırmak için kullanılan tag adı
 * - imports: Bu componentte kullanılacak diğer component/directive/pipe'lar (standalone component için)
 * - templateUrl: Component'in HTML template dosyasının yolu
 * - styleUrl: Component'in CSS dosyasının yolu
 */
@Component({
  selector: 'app-root',              // <app-root></app-root> şeklinde kullanılır
  imports: [RouterOutlet],           // RouterOutlet'i import ediyoruz (standalone component için)
  templateUrl: './app.component.html', // HTML template dosyası
  styleUrl: './app.component.css'    // CSS stil dosyası
})
export class AppComponent {
  /**
   * title özelliği - Signal kullanımı
   *
   * signal(): Angular'ın yeni reaktif programlama API'si
   * - Değer değişikliklerini otomatik olarak izler
   * - Template'de kullanıldığında otomatik güncellenir
   * - Modern Angular'da state yönetimi için önerilen yaklaşım
   *
   * protected: Bu özelliğin sadece bu class ve alt class'lardan erişilebilir olmasını sağlar
   * readonly: Bu özelliğin değerinin değiştirilemez olmasını sağlar
   */
  protected readonly title = signal('angular-user-info-app');
}
