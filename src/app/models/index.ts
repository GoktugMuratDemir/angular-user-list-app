/**
 * MODELS BARREL EXPORT (MODELLER İÇİN TOPLU EXPORT)
 *
 * Bu dosya "barrel export" pattern'ini kullanır.
 * Barrel export nedir?
 * - Bir klasördeki tüm export'ları tek bir noktadan toplayan pattern
 * - Import statement'ları basitleştirir
 * - Kodun daha düzenli ve okunabilir olmasını sağlar
 *
 * Bu pattern sayesinde:
 *
 * Şu şekilde import yapmak yerine:
 * import { User } from './models/user.model';
 * import { Address } from './models/user.model';
 * import { Company } from './models/user.model';
 *
 * Bu şekilde tek satırda import yapabilirsiniz:
 * import { User, Address, Company } from './models';
 *
 * export * from: Belirtilen dosyadaki tüm export'ları re-export eder
 */

export * from './user.model';
