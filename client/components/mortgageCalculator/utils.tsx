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
  const monthlyRate = rate / 12;
  const numerator = (1 + rate / 12) ** (term * 12);
  const denominator = (1 + rate / 12) ** (term * 12) - 1;
  const newMortgageAmount =
    (loanAmount * monthlyRate * numerator) / denominator;
  return newMortgageAmount;
};

export { updateLoanAmount, calculateMortgage };
