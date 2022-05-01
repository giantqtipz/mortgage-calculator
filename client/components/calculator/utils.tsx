const updateLoanAmount = (
  purchasePrice: number,
  downPayment: number,
  callback: (newLoanAmount: number) => void
): void => {
  const newLoanAmount = purchasePrice - (purchasePrice * downPayment) / 100;
  callback(newLoanAmount);
};
const calculateMortgage = (
  e: any,
  loanAmount: number,
  rate: number,
  term: number,
  callback: (newMortgageAmount: number) => void
): void => {
  e.preventDefault();
  const monthlyRate = rate / 12;
  const numerator = (1 + rate / 12) ** (term * 12);
  const denominator = (1 + rate / 12) ** (term * 12) - 1;
  const newMortgageAmount =
    (loanAmount * monthlyRate * numerator) / denominator;
  callback(newMortgageAmount);
};

export { updateLoanAmount, calculateMortgage };
