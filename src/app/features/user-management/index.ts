/**
 * USER MANAGEMENT FEATURE BARREL EXPORT
 *
 * Bu dosya user-management feature'ının tüm component'lerini export eder.
 *
 * User Management Feature'ı şunları içerir:
 * - UserListComponent: Kullanıcı listesi sayfası
 * - UserDetailComponent: Kullanıcı detay sayfası
 *
 * Feature Organization (Özellik Organizasyonu):
 * /features/user-management/
 *   /components/
 *     /user-list/
 *     /user-detail/
 *   /services/ (gelecekte eklenebilir)
 *   /models/ (gelecekte eklenebilir)
 *   index.ts
 *
 * Bu yapı sayesinde her feature kendi içinde bağımsız bir modül gibi çalışır.
 */

export * from './components/user-list/user-list.component';
export * from './components/user-detail/user-detail.component';
