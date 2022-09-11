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
    <div className='container'>
      <Intro />
      <h1>Mortgage Calculator</h1>
      <MetricsProvider>
        <MortgageCalculator />
        <PointsCalculator />
        <MortgageComparisonSchedule toggle={toggle}/>
        <button onClick={toggleComparisonSchedule} type='button'>Compare</button>
      </MetricsProvider>
    </div>
  );
};

export default Main;
