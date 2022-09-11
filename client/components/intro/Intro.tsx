import React, { useState } from 'react';

import './intro.scss';

const Intro: React.FC = () => {
  const [toggle, setToggle] = useState(true);

  const toggleIntro = () => {
    setToggle(!toggle);
  }

  return toggle === false ? null : (
    <div className='intro-container'>
      <div className='intro-content' >
        <img src='./assets/intro-image.png' />
        <h2>Mortgage Calculator</h2>
        <h3>Mortgage education &amp; calculation for</h3>
        <h3>first time homebuyers</h3>
        <div className='intro-buttons'>
          <button className="intro-tutorial" role="button" type="submit">Take the Tutorial</button>
          <button className="intro-tutorial-skip" onClick={toggleIntro} type="submit">I know what to do</button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
