const Food = (props) => {
  const step = props.step;
  const coord = {
    top: `${props.foodCoord[0] * step}px`,
    left: `${props.foodCoord[1] * step}px`,
  };

  return (
    <>
      <div className="food" style={coord}></div>
    </>
  );
};

export default Food;
