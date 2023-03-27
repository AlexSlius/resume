// Libraries
import classnames from 'classnames';

// Styles
import style from './Style.module.scss';

export const PromoNumbers = ({ count, firstText, secondText, image, percent }) => {

  return (
    <div className={style.promoNumItem}>
        <h2>{count}{percent ? <span className={style.percent}>%</span> : ''}</h2>
        {image ? <img src={image} alt="img" /> : null}
        <p>
            <span>{firstText}</span>
            <span>{secondText}</span>
        </p>
    </div>
  );
}