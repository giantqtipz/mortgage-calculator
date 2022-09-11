const { calculateLoanAmount, calculateMortgage, calculatePoints } = require('../client/components/utils/utils');

describe('Properly calculates utility functions', () => {
    const purchasePrice: number = 269000;
    const downPayment: number = 30;

    const rate: number = .0375;
    const term: number = 30;

    const loanAmount: number = calculateLoanAmount(purchasePrice, downPayment);
    const points: number = 1.5
    const rateWithPoints: number = (rate * 100 - points * 0.25) / 100;

    const mortgage: number = +calculateMortgage(loanAmount, rate, term).toFixed(2);

    test('Calculate loan amount correctly', () => {
        expect(loanAmount).toBe(188300)
    })

    test('Calculate points correctly', () => {        
        expect(calculatePoints(loanAmount, points)).toBe(2824.5)
    })

    test('Calculate monthly mortgage correctly', () => {
        expect(mortgage).toBe(872.05)
    })

    test('Calculate monthly mortgage with points correctly', () => {
        expect(+calculateMortgage(loanAmount, rateWithPoints, term).toFixed(2)).toBe(832.47)
    })
});
