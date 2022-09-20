import { Link } from 'react-router-dom';
import { IMAGE_URL_RES } from '../../config';

const SingleShow = props => {
  return (
    <Link to={`${props.id}`}>
      <li>
        <img src={IMAGE_URL_RES + props.image} alt={props.name} />
        <p>{props.name}</p>
      </li>
    </Link>
  );
};

export default SingleShow;
