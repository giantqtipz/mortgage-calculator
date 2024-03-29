import React, { useContext, useEffect, useMemo } from 'react';
import { calculateLoanAmount, calculateMortgage } from '../utils/utils';
import { MetricsContext } from '../contexts/metricsContext';
import './mortgageCalculator.scss';

const MortgageCalculator: React.FC = () => {
  const {
    purchasePrice,
    setPurchasePrice,
    downPayment,
    setDownPayment,
    loanAmount,
    setLoanAmount,
    term,
    setTerm,
    rate,
    setRate,
    mortgageTotal,
    setMortgageTotal
  } = useContext(MetricsContext);

  // Avoid recalculating mortgage if loanAmount, term, and rate do not change
  const memoizedMortgageTotal = useMemo(() => {
    return calculateMortgage(loanAmount, rate, term);
  }, [loanAmount, term, rate]);

  useEffect(() => {
    setLoanAmount?.(calculateLoanAmount(purchasePrice, downPayment));
  }, [purchasePrice, downPayment]);

  // Populates mortgage total at initial render
  useEffect(() => {
    setMortgageTotal?.(calculateMortgage(loanAmount, rate, term));
  }, []);
  return (
    <>
      <h4>Calculate Your Mortgage</h4>
      <form
        id="mortgage-calculator"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          // Stores current mortgage total in useRef, before calculating the new mortgage total
          setMortgageTotal?.(memoizedMortgageTotal)
        }}
      >
        <label htmlFor="purchase-price">
          <input
            type="number"
            min="10000"
            step="1000"
            name="purchase-price"
            onChange={(e) => setPurchasePrice?.(e.target.valueAsNumber)}
            value={purchasePrice}
          />
        </label>
        <label htmlFor="down-payment">
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            name="down-payment"
            onChange={(e) => setDownPayment?.(e.target.valueAsNumber)}
            value={downPayment}
          />
        </label>
        <div className="loan-amount">
          <h5>Loan Amount</h5>
          <p>{`$ ${loanAmount}`}</p>
        </div>
        <label htmlFor="term">
          <input
            type="number"
            min="1"
            max="30"
            step="1"
            name="term"
            onChange={(e) => setTerm?.(e.target.valueAsNumber)}
            value={term}
          />
        </label>
        <label htmlFor="rate">
          <input
            type="number"
            name="rate"
            min="0.01"
            onChange={(e) => setRate?.(e.target.valueAsNumber)}
            value={rate}
          />
        </label>
        <button type="submit">Calculate Mortgage</button>
      </form>
      <div className="mortgage">
        <h5>Total Monthly Mortgage</h5>
        <p>{`$ ${mortgageTotal}`}</p>
      </div>
    </>
  );
};

export default MortgageCalculator;
