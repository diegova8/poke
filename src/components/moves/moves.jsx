const Moves = ({ moves }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {moves?.slice(0, 8).map((move, index) => (
        <div
          key={`${move.move.name}-${index}`}
          className="bg-indigo-100 border-2 border-indigo-400 rounded-lg px-3 py-2 hover:bg-indigo-200 transition"
        >
          <p className="font-pokemon text-sm font-bold text-indigo-900 capitalize">
            {move.move.name}
          </p>
          <p className="text-xs text-indigo-700">
            Learned at Lvl {move.version_group_details?.[0]?.level_learned_at || "?"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Moves;
