/**
 * ANGULAR UYGULAMASININ ANA GİRİŞ NOKTASI (MAIN ENTRY POINT)
 *
 * Bu dosya Angular uygulamasının başlatıldığı ana dosyadır.
 * Modern Angular'da (v14+) main.ts dosyası, uygulamayı bootstrap etmek için kullanılır.
 *
 * Eski Angular sürümlerinde main.ts yerine platformBrowserDynamic().bootstrapModule() kullanılırdı.
 * Yeni standalone API ile daha basit ve modüler bir yapı kullanıyoruz.
 */

// Angular'ın browser platformu için bootstrap fonksiyonu
import { bootstrapApplication } from '@angular/platform-browser';

// Uygulamanın konfigürasyon ayarları (providers, routes vs.)
import { appConfig } from './app/app.config';

// Ana uygulama komponenti
import { AppComponent } from './app/app.component';

/**
 * Uygulamayı başlatır (bootstrap)
 *
 * bootstrapApplication: Modern Angular'da standalone componentler için kullanılan bootstrap fonksiyonu
 * - İlk parametre: Ana component (AppComponent)
 * - İkinci parametre: Uygulama konfigürasyonu (appConfig)
 *
 * catch: Başlatma sırasında oluşabilecek hataları yakalar ve konsola yazar
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
