import { useState, useEffect, useContext } from 'react';

import RatingSelect from './RatingSelect';
import Card from './shared/Card';
import Button from './shared/Button';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackForm = () => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      //setting rating here will not bring change in UI, coz it is in another component so look at the useEffect of RatingSelect.jsx
    }
  }, [feedbackEdit]);

  const handleTextChange = e => {
    // we want the validation to run whenever we type something.
    if (e.target.value === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if (e.target.value !== '' && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage('Review should contain atleast 10 characters');
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }

    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (text.trim().length > 10) {
      const feedback = {
        text,
        rating,
      };

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, feedback);
      } else {
        addFeedback(feedback);
      }

      setText('');
      setRating(10);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How woul you rate your service with us?</h2>
        <RatingSelect select={rating => setRating(rating)} />
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
