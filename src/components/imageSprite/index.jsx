// Libraries
import classnames from 'classnames';

// Styles
import { useEffect, useState } from 'react';
import style from './Style.module.scss';

export const ImageSprite = ({ iconName, width, height }) => {
  const [heightBlock, setHeightBlock] = useState();
  const [widthBlock, setWeightBlock] = useState();

  useEffect(() => {
    setHeightBlock(height);
    setWeightBlock(width);
  }, []);

  return (
    <span className={classnames(style.imageSprite, style[iconName])} style={{ width: widthBlock, height: heightBlock }}></span>
  );
}