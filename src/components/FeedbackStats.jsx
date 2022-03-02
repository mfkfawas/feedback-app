import PropTypes from 'prop-types';

const FeedbackStats = ({ feedback }) => {
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

FeedbackStats.propTypes = {
  feedback: PropTypes.array.isRequired,
};

export default FeedbackStats;
