const Icon = ({
  svg = null,
  symbolId = "",
  classNames = []
}) => {
  return symbolId ? (
    <svg className={classNames.join(" ")}>
      <use xlinkHref={`#${svg.id}_${symbolId}`} />
    </svg>
  ) : (
    <svg viewBox={svg.viewBox} className={classNames.join(" ")}>
      <use xlinkHref={`#${svg.id}`} />
    </svg>
  );
};

export default Icon;
