export const formatToBrazilianCurrency = (value: string | number): string => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    return "RS 0,00";
  }

  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
};
