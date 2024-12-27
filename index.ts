type CurrencyConfig = {
  singular: string; // Singular form of the currency (e.g., Dollar, Euro)
  plural: string; // Plural form of the currency (e.g., Dollars, Euros)
  subunitSingular: string; // Singular form of the subunit (e.g., Cent, Pence)
  subunitPlural: string; // Plural form of the subunit (e.g., Cents, Pence)
};

export default function currencyToWords({
  value,
  suffix = "ONLY",
  currencyConfig,
}: {
  value?: number;
  suffix?: string | boolean;
  currencyConfig: CurrencyConfig;
}): string | undefined {
  if (!value) return undefined;
  const fraction = Math.round(frac(value) * 100);
  let fractionText = "";

  const { singular, plural, subunitSingular, subunitPlural } = currencyConfig;

  const mainUnit = value === 1 ? singular : plural;

  if (fraction > 0) {
    const subunit = fraction === 1 ? subunitSingular : subunitPlural;
    fractionText = ` AND ${convertNumber(fraction)} ${subunit}`;
  }

  const words = `${convertNumber(value)} ${mainUnit}${fractionText}`;
  return suffix ? `${words} ${suffix === true ? "ONLY" : suffix}` : words;
}

function frac(f: number): number {
  return f % 1;
}

function convertNumber(number: number): string {
  if (number < 0 || number > 999999999) {
    return "NUMBER OUT OF RANGE!";
  }

  const Gn = Math.floor(number / 10000000); // Crore
  number -= Gn * 10000000;
  const kn = Math.floor(number / 100000); // Lac
  number -= kn * 100000;
  const Hn = Math.floor(number / 1000); // Thousand
  number -= Hn * 1000;
  const Dn = Math.floor(number / 100); // Hundreds
  number = number % 100; // Remaining
  const tn = Math.floor(number / 10);
  const one = Math.floor(number % 10);
  let res = "";

  if (Gn > 0) res += `${convertNumber(Gn)} CRORE`;
  if (kn > 0) res += `${res ? " " : ""}${convertNumber(kn)} LAC`;
  if (Hn > 0) res += `${res ? " " : ""}${convertNumber(Hn)} THOUSAND`;
  if (Dn) res += `${res ? " " : ""}${convertNumber(Dn)} HUNDRED`;

  const ones = [
    "",
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
    "ELEVEN",
    "TWELVE",
    "THIRTEEN",
    "FOURTEEN",
    "FIFTEEN",
    "SIXTEEN",
    "SEVENTEEN",
    "EIGHTEEN",
    "NINETEEN",
  ];
  const tens = [
    "",
    "",
    "TWENTY",
    "THIRTY",
    "FORTY",
    "FIFTY",
    "SIXTY",
    "SEVENTY",
    "EIGHTY",
    "NINETY",
  ];

  if (tn > 0 || one > 0) {
    if (res) res += " AND ";
    if (tn < 2) res += ones[tn * 10 + one];
    else {
      res += tens[tn];
      if (one > 0) res += `-${ones[one]}`;
    }
  }
  return res || "ZERO";
}
