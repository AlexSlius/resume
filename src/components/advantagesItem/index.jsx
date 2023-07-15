// Libraries
import classnames from 'classnames';

// Components
import { ImageSprite } from '../imageSprite';

// Styles
import style from './Style.module.scss';

export const AdvantagesItem = ({ image, title, text }) => {

  return (
    <li className={style.advantagesBlock}>
      <div className={style.imageBlock}>
        <img src={image} alt="icon" />
      </div>

      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </li>
  );
}