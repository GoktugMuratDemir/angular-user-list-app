/**
 * KULLANICI SERVİSİ (USER SERVICE)
 *
 * Bu servis kullanıcı verilerini API'den almak için kullanılır.
 * Angular'da servisler, componentler arasında veri paylaşımı ve
 * dış kaynaklardan (API, database vs.) veri alımı için kullanılır.
 *
 * Service nedir?
 * - İş mantığını (business logic) içeren sınıflar
 * - Componentler arasında veri paylaşımı sağlar
 * - HTTP istekleri, localStorage işlemleri vs. için kullanılır
 * - Dependency Injection ile componentlere enjekte edilir
 */

// Angular'ın servis sistemi için Injectable decorator
import { Injectable } from '@angular/core';

// HTTP istekleri yapmak için HttpClient
import { HttpClient } from '@angular/common/http';

// RxJS'den Observable - asenkron veri akışları için
import { Observable } from 'rxjs';

// Uygulama modellerimizi import ediyoruz
import { User } from '../models';

// Environment ayarları (API URL vs.)
import { environment } from '../../environments/environment';

/**
 * @Injectable Decorator'ı
 *
 * Bu decorator bir class'ı Angular servisine dönüştürür.
 *
 * providedIn: 'root' = Bu servis uygulamanın root level'ında singleton olarak sağlanır
 * - Singleton: Tüm uygulama boyunca sadece 1 instance oluşturulur
 * - 'root': Uygulama seviyesinde sağlanır (her yerde kullanılabilir)
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * API URL'ini environment'tan alıyoruz
   *
   * private readonly: Bu özellik sadece bu class içinde kullanılabilir ve değiştirilemez
   * environment.apiUrl: Çevre ayarlarından API base URL'ini alır
   * '/users': JSONPlaceholder'ın users endpoint'i
   */
  private readonly apiUrl = `${environment.apiUrl}/users`;

  /**
   * Constructor (Yapıcı Metod)
   *
   * Dependency Injection ile HttpClient'ı enjekte ediyoruz.
   * Angular otomatik olarak HttpClient instance'ını oluşturup buraya verir.
   *
   * private http: HttpClient = Bu serviste HTTP istekleri yapmak için kullanılır
   */
  constructor(private http: HttpClient) { }

  /**
   * Tüm kullanıcıları getiren metod
   *
   * Returns: Observable<User[]> = Kullanıcı array'inin asenkron akışı
   *
   * Observable nedir?
   * - RxJS'nin asenkron veri akışı sistemi
   * - HTTP istekleri gibi asenkron işlemler için kullanılır
   * - .subscribe() ile dinlenir
   * - Lazy evaluation (sadece subscribe edildiğinde çalışır)
   *
   * get<User[]>():
   * - HTTP GET isteği yapar
   * - Generic tip <User[]> ile dönüş tipini belirtir
   * - TypeScript compile time'da tip kontrolü yapar
   */
  getUsers(): Observable<User[]> {
    // JSONPlaceholder /users endpoint'i varsayılan olarak 10 kullanıcı döndürür
    // Bu veriler mock data'dır (gerçek bir veritabanından gelmiyor)
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Belirli bir kullanıcıyı ID'sine göre getiren metod
   *
   * @param id - Getirilecek kullanıcının ID'si
   * Returns: Observable<User> = Tek kullanıcının asenkron akışı
   *
   * Template literal kullanımı:
   * `${this.apiUrl}/${id}` = "https://jsonplaceholder.typicode.com/users/1" gibi
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
