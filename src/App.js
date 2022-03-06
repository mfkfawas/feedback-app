import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutIconLink from './components/AboutIconLink';

import AboutPage from './pages/AboutPage';

import FeedbackData from './data/FeedbackData';

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

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
    <Router>
      <Header />
      <div className='container'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <>
                <FeedbackForm handleAdd={addFeedback} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList
                  feedback={feedback}
                  handleDelete={deleteFeedback}
                />
              </>
            }
          />

          <Route path='/about' element={<AboutPage />} />
        </Routes>

        <AboutIconLink />
      </div>
    </Router>
  );
}

export default App;
