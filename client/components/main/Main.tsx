import React from 'react';
import { Intro, MortgageCalculator } from '../index';
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
      <MortgageCalculator />
    </>
  );
};

export default Main;
