/**
 * FEATURES BARREL EXPORT (ÖZELLİKLER İÇİN TOPLU EXPORT)
 *
 * Bu dosya features klasörü için barrel export pattern'ini kullanır.
 * Features nedir?
 * - Uygulamanın ana işlevselliklerini (özellikleri) temsil eden modüller
 * - Her feature kendi business logic'ini içerir
 * - Feature-based architecture (özellik tabanlı mimari) kullanır
 *
 * Örnekler:
 * - user-management: Kullanıcı yönetimi özellikleri
 * - authentication: Kimlik doğrulama özellikleri
 * - product-catalog: Ürün katalogu özellikleri
 *
 * Bu pattern sayesinde feature'lar arasında temiz bir ayrım sağlanır.
 */

export * from './user-management';
