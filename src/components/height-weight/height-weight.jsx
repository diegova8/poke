import { GradientContainer } from "..";

const HeightWeight = ({ height, weight }) => {
  return (
    <GradientContainer>
      <h3 className="text-xl font-bold mb-2">Height</h3>
      <p>{height}</p>
      <h3 className="text-xl font-bold mb-2">Weight</h3>
      <p>{weight}</p>
    </GradientContainer>
  );
};

export default HeightWeight;
