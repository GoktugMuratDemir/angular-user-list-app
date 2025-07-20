# Angular User List App - Kapsamlı Eğitim Dokümantasyonu

Bu proje Angular 20 ile geliştirilmiş, **yeni başlayanlar için kapsamlı dokümantasyon** içeren modern bir kullanıcı listesi uygulamasıdır. Her dosyada detaylı Türkçe açıklamalar ve Angular konseptlerinin açıklamaları bulunmaktadır.

## 🌐 Canlı Demo

**Uygulamayı canlı olarak görüntüleyin:** [https://angular-user-list-app.vercel.app/](https://angular-user-list-app.vercel.app/)

Bu canlı demo sayesinde:
- Uygulamanın tüm özelliklerini test edebilirsiniz
- Responsive tasarımını farklı ekran boyutlarında görebilirsiniz
- Filtreleme, sıralama ve arama özelliklerini deneyebilirsiniz
- Modern Angular component'lerinin nasıl çalıştığını görüntüleyebilirsiniz

## 🎯 Projenin Amacı

Bu proje, Angular'a yeni başlayan geliştiriciler için:
- Modern Angular (v20) pratiklerini öğrenmeyi
- Standalone component yapısını anlamayı
- TypeScript ve RxJS konseptlerini kavramayı
- Component architecture'ını öğrenmeyi
- Best practice'leri görmeleyi sağlar

## 📚 Dokümantasyon Özellikleri

### Her dosyada bulacağınız açıklamalar:
- **Angular konseptleri**: Component, Service, Injectable, Router vs.
- **TypeScript özellikleri**: Interface, type safety, decorators
- **RxJS patterns**: Observable, subscription, operators
- **Modern Angular**: Standalone components, inject() function, signals
- **Architecture patterns**: Feature modules, barrel exports, dependency injection

### Dosya bazlı dokümantasyon:
- `src/main.ts` - Uygulama başlatma sürecinin açıklaması
- `src/app/app.config.ts` - Provider'lar ve konfigürasyon açıklaması
- `src/app/models/` - TypeScript interface'lerinin kullanımı
- `src/app/services/` - HTTP client ve dependency injection
- `src/app/components/` - Component lifecycle, data binding, event handling
- `src/environments/` - Environment configuration patterns

## 🏗️ Proje Yapısı

```text
src/
├── app/
│   ├── core/                    # Singleton servisler, guards, interceptors
│   │   ├── guards/              # Route guard'ları
│   │   ├── interceptors/        # HTTP interceptor'lar
│   │   └── index.ts            # Barrel export
│   ├── features/                # Feature-based modüller
│   │   └── user-management/     # Kullanıcı yönetimi feature'ı
│   │       ├── components/
│   │       │   ├── user-list/       # Kullanıcı listesi komponenti
│   │       │   └── user-detail/     # Kullanıcı detay komponenti
│   │       └── index.ts        # Feature barrel export
│   ├── models/                  # TypeScript interfaces ve types
│   │   ├── user.model.ts       # Kullanıcı veri modelleri
│   │   └── index.ts           # Model barrel export
│   ├── services/                # Application servisleri
│   │   ├── user.service.ts     # HTTP API servisi
│   │   └── index.ts           # Service barrel export
│   ├── shared/                  # Paylaşılan bileşenler
│   │   ├── components/
│   │   │   ├── autocomplete-select/     # Yeniden kullanılabilir select komponenti
│   │   │   ├── user-filter-toolbar/    # Filtreleme toolbar'ı
│   │   │   └── index.ts               # Component barrel export
│   │   ├── directives/         # Custom directive'lar
│   │   ├── pipes/             # Custom pipe'lar
│   │   └── index.ts          # Shared barrel export
│   ├── app.component.ts       # Ana (root) komponent
│   ├── app.component.html    # Ana komponent template'i
│   ├── app.component.css     # Ana komponent stilleri
│   ├── app.config.ts         # Uygulama konfigürasyonu
│   └── app.routes.ts         # Route tanımları
├── environments/              # Environment konfigürasyonları
│   ├── environment.ts        # Development environment
│   └── environment.prod.ts   # Production environment
└── main.ts                   # Uygulama giriş noktası
```

## ✨ Özellikler ve Öğreneceğiniz Konular

### 🔧 Modern Angular Özellikleri
- ✅ **Angular 20** - En güncel versiyon
- ✅ **Standalone Components** - Modül sistemi olmadan component geliştirme
- ✅ **inject() Function** - Modern dependency injection
- ✅ **Zoneless Change Detection** - Performans optimizasyonu
- ✅ **Signal API** - Reaktif state yönetimi (ready for future)

### 🏛️ Mimari Patterns
- ✅ **Feature-based Architecture** - Özellik tabanlı kod organizasyonu
- ✅ **Barrel Exports** - Temiz import/export yapısı
- ✅ **Service Layer Pattern** - İş mantığının servis katmanında yönetimi
- ✅ **Component Communication** - Parent-child component iletişimi

### 💾 Veri Yönetimi
- ✅ **HTTP Client** - REST API ile veri çekme
- ✅ **Observable Patterns** - RxJS ile asenkron veri akışı
- ✅ **TypeScript Models** - Tip güvenli veri modelleri
- ✅ **Error Handling** - Hata yönetimi best practice'leri

### 🎨 UI/UX Özellikleri  
- ✅ **Responsive Design** - Mobil uyumlu tasarım
- ✅ **Loading States** - Yükleme durumu yönetimi
- ✅ **Error States** - Hata durumu gösterimi
- ✅ **Custom Components** - Yeniden kullanılabilir UI bileşenleri
- ✅ **Filtering & Sorting** - Veri filtreleme ve sıralama
- ✅ **Pagination** - Sayfalama sistemi
- ✅ **Search Functionality** - Arama özelliği

### 🔍 Advanced Konular
- ✅ **ControlValueAccessor** - Custom form control geliştirme
- ✅ **ViewChild** - DOM element'lerine erişim  
- ✅ **Lifecycle Hooks** - Component yaşam döngüsü
- ✅ **Route Parameters** - URL parametrelerini okuma
- ✅ **Manual Change Detection** - Performance optimizasyonu

## 📋 Öğrenme Yol Haritası

### 1. Temel Kavramlar (Başlangıç)
1. `src/main.ts` - Uygulama nasıl başlatılır?
2. `src/app/app.config.ts` - Konfigürasyon nasıl yapılır?
3. `src/app/app.component.ts` - Component nedir?
4. `src/app/models/user.model.ts` - TypeScript interface'leri

### 2. Veri Yönetimi (Orta Seviye)
1. `src/app/services/user.service.ts` - HTTP client kullanımı
2. `src/environments/environment.ts` - Environment ayarları
3. `src/app/app.routes.ts` - Routing sistemi

### 3. Component Geliştirme (İleri Seviye)
1. `src/app/features/user-management/components/user-list/` - Kompleks component
2. `src/app/shared/components/autocomplete-select/` - Custom form control
3. `src/app/shared/components/user-filter-toolbar/` - Component communication

### 4. Architecture Patterns (Expert)
1. `*/index.ts` dosyaları - Barrel export pattern
2. `src/app/features/` yapısı - Feature-based architecture
3. `src/app/shared/` yapısı - Shared component patterns

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v18 veya üzeri)
- Angular CLI (`npm install -g @angular/cli`)

