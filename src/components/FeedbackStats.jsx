import { useContext } from 'react';

import FeedbackContext from '../context/FeedbackContext';

const FeedbackStats = () => {
  const { feedback } = useContext(FeedbackContext);

  //Calculate Ratings
  let average = feedback.reduce((acc, cur) => {
    return acc + cur.rating / feedback.length;
  }, 0);

  //Take off if there is trailing zeroes, like 8.0.
  average = average.toFixed(1).replace(/[.,]0$/, '');

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  );
};

export default FeedbackStats;
