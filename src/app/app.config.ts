/**
 * UYGULAMA KONFIGÜRASYON DOSYASI (APPLICATION CONFIGURATION)
 *
 * Bu dosya Angular uygulamasının ana konfigürasyonunu içerir.
 * Modern Angular'da (v14+) standalone API ile birlikte kullanılan provider'lar burada tanımlanır.
 *
 * Provider nedir?
 * - Angular'da servislerin, direktiflerin ve diğer sınıfların nasıl oluşturulacağını belirten objeler
 * - Dependency Injection (DI) sisteminin temelini oluşturur
 */

// Angular core modüllerinden gerekli importlar
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';          // Router (sayfa yönlendirme) için
import { provideHttpClient } from '@angular/common/http'; // HTTP istekleri için

// Uygulama route'larını import ediyoruz
import { routes } from './app.routes';

/**
 * Ana uygulama konfigürasyonu
 *
 * ApplicationConfig: Angular uygulamasının konfigürasyon tipini tanımlar
 * providers: Uygulamada kullanılacak provider'ların listesi
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * provideBrowserGlobalErrorListeners()
     * - Tarayıcıdaki global hataları dinler ve Angular'ın hata yönetim sistemine entegre eder
     * - Konsol hatalarını ve promise rejection'larını yakalar
     */
    provideBrowserGlobalErrorListeners(),

    /**
     * provideZonelessChangeDetection()
     * - Angular'ın yeni zoneless change detection sistemini aktifleştirir
     * - Zone.js kullanmadan performanslı change detection sağlar
     * - Modern Angular uygulamalarında önerilen yaklaşımdır
     */
    provideZonelessChangeDetection(),

    /**
     * provideRouter(routes)
     * - Angular Router'ını konfigüre eder
     * - routes: app.routes.ts dosyasında tanımlanan sayfa yönlendirme kuralları
     * - SPA (Single Page Application) navigasyonu sağlar
     */
    provideRouter(routes),

    /**
     * provideHttpClient()
     * - HTTP istekleri yapmak için HttpClient servisini sağlar
     * - REST API'lere istek göndermek için gerekli
     * - UserService'de API çağrıları için kullanılıyor
     */
    provideHttpClient()
  ]
};
