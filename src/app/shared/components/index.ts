/**
 * SHARED COMPONENTS BARREL EXPORT (PAYLAŞILAN KOMPONENTLER İÇİN TOPLU EXPORT)
 *
 * Bu dosya shared/components klasöründeki tüm component'leri toplu olarak export eder.
 * Shared components nedir?
 * - Uygulamanın farklı yerlerinde kullanılabilen yeniden kullanılabilir componentler
 * - UI kitinin temel taşları
 * - Business logic içermez, sadece görsel ve etkileşim odaklıdır
 *
 * Bu barrel export sayesinde:
 * import { UserFilterToolbarComponent, AutocompleteSelectComponent } from './shared';
 *
 * Şeklinde kısa ve temiz import yapılabilir.
 */

export * from './user-filter-toolbar/user-filter-toolbar.component';
export * from './autocomplete-select/autocomplete-select.component';
