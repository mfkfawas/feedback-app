import { createContext, useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {}, //whichever item we're editing.
    edit: false, //when we click on edit button on feedbackItem, it is set to true(edit mode).
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  //Fetch feedback
  const fetchFeedback = async feedback => {
    const response = await fetch('/feedback?_sort=id&_order=desc');

    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  //Set item to be updated
  const editFeedback = item => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();

    setFeedback(prevFeedback =>
      prevFeedback.map(item =>
        item.id === id ? { ...item, ...data } : item
      )
    );
  };

  const deleteFeedback = async id => {
    if (
      window.confirm('Are you sure you want to delete this feedback?')
    ) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' });

      setFeedback(feedback.filter(item => item.id !== id));
    }
  };

  const addFeedback = async newFeedback => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    // newFeedback.id = uuidv4();
    //the state is immutable so we cant push to it, we have to make a copy.
    //Rem whenever state updation depends on prev state use callback form.
    setFeedback(prevFeedback => [data, ...prevFeedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
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
