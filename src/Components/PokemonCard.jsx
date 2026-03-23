import { formatPokemonName } from "../Utils/PokemonHelpers";

export default function PokemonCard({
  pokemon,
  index,
  page,
  limit,
  typeColors,
  onSelect,
}) {
  const primaryType = pokemon.types?.[0]?.type?.name;
  const backgroundColor = typeColors[primaryType] || "#888";

  return (
    <button
      onClick={() => onSelect(pokemon)}
      style={{
        ...styles.card,
        backgroundColor,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.22)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}
    >
      <span style={styles.number}>
        #{pokemon.id || page * limit + index + 1}
      </span>

      {pokemon.sprite && (
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          style={styles.image}
        />
      )}

      <span style={styles.name}>{formatPokemonName(pokemon.name)}</span>

      <span style={styles.typeBadge}>
        {pokemon.types?.map((type) => type.type.name).join(" / ")}
      </span>
    </button>
  );
}

const styles = {
  card: {
    border: "none",
    borderRadius: "18px",
    padding: "1rem",
    color: "white",
    textAlign: "center",
    cursor: "pointer",
    minHeight: "190px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  number: {
    fontSize: "0.85rem",
    marginBottom: "0.5rem",
    opacity: 0.9,
  },
  image: {
    width: "96px",
    height: "96px",
    imageRendering: "pixelated",
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginTop: "0.5rem",
  },
  typeBadge: {
    marginTop: "0.5rem",
    fontSize: "0.85rem",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: "0.3rem 0.6rem",
    borderRadius: "999px",
  },
};