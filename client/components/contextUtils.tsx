import React, { createContext, useState } from 'react';
import { getLoanAmount } from './utils';

// Create context for purchasePrice, downPayment, loanAmount, term, rate, mortgageTotal
// so they are accessible to the PointsCalculator component

interface Metrics {
  purchasePrice: number;
  setPurchasePrice: (arg: number) => void;
  downPayment: number;
  setDownPayment: (arg: number) => void;
  loanAmount: number;
  setLoanAmount: (arg: number) => void;
  term: number;
  setTerm: (arg: number) => void;
  rate: number;
  setRate: (arg: number) => void;
  mortgageTotal: number;
  setMortgageTotal: (arg: number) => void;
}

const MetricsContext = createContext<Metrics>({} as Metrics);

const MetricsProvider: React.FC = ({ children }) => {
  const [purchasePrice, setPurchasePrice] = useState<number>(269000);
  const [downPayment, setDownPayment] = useState<number>(30);
  const [loanAmount, setLoanAmount] = useState<number>(
    getLoanAmount(purchasePrice, downPayment)
  );
  const [term, setTerm] = useState<number>(30);
  const [rate, setRate] = useState<number>(0.0375);

  const [mortgageTotal, setMortgageTotal] = useState<number>(0);

  return (
    <MetricsContext.Provider
      value={{
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
        setMortgageTotal,
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

export { MetricsContext, MetricsProvider };
