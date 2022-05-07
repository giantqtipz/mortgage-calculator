import React from 'react';
import { Intro, MortgageCalculator, PointsCalculator } from '../index';
import { MetricsProvider } from '../contextUtils';
import './main.scss';

interface Props {
  location: {
    search: string;
  };
}

const Main: React.FC<Props> = () => {
  return (
    <>
      <Intro />
      <MetricsProvider>
        <MortgageCalculator />
        <PointsCalculator />
      </MetricsProvider>
    </>
  );
};

export default Main;
