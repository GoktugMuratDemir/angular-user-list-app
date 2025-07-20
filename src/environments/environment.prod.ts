/**
 * PRODUCTION ORTAMI AYARLARI (PRODUCTION ENVIRONMENT)
 *
 * Bu dosya üretim ortamı (production) için yapılandırma ayarlarını içerir.
 * Angular build --configuration production komutu ile build alındığında
 * bu dosya kullanılır ve environment.ts yerine geçer.
 *
 * Production ortamında genellikle:
 * - Debug modları kapatılır
 * - Gerçek API URL'leri kullanılır
 * - Optimizasyonlar aktifleştirilir
 * - Error tracking servisleri aktifleştirilir
 */

export const environment = {
  /**
   * production: true
   * - Bu üretim ortamı olduğunu belirtir
   * - Angular optimizasyonlarını ve production modunu aktifleştirir
   * - Console.log'lar ve debug bilgileri gizlenir
   */
  production: true,

  /**
   * apiUrl: Production API URL'i
   * - Gerçek projede buraya production API URL'iniz gelir
   * - Şu anda demo için JSONPlaceholder kullanıyoruz
   * - Örnek: 'https://api.yourapp.com'
   */
  apiUrl: 'https://jsonplaceholder.typicode.com',

  /**
   * appName: Uygulama adı
   * - Production'da da aynı kalır
   */
  appName: 'Angular User List App',

  /**
   * version: Uygulama versiyonu
   * - Her release ile güncellenmelidir
   * - CI/CD pipeline'ında otomatik olarak güncellenebilir
   */
  version: '1.0.0'
};
