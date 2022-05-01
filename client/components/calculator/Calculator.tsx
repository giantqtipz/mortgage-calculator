import React, { useEffect, useState } from 'react';
import './calculator.scss';
import { updateLoanAmount, calculateMortgage } from './utils';

const Calculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState(269000);
  const [downPayment, setDownPayment] = useState(30);
  const [loanAmount, setLoanAmount] = useState(0);
  const [term, setTerm] = useState(30);
  const [rate, setRate] = useState(0.0375);

  const [mortgageAmount, setMortgageAmount] = useState(0);

  useEffect(() => {
    updateLoanAmount(purchasePrice, downPayment, setLoanAmount);
  }, [purchasePrice, downPayment]);
  return (
    <>
      <h4>Calculate Your Mortgage</h4>
      <form
        id="mortgage-calculator"
        onSubmit={(e: React.FormEvent) =>
          calculateMortgage(e, loanAmount, rate, term, setMortgageAmount)
        }
      >
        <label htmlFor="purchase-price">
          <input
            type="number"
            min="10000"
            step="1000"
            name="purchase-price"
            onChange={(e) => setPurchasePrice(e.target.valueAsNumber)}
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
            onChange={(e) => setDownPayment(e.target.valueAsNumber)}
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
            onChange={(e) => setTerm(e.target.valueAsNumber)}
            value={term}
          />
        </label>
        <label htmlFor="rate">
          <input
            type="number"
            name="rate"
            onChange={(e) => setRate(e.target.valueAsNumber)}
            value={rate}
          />
        </label>
        <button type="submit">Calculate Mortgage</button>
      </form>
      <div className="mortgage">
        <h5>Total Monthly Mortgage</h5>
        <p>{`$ ${mortgageAmount}`}</p>
      </div>
    </>
  );
};

export default Calculator;
