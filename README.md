# Angular User List App

Bu proje Angular 20 ile geliştirilmiş modern bir kullanıcı listesi uygulamasıdır. Güncel Angular folder structure yapısını takip eder.

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

## ✨ Özellikler

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
