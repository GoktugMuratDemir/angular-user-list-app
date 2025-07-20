/**
 * UYGULAMA ROUTE TANIMLARI (APPLICATION ROUTING)
 *
 * Bu dosya uygulamanın sayfa yönlendirme (routing) kurallarını tanımlar.
 * Angular Router, Single Page Application (SPA) içinde farklı sayfalar arası navigasyonu sağlar.
 *
 * Route nedir?
 * - URL path'i ile component arasındaki eşleştirme
 * - Kullanıcı farklı URL'lere gittiğinde farklı componentlerin gösterilmesini sağlar
 */

// Angular Router'dan Routes tipini import ediyoruz
import { Routes } from '@angular/router';

// Feature modülünden gerekli componentleri import ediyoruz
// Bu componentler farklı sayfalarda gösterilecek
import { UserListComponent, UserDetailComponent } from './features';

/**
 * Route tanımları
 *
 * Routes: Route objelerinin array'i
 * Her route objesi şu özelliklere sahip:
 * - path: URL path'i (adres çubuğunda görünen kısım)
 * - component: Bu path'te gösterilecek component
 * - redirectTo: Yönlendirme yapılacak path
 */
export const routes: Routes = [
  /**
   * Ana sayfa route'u
   * path: '' (boş string) = ana sayfa (localhost:4200/)
   * component: UserListComponent = kullanıcı listesi komponenti gösterilir
   */
  { path: '', component: UserListComponent },

  /**
   * Kullanıcı detay sayfası route'u
   * path: 'users/:id' = /users/1, /users/2 gibi URL'ler
   * :id = route parametresi (dinamik değer)
   * component: UserDetailComponent = kullanıcı detay komponenti gösterilir
   *
   * Örnek: localhost:4200/users/5 URL'i UserDetailComponent'i gösterir
   * ve component içinde id=5 parametresine erişilebilir
   */
  { path: 'users/:id', component: UserDetailComponent },

  /**
   * Wildcard route (catch-all)
   * path: '**' = yukarıdaki hiçbir route ile eşleşmeyen tüm URL'ler
   * redirectTo: '' = ana sayfaya yönlendir
   *
   * Bu route her zaman en sonda olmalı!
   * 404 sayfası yerine ana sayfaya yönlendirme yapar
   */
  { path: '**', redirectTo: '' }
];
