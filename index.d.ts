export type CurrencyConfig = {
  /**
   * Singular form of the currency
   * @example Dollar
   */
  singular?: string;
  /**
   * Plural form of the currency
   * @example Dollars
   */
  plural?: string;
  /**
   * Singular form of the subunit
   * @example Cent
   */
  subunitSingular?: string;
  /**
   * Plural form of the subunit
   * @example Cents
   */
  subunitPlural?: string;
};

export interface CurrencyToWordsProps {
  /**
   * Value you want to convert in words
   * @example 12303 into  'TWELVE THOUSAND THREE HUNDRED AND THREE DOLLARS'
   */
  value: number;
  /**
   * suffix you want to add after the currency name in return statement
   * @example 'TWELVE THOUSAND THREE HUNDRED AND THREE DOLLARS ONLY'
   * ONLY is a suffix
   */
  suffix?: string | boolean;
  /**
   * return error if value is out of range
   * @default true
   */
  showError?: boolean;
  /**
   * This is to describe your currency
   */
  currencyConfig?: CurrencyConfig;
}

export function currencyToWords(
  props: CurrencyToWordsProps
): string | undefined;
