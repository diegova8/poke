import { GradientContainer } from "..";

const Abilities = ({ abilities }) => {
  return (
    <GradientContainer>
      <h3 className="text-xl font-bold mb-2">Abilities</h3>
      <ul className="list-none">
        {abilities?.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
    </GradientContainer>
  );
};

export default Abilities;
