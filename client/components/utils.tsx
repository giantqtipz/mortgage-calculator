const updateLoanAmount = (
  purchasePrice: number,
  downPayment: number
): number => {
  const newLoanAmount = purchasePrice - (purchasePrice * downPayment) / 100;
  return newLoanAmount;
};

const calculateMortgage = (
  loanAmount: number,
  rate: number,
  term: number
): number => {
  console.log(loanAmount, rate, term);
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

export { updateLoanAmount, calculateMortgage, calculatePoints };
