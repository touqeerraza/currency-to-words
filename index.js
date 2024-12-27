exports.currencyToWords = ({ value, suffix = "ONLY", currencyConfig }) => {
  const fraction = Math.round(frac(value) * 100);
  let fractionText = "";

  const { singular, plural, subunitSingular, subunitPlural } = currencyConfig;

  const mainUnit = value === 1 ? singular ?? "" : plural ?? "";

  if (fraction > 0) {
    const subunit =
      fraction === 1 ? subunitSingular ?? "" : subunitPlural ?? "";
    if (subunit) {
      fractionText = ` AND ${convertNumber(fraction)} ${subunit}`;
    } else {
      fractionText = ` AND ${convertNumber(fraction)}`;
    }
  }
  let words = "";
  if (mainUnit) {
    words = `${convertNumber(value)} ${mainUnit}${fractionText}`;
  } else {
    words = `${convertNumber(value)}${fractionText}`;
  }
  return suffix ? `${words} ${suffix === true ? "ONLY" : suffix}` : words;
};

function frac(f) {
  return f % 1;
}

function convertNumber(number) {
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
