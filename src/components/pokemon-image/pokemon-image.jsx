const PokemonImage = ({ src, name }) => {
  return (
    <div>
      <img src={src} alt={name} className="w-auto h-auto" />
      <h2 className="text-3xl text-center font-bold font-pokemon mb-2">
        {name}
      </h2>
    </div>
  );
};

export default PokemonImage;
