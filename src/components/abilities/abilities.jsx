const Abilities = ({ abilities }) => {
  return (
    <div className="space-y-2">
      {abilities?.map((ability) => (
        <div
          key={ability.ability.name}
          className="bg-purple-100 border-2 border-purple-400 rounded-lg px-3 py-2"
        >
          <p className="font-pokemon text-sm font-bold text-purple-800 capitalize">
            {ability.ability.name}
          </p>
          {ability.is_hidden && (
            <p className="text-xs text-purple-600 font-semibold">Hidden Ability</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Abilities;
