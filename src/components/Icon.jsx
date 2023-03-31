const Icon = ({ svg, symbolId = "", classNames = [] }) => {

  return symbolId ? (
    <svg>
      <use xlinkHref={`#${svg.id}_${symbolId}`} />
    </svg>
  ) : (
    <svg viewBox={svg.viewBox}>
      <use xlinkHref={`#${svg.id}`} />
    </svg>
  );
};

export default Icon;
