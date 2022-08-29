import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';
import './mortgageCalculator.scss';
import { getLoanAmount, calculateMortgage } from '../utils';
import { MetricsContext } from '../contextUtils';
// import downloadFile  from '../../../server/api/utils/excel';

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
  } = useContext(MetricsContext);

  const [mortgageTotal, setMortgageTotal] = useState<number>(0);

  // Stores previous mortgage total without creating a new state; therefore avoiding a re-render
  const prevMortgageTotal = useRef<number>(0);

  // Avoid recalculating mortgage if loanAmount, term, and rate do not change
  const memoizedMortgageTotal = useMemo(() => {
    return calculateMortgage(loanAmount, rate, term);
  }, [loanAmount, term, rate]);

  // const download = () => {
  //   downloadFile();
  // };

  // const test = async () => {
  //   const data = await axios.post('/api/rates', {data: 'obama'});
  //   // console.log(data);
  //   return data;
  // };

  useEffect(() => {
    setLoanAmount(getLoanAmount(purchasePrice, downPayment));
  }, [purchasePrice, downPayment]);

  // Populates mortgage total at initial render
  useEffect(() => {
    setMortgageTotal(calculateMortgage(loanAmount, rate, term));
  }, []);

  return (
    <>
      <h4>Calculate Your Mortgage</h4>
      <form
        id="mortgage-calculator"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          // Stores current mortgage total in useRef, before calculating the new mortgage total
          setMortgageTotal((prevMortgage: number): number => {
            if (prevMortgage !== memoizedMortgageTotal)
              prevMortgageTotal.current = prevMortgage;
            return memoizedMortgageTotal;
          });
        }}
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
            min="0.01"
            onChange={(e) => setRate(e.target.valueAsNumber)}
            value={rate}
          />
        </label>
        <button type="submit">Calculate Mortgage</button>
      </form>
      <div className="mortgage">
        <h5>Total Monthly Mortgage</h5>
        <p>{`$ ${mortgageTotal}`}</p>
        {/* <p>{`$ ${prevMortgageTotal.current}`}</p> */}
      </div>
      {/* <button onClick={test} type="button">
        Download
      </button> */}
    </>
  );
};

export default MortgageCalculator;
