declare function calculateLoanAmount(
    purchasePrice: number,
    downPayment: number
);
  
declare function calculateMortgage(
    loanAmount: number,
    rate: number,
    term: number
);
  
declare function calculatePoints(
    loanAmount: number, 
    points: number
);
  
export { calculateLoanAmount, calculateMortgage, calculatePoints };
  