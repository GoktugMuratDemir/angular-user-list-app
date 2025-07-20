/**
 * SERVICES BARREL EXPORT (SERVİSLER İÇİN TOPLU EXPORT)
 *
 * Bu dosya servisler klasörü için barrel export pattern'ini kullanır.
 *
 * Kullanım örneği:
 * import { UserService } from './services';
 *
 * Birden fazla servis olduğunda:
 * import { UserService, AuthService, ApiService } from './services';
 *
 * Bu pattern sayesinde:
 * - Import path'leri kısalır
 * - Dosya yapısı değişiklikleri tek yerden yönetilebilir
 * - Kodun maintainability'si (sürdürülebilirliği) artar
 */

export * from './user.service';
