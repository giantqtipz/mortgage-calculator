import React from 'react';
import './intro.scss';

const Intro: React.FC = () => {
  return (
    <>
      <h1>Friendly Mortgage Calculator</h1>
      <h2>
        A beginner friendly app to help you quickly estimate your monthly
        mortgage
      </h2>
      <h2>If you&apos;re a first time homebuyer, you are in the right place</h2>
      <button type="submit">Let&apos;s Go!</button>
      <button type="submit">Skip Tutorial</button>
    </>
  );
};

export default Intro;
