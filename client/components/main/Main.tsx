import React from 'react';
import './main.scss';

interface Props {
  location: {
    search: string;
  };
}

const Main: React.FC<Props> = () => {
  return (
    <>
      <h1>Im alive!</h1>
    </>
  );
};

export default Main;
