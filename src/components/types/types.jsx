const Types = ({ types }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {types?.map((type) => (
        <div key={type.type.name} className="flex-1 min-w-[120px]">
          <span
            className={`type ${type.type.name} block px-3 py-2 rounded-lg text-white font-bold font-pokemon text-center text-sm capitalize border-2 border-gray-400`}
          >
            {type.type.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Types;
