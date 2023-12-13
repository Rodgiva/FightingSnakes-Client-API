const Snake = (props) => {
  const snakeClass =
    props.status === "challenged" ? "challengerSnake" : "challengedSnake";
  const step = props.step;
  return (
    <>
      {props.segments.map((segment, i) => {
        const coord = {
          top: `${segment[0] * step}px`,
          left: `${segment[1] * step}px`,
        };
        return <div className={snakeClass} key={i} style={coord}></div>;
      })}
    </>
  );
};

export default Snake;
