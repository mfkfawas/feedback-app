import { FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AboutIconLink() {
  return (
    <div className='about-link'>
      {/* The problem of using HTML <a> is it is basically doing a reresh of the page & we dont want that.*/}
      {/* We want it to be all done just immediately on the client side without having to actually refresh. */}
      {/* <a> is fine when you're linking off-site(going to some other website) but any for internal links use <Link>    */}

      <Link to='/about'>
        <FaQuestion size={30} />
      </Link>
    </div>
  );
}

export default AboutIconLink;
