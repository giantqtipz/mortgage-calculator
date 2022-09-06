import React, { useContext, useMemo, useState, useEffect } from 'react';
import { MetricsContext } from '../contexts/metricsContext';
import { calculatePoints, calculateMortgage } from '../utils';
import './pointsCalculator.scss';

const PointsCalculator: React.FC = () => {
  const {
    purchasePrice,
    downPayment,
    loanAmount,
    term,
    rate,
    mortgageTotal,

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
  } = useContext(MetricsContext);

  // Avoid recalculating mortgage if loanAmount, term, and rate do not change
  const memoizedMortgageTotalWithPoints = useMemo(() => {
    return calculateMortgage(
      loanAmount,
      pointsRate <= 0 ? rate : pointsRate / 100,
      term
    );
  }, [points, loanAmount, term, pointsRate, rate, mortgageTotal]);

  useEffect(() => {
    setPointsCost?.(calculatePoints(loanAmount, points));
  }, [points, pointsPercent]);

  useEffect(() => {
    setPointsWithDownPayment?.((purchasePrice * downPayment) / 100 + pointsCost);
  }, [pointsCost]);

  useEffect(() => {
    setMortgageTotalWithPoints?.(mortgageTotal);
  }, []);
  return (
    <>
      <h4>Discount Points Calculator</h4>
      <form
        id="points-calculator"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          // Stores current mortgage total in useRef, before calculating the new mortgage total
          setMortgageTotalWithPoints?.(memoizedMortgageTotalWithPoints)
        }}
      >
        <label htmlFor="points">
          <input
            type="number"
            min="0"
            max="5"
            step=".50"
            name="points"
            onChange={(e) => {
              setPoints?.(e.target.valueAsNumber);
              setPointsPercent?.(e.target.valueAsNumber * 0.25);
              setPointsRate?.(rate * 100 - e.target.valueAsNumber * 0.25);
            }}
            value={points}
          />
        </label>
        <div className="points-percent">
          <h5>Points Percent</h5>
          <p>{`${pointsPercent}%`}</p>
        </div>
        <div className="points-interest-rate">
          <h5>Interest Rate with Points</h5>
          <p>{`${pointsRate}%`}</p>
        </div>
        <div className="points-cost">
          <h5>Points Cost</h5>
          <p>{`$ ${pointsCost}`}</p>
        </div>
        <div className="mortgage mortgage-with-points">
          <h5>Downpayment with Points</h5>
          <p>{`$ ${pointsWithDownPayment}`}</p>
        </div>
        <button type="submit">Calculate Mortgage</button>
      </form>
      <div className="mortgage mortgage-with-points">
        <h5>Total Monthly Mortgage with Points</h5>
        <p>{`$ ${mortgageTotalWithPoints}`}</p>
      </div>
    </>
  );
};

export default PointsCalculator;