### Kurulum
```bash
# Projeyi klonlayın
git clone <repository-url>
cd angular-user-list-app

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
ng serve
```

### Kullanım
- Tarayıcıda `http://localhost:4200` adresine gidin
- Kullanıcı listesini görüntüleyin
- Filtreleme ve arama özelliklerini deneyin
- Bir kullanıcıya tıklayarak detay sayfasını görün

## 📖 Kod İnceleme Rehberi

### Her Dosyayı İncelerken Dikkat Edilecekler:

1. **Dosya başındaki açıklama bloğu** - Dosyanın amacı ve bağlamı
2. **Import statements** - Hangi Angular özellikleri kullanılıyor?
3. **Decorator'lar** - @Component, @Injectable, @Input, @Output vs.
4. **TypeScript tipleri** - Interface'ler, generics, union types
5. **Lifecycle metodlar** - ngOnInit, ngAfterViewInit vs.
6. **RxJS patterns** - Observable, subscribe, operators
7. **Template syntax** - Data binding, structural directives
8. **CSS patterns** - Grid, flexbox, responsive design

### Önerilen İnceleme Sırası:

1. **Temel yapıyı anlamak için:**
   - `src/main.ts`
   - `src/app/app.config.ts`
   - `src/app/app.component.ts`

2. **Veri modellerini öğrenmek için:**
   - `src/app/models/user.model.ts`
   - `src/environments/environment.ts`

3. **Servis katmanını anlamak için:**
   - `src/app/services/user.service.ts`

4. **Component'leri incelemek için:**
   - `src/app/features/user-management/components/user-list/user-list.component.ts`
   - `src/app/features/user-management/components/user-detail/user-detail.component.ts`
   - `src/app/shared/components/user-filter-toolbar/user-filter-toolbar.component.ts`
   - `src/app/shared/components/autocomplete-select/autocomplete-select.component.ts`

## 🤝 Katkıda Bulunma

Bu proje eğitim amaçlıdır. Katkılarınız memnuniyetle karşılanır:

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/new-feature`)
3. Değişikliklerinizi commit edin (`git commit -am 'Add new feature'`)
4. Branch'inizi push edin (`git push origin feature/new-feature`)
5. Pull Request oluşturun

## 📞 Destek

Sorularınız için:
- GitHub Issues kullanın
- Kod içindeki yorum satırlarını inceleyin
- Angular resmi dokümantasyonuna bakın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**Not:** Bu proje eğitim amaçlı olarak hazırlanmıştır ve gerçek ürün geliştirmesinde kullanılmadan önce security, performance ve production readiness açısından incelenmelidir.
