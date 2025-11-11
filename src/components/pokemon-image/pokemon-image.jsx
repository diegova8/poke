const PokemonImage = ({ src, name }) => {
  return (
    <div>
      <img
        src={src}
        alt={name}
        className="w-full max-w-xs h-auto mx-auto object-contain"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/256?text=Image+Not+Found";
        }}
      />
    </div>
  );
};

export default PokemonImage;
