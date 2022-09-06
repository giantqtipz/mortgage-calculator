const calculateLoanAmount = (
  purchasePrice: number,
  downPayment: number
): number => {
  const calculateLoanAmount = purchasePrice - (purchasePrice * downPayment) / 100;
  return calculateLoanAmount;
};

const calculateMortgage = (
  loanAmount: number,
  rate: number,
  term: number
): number => {
  const monthlyRate = rate / 12;
  const numerator = (1 + rate / 12) ** (term * 12);
  const denominator = (1 + rate / 12) ** (term * 12) - 1;
  const newMortgageAmount =
    (loanAmount * monthlyRate * numerator) / denominator;
  return newMortgageAmount;
};

const calculatePoints = (loanAmount: number, points: number): number => {
  return loanAmount * 0.01 * points;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
});

export { calculateLoanAmount, calculateMortgage, calculatePoints, currencyFormatter };
