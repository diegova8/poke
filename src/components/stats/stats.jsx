import { GradientContainer } from "..";

const Stats = ({ stats }) => {
  return (
    <GradientContainer>
      <h3 className="text-xl font-bold mb-2">Stats</h3>
      <ul className="list-none">
        {stats?.map((stat) => (
          <li key={stat.stat.name}>{stat.stat.name + ": " + stat.base_stat}</li>
        ))}
      </ul>
    </GradientContainer>
  );
};

export default Stats;
