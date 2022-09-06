import React, { useState } from 'react';
import { Intro, MortgageCalculator, MortgageComparisonSchedule, PointsCalculator } from '../index';
import { MetricsProvider } from '../contexts/metricsContext';
import './main.scss';

const Main: React.FC = () => {
  const[toggle, setToggle] = useState(false);

  const toggleComparisonSchedule = () => {
    setToggle(!toggle);
  }

  return (
    <>
      <Intro />
      <MetricsProvider>
        <MortgageCalculator />
        <PointsCalculator />
        <MortgageComparisonSchedule toggle={toggle}/>
      </MetricsProvider>
      <button onClick={toggleComparisonSchedule} type='button'>Compare</button>
    </>
  );
};

export default Main;
