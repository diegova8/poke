const Stats = ({ stats }) => {
  const getStatColor = (statName) => {
    const colors = {
      hp: "bg-red-500",
      attack: "bg-orange-500",
      defense: "bg-yellow-500",
      "special-attack": "bg-blue-500",
      "special-defense": "bg-green-500",
      speed: "bg-pink-500",
    };
    return colors[statName] || "bg-gray-500";
  };

  const getStatLabel = (statName) => {
    const labels = {
      hp: "HP",
      attack: "ATK",
      defense: "DEF",
      "special-attack": "SP.ATK",
      "special-defense": "SP.DEF",
      speed: "SPD",
    };
    return labels[statName] || statName;
  };

  const maxStatValue = 255;

  return (
    <div className="space-y-2">
      {stats?.map((stat) => (
        <div key={stat.stat.name} className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold font-pokemon text-gray-700 uppercase">
              {getStatLabel(stat.stat.name)}
            </span>
            <span className="text-xs font-bold text-gray-800">{stat.base_stat}</span>
          </div>
          <div className="bg-gray-200 border-2 border-gray-400 rounded h-4 overflow-hidden">
            <div
              className={`h-full ${getStatColor(stat.stat.name)} transition-all`}
              style={{ width: `${(stat.base_stat / maxStatValue) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
