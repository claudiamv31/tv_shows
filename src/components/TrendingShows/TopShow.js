import { IMAGE_URL_RES } from '../../config';

const TopShow = props => {
  return (
    <div>
      <div>
        <a href={props.id}>
          <img src={IMAGE_URL_RES + props.image} alt={props.name} />
        </a>
      </div>
      <div>
        <h3>{props.name}</h3>
        <p>
          <span>Score: </span>
          {props.score}
        </p>
      </div>
    </div>
  );
};

export default TopShow;
