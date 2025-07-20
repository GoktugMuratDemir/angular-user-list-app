/**
 * KULLANICI VERİ MODELLERİ (USER DATA MODELS)
 *
 * Bu dosya uygulamada kullanılan veri yapılarını (data models) tanımlar.
 * TypeScript interface'leri kullanarak tip güvenliği sağlar.
 *
 * Interface nedir?
 * - Bir objenin hangi özelliklere sahip olması gerektiğini tanımlar
 * - Compile time'da tip kontrolü yapar
 * - Runtime'da JavaScript koduna dönüşmez (sadece geliştirme aşamasında kullanılır)
 *
 * Bu modeller JSONPlaceholder API'sinin döndürdüğü veri yapısına uygun olarak tasarlanmıştır.
 */

/**
 * Ana Kullanıcı Interface'i
 *
 * JSONPlaceholder /users endpoint'inin döndürdüğü kullanıcı verisinin yapısını tanımlar.
 * Her özellik için tip belirtilmiştir:
 * - number: sayısal değerler
 * - string: metin değerleri
 * - Address/Company: diğer interface'lerden referanslar
 */
export interface User {
  id: number;           // Kullanıcının benzersiz kimlik numarası
  name: string;         // Kullanıcının tam adı (örn: "John Doe")
  username: string;     // Kullanıcı adı (örn: "johndoe")
  email: string;        // E-posta adresi
  address: Address;     // Adres bilgileri (Address interface'ini kullanır)
  phone: string;        // Telefon numarası
  website: string;      // Kişisel website adresi
  company: Company;     // Şirket bilgileri (Company interface'ini kullanır)
}

/**
 * Adres Bilgileri Interface'i
 *
 * Kullanıcının adres bilgilerini tanımlar.
 * İç içe yapıda coğrafi koordinat bilgisi de içerir.
 */
export interface Address {
  street: string;       // Sokak adı
  suite: string;        // Apartman/daire bilgisi
  city: string;         // Şehir adı (filtreleme için kullanılıyor)
  zipcode: string;      // Posta kodu
  geo: Geo;            // Coğrafi koordinatlar (Geo interface'ini kullanır)
}

/**
 * Coğrafi Koordinat Interface'i
 *
 * Kullanıcının lokasyonunun enlem ve boylam bilgilerini tanımlar.
 * JSON'da string olarak geldiği için string tipinde tanımlanmış.
 */
export interface Geo {
  lat: string;          // Enlem (latitude) - string formatında
  lng: string;          // Boylam (longitude) - string formatında
}

/**
 * Şirket Bilgileri Interface'i
 *
 * Kullanıcının çalıştığı şirketin bilgilerini tanımlar.
 */
export interface Company {
  name: string;         // Şirket adı (listede gösteriliyor)
  catchPhrase: string;  // Şirket sloganı
  bs: string;          // Şirket business/iş alanı açıklaması
}
