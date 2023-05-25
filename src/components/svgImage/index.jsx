import Sprite from '../../../public/images/sprite.svg';

export const SvgImage = ({ image, width, height, color, onClick }) => {
  return (
    <svg className={`${onClick ? 'clicked' : ''}`} width={width} height={height} color={color} onClick={onClick}>
      <use href={Sprite + `#${image}`} />
    </svg>
    )
}