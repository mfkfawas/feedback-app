import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../components/shared/Card';

const AboutPage = () => {
  return (
    <Card>
      <div className='about'>
        <h1>About this Project</h1>
        <p>This is a React app to leave feedback for the product.</p>
        <p>Version: 1.0.0</p>

        <p>
          <Link to='/'>Back To Home</Link>
        </p>
      </div>
    </Card>
  );
};

export default AboutPage;
