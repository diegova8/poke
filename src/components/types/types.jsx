import { GradientContainer } from "..";
const Types = ({ types }) => {
  return (
    <GradientContainer>
      <h3 className="text-xl font-bold mb-2">Types</h3>
      <ul className="list-none flex flex-col gap-3.5">
        {types?.map((type) => (
          <li key={type.type.name}>
            <span className={`type ${type.type.name}`}></span>
          </li>
        ))}
      </ul>
    </GradientContainer>
  );
};

export default Types;
