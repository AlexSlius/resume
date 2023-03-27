// Libraries
import classnames from 'classnames';

// Styles
import { useEffect, useState } from 'react';
import style from './Style.module.scss';

export const SureItem = ({ photo, name, text }) => {

  return (
    <li className={style.sureItem}>
      <img className={style.photo} src={photo} alt={'photo'} />
      <strong className={style.name}>{name}</strong>
      <p className={style.text}>{text}</p>
    </li>
  );
}