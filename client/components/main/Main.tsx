import React from 'react';
import { Intro, Calculator } from '../index';
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
      <Calculator />
    </>
  );
};

export default Main;
