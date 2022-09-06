import React, { createContext, useState } from 'react';
import { calculateLoanAmount } from '../utils';

// Create context for purchasePrice, downPayment, loanAmount, term, rate, mortgageTotal
// so they are accessible to other components such as the PointsCalculator component

interface Metrics {
  purchasePrice: number;
  setPurchasePrice?: (arg: number) => void;
  downPayment: number;
  setDownPayment?: (arg: number) => void;
  loanAmount: number;
  setLoanAmount?: (arg: number) => void;
  term: number;
  setTerm?: (arg: number) => void;
  rate: number;
  setRate?: (arg: number) => void;
  mortgageTotal: number;
  setMortgageTotal?: (arg: number) => void;

  points: number;
  setPoints?: (arg: number) => void;
  pointsPercent: number;
  setPointsPercent?: (arg: number) => void;
  pointsRate: number;
  setPointsRate?: (arg: number) => void;
  pointsCost: number;
  setPointsCost?: (arg: number) => void;
  pointsWithDownPayment: number;
  setPointsWithDownPayment?: (arg: number) => void;
  mortgageTotalWithPoints: number;
  setMortgageTotalWithPoints?: (arg: number) => void;
}

const MetricsContext = createContext<Metrics>({} as Metrics);

const MetricsProvider: React.FC = ({ children }) => {
  const [purchasePrice, setPurchasePrice] = useState<number>(269000);
  const [downPayment, setDownPayment] = useState<number>(30);
  const [loanAmount, setLoanAmount] = useState<number>(
    calculateLoanAmount(purchasePrice, downPayment)
  );
  const [term, setTerm] = useState<number>(30);
  const [rate, setRate] = useState<number>(0.0375);

  const [mortgageTotal, setMortgageTotal] = useState<number>(0);

  const [points, setPoints] = useState<number>(0);
  const [pointsPercent, setPointsPercent] = useState<number>(0);
  const [pointsRate, setPointsRate] = useState<number>(0);
  const [pointsCost, setPointsCost] = useState<number>(0);
  const [pointsWithDownPayment, setPointsWithDownPayment] = useState<number>(
    (purchasePrice * downPayment) / 100 + pointsCost
  );

  const [mortgageTotalWithPoints, setMortgageTotalWithPoints] = useState<
    number
  >(mortgageTotal);

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

        points,
        setPoints,
        pointsPercent,
        setPointsPercent,
        pointsRate,
        setPointsRate,
        pointsCost,
        setPointsCost,
        pointsWithDownPayment,
        setPointsWithDownPayment,
        mortgageTotalWithPoints,
        setMortgageTotalWithPoints,
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

export { Metrics, MetricsContext, MetricsProvider };
