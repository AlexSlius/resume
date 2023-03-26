// Libraries
import classnames from 'classnames';

// Components
import { ImageSprite } from '../imageSprite';

// Styles
import style from './Style.module.scss';

export const AdvantagesItem = ({ image, width, height, title, text }) => {

  return (
    <li className={style.advantagesBlock}>
      <div className={style.imageBlock}>
        <ImageSprite iconName={image} width={width} height={height} />
      </div>

      <strong>{title}</strong>
      <p>{text}</p>
    </li>
  );
}