import { GradientContainer } from "..";

const Moves = ({ moves }) => {
  return (
    <GradientContainer>
      <h3 className="text-xl font-bold mb-2">Moves</h3>
      <ul className="list-none">
        {moves?.slice(0, 5).map((move) => (
          <li key={move.move.name}>{move.move.name}</li>
        ))}
      </ul>
    </GradientContainer>
  );
};

export default Moves;
