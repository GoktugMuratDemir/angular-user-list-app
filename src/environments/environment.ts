/**
 * GELİŞTİRME ORTAMI AYARLARI (DEVELOPMENT ENVIRONMENT)
 *
 * Bu dosya geliştirme ortamı için yapılandırma ayarlarını içerir.
 * Angular'da farklı ortamlar (development, production, staging) için
 * farklı environment dosyaları kullanılır.
 *
 * Environment dosyaları neden kullanılır?
 * - Farklı ortamlarda farklı API URL'leri kullanmak için
 * - Geliştirme ve üretim ortamları için farklı ayarlar
 * - Güvenlik anahtarları ve konfigürasyonları yönetmek için
 * - Feature flag'leri kontrol etmek için
 */

export const environment = {
  /**
   * production: false
   * - Bu geliştirme ortamı olduğunu belirtir
   * - Production'da true olur
   * - Angular bu değere göre debug modunu açar/kapatır
   */
  production: false,

  /**
   * apiUrl: API'nin base URL'i
   * - JSONPlaceholder: Ücretsiz fake REST API servisi
   * - Test ve geliştirme için kullanılan mock API
   * - Gerçek projede kendi API URL'inizi kullanırsınız
   */
  apiUrl: 'https://jsonplaceholder.typicode.com',

  /**
   * appName: Uygulama adı
   * - UI'da gösterilmek için kullanılabilir
   * - Hata raporlarında vs. kullanılabilir
   */
  appName: 'Angular User List App',

  /**
   * version: Uygulama versiyonu
   * - Debugging ve versiyonlama için kullanılır
   * - Footer'da veya about sayfasında gösterilebilir
   */
  version: '1.0.0'
};
