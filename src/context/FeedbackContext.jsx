import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is 1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This item is 2',
      rating: 7,
    },
    {
      id: 3,
      text: 'This item is 3',
      rating: 9,
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {}, //whichever item we're editing.
    edit: false, //when we click on edit button on feedbackItem, it is set to true(edit mode).
  });

  //Set item to be updated
  const editFeedback = item => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const updateFeedback = (id, updItem) => {
    setFeedback(prevFeedback =>
      prevFeedback.map(item =>
        item.id === id ? { ...item, ...updItem } : item
      )
    );
  };

  const deleteFeedback = id => {
    if (
      window.confirm('Are you sure you want to delete this feedback?')
    )
      setFeedback(feedback.filter(item => item.id !== id));
  };

  const addFeedback = newFeedback => {
    newFeedback.id = uuidv4();
    //the state is immutable so we cant push to it, we have to make a copy.
    //Rem whenever state updation depends on prev state use callback form.
    setFeedback(prevFeedback => [newFeedback, ...prevFeedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
