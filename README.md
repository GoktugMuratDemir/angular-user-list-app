# Angular User List App

Bu proje Angular 20 ile geliştirilmiş modern bir kullanıcı listesi uygulamasıdır. **Yeni Angular öğrenenler için kapsamlı Türkçe dokümantasyon içerir.**

## 🌐 Canlı Demo

**Canlı uygulamayı görüntülemek için:** [https://angular-user-list-app.vercel.app/](https://angular-user-list-app.vercel.app/)

## 📚 Dokümantasyon

Bu proje özel olarak Angular öğrenmek isteyenler için hazırlanmıştır:

- **Her dosyada detaylı Türkçe açıklamalar** - Angular konseptlerinin açıklaması
- **Modern Angular patterns** - Standalone components, inject(), signals
- **Best practices** - Clean code, architecture patterns, type safety
- **Kapsamlı kod yorumları** - Her satırın ne yaptığının açıklaması

👉 **[DOCUMENTATION.md](./DOCUMENTATION.md) dosyasını okuyarak başlayın!**

## 🚀 Hızlı Başlangıç

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
ng serve
```

Tarayıcıda `http://localhost:4200` adresine gidin.

## 📖 Öğrenme Rehberi

1. **İlk olarak** - `DOCUMENTATION.md` dosyasını okuyun
2. **Başlangıç için** - `src/main.ts` ve `src/app/app.config.ts` dosyalarını inceleyin
3. **Component'ler için** - `src/app/features/` klasörüne bakın
4. **Advanced konular için** - `src/app/shared/components/` klasörünü inceleyin

## ✨ Özellikler

- ✅ Angular 20 Standalone Components
- ✅ Kapsamlı Türkçe dokümantasyon
- ✅ Modern Angular patterns
- ✅ TypeScript best practices
- ✅ RxJS Observable patterns
- ✅ Responsive design
- ✅ Feature-based architecture

## 🏗️ Proje Yapısı

```text
src/
├── app/
│   ├── core/                    # Singleton servisler, guards, interceptors
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── index.ts
│   ├── features/                # Feature modülleri
│   │   └── user-management/
│   │       ├── components/
│   │       │   ├── user-list/
│   │       │   └── user-detail/
│   │       └── index.ts
│   ├── models/                  # TypeScript interfaces ve types
│   │   ├── user.model.ts
│   │   └── index.ts
│   ├── services/                # Application servisler
│   │   ├── user.service.ts
│   │   └── index.ts
│   ├── shared/                  # Paylaşılan componentler, direktifler, pipes
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── index.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.component.spec.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── environments/                # Environment konfigürasyonları
│   ├── environment.ts
│   └── environment.prod.ts
└── ...
```

## 🛠️ Teknik Özellikler

- ✅ Angular 20 Standalone Components
- ✅ Güncel folder structure
- ✅ Barrel exports (index.ts)
- ✅ Feature-based organizasyon
- ✅ Environment konfigurasyonu
- ✅ TypeScript strict mode
- ✅ Responsive tasarım

## 🚀 Geliştirme Sunucusu

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
