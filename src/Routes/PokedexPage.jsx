import { useEffect, useState } from "react";

const LIMIT = 20;

const typeColors = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A890F0",
};

export default function PokedexPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPokemonPage() {
      try {
        setLoadingList(true);
        setError("");

        const offset = page * LIMIT;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`,
        );

        if (!response.ok) {
          throw new Error("Kunne ikke hente Pokémon-listen");
        }

        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);

            if (!detailResponse.ok) {
              throw new Error("Kunne ikke hente Pokémon-detaljer til listen");
            }

            const detailData = await detailResponse.json();

            return {
              name: pokemon.name,
              url: pokemon.url,
              id: detailData.id,
              sprite: detailData.sprites.front_default,
              types: detailData.types,
            };
          }),
        );

        function getBulbapediaAbilityUrl(abilityName) {
          const formatted = abilityName
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("_");

          return `https://bulbapedia.bulbagarden.net/wiki/${formatted}_(Ability)`;
        }

        setPokemonList(detailedPokemon);
        setHasNextPage(Boolean(data.next));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingList(false);
      }
    }

    fetchPokemonPage();
  }, [page]);

  async function handleSelectPokemon(pokemon) {
    try {
      setLoadingDetails(true);
      setError("");

      const response = await fetch(pokemon.url);

      if (!response.ok) {
        throw new Error("Kunne ikke hente Pokémon-detaljer");
      }

      const data = await response.json();
      setSelectedPokemon(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingDetails(false);
    }
  }

  function closeModal() {
    setSelectedPokemon(null);
  }

  return (
    <>
      <section style={styles.page}>
        <div style={styles.hero}>
          <h2 style={styles.title}>Pokédex</h2>
          <p style={styles.subtitle}>Klik på en Pokémon for at se detaljer</p>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {loadingList ? (
          <p style={styles.loading}>Indlæser Pokémon...</p>
        ) : (
          <div style={styles.grid}>
            {pokemonList.map((pokemon, index) => {
              const primaryType = pokemon.types?.[0]?.type?.name;
              const backgroundColor = typeColors[primaryType] || "#888";

              return (
                <button
                  key={pokemon.name}
                  onClick={() => handleSelectPokemon(pokemon)}
                  style={{
                    ...styles.card,
                    backgroundColor,
                  }}
                >
                  <span style={styles.number}>
                    #{pokemon.id || page * LIMIT + index + 1}
                  </span>

                  {pokemon.sprite && (
                    <img
                      src={pokemon.sprite}
                      alt={pokemon.name}
                      style={styles.image}
                    />
                  )}

                  <span style={styles.name}>
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </span>

                  <span style={styles.typeBadge}>
                    {pokemon.types?.map((type) => type.type.name).join(" / ")}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div style={styles.pagination}>
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 0}
            style={styles.pageButton}
          >
            Previous
          </button>

          <span style={styles.pageText}>Side {page + 1}</span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!hasNextPage}
            style={styles.pageButton}
          >
            Next
          </button>
        </div>
      </section>

      {(selectedPokemon || loadingDetails) && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} style={styles.closeButton}>
              Luk
            </button>

            {loadingDetails && <p>Indlæser detaljer...</p>}

            {selectedPokemon && !loadingDetails && (
              <div style={styles.modalContent}>
                <h3 style={styles.modalTitle}>
                  {selectedPokemon.name.charAt(0).toUpperCase() +
                    selectedPokemon.name.slice(1)}
                </h3>

                {selectedPokemon.sprites?.front_default && (
                  <img
                    src={selectedPokemon.sprites.front_default}
                    alt={selectedPokemon.name}
                    style={styles.modalImage}
                  />
                )}

                <p>
                  <strong>Pokédex nummer:</strong> #{selectedPokemon.id}
                </p>

                <p>
                  <strong>Højde:</strong> {selectedPokemon.height}
                </p>

                <p>
                  <strong>Vægt:</strong> {selectedPokemon.weight}
                </p>

                <div style={styles.abilitiesSection}>
                  <strong>Typer:</strong>
                  <div style={styles.abilityList}>
                    {selectedPokemon.types.map((typeEntry) => {
                      const typeName = typeEntry.type.name;
                      return (
                        <span
                          key={typeName}
                          style={{
                            ...styles.abilityLink,
                            backgroundColor: typeColors[typeName] || "#888",
                          }}
                        >
                          {typeName}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <p>
                  <strong>Abilities:</strong>{" "}
                  {selectedPokemon.abilities
                    .map((ability) => ability.ability.name)
                    .join(", ")}
                </p>

                <div>
                  <strong>Stats:</strong>
                  <ul style={styles.statsList}>
                    {selectedPokemon.stats.map((stat) => (
                      <li key={stat.stat.name}>
                        {stat.stat.name}: {stat.base_stat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #f7fbff 0%, #eaf3ff 50%, #fdfdfd 100%)",
    padding: "2rem",
  },
  hero: {
    marginBottom: "2rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
    color: "#2a4b9b",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#555",
  },
  error: {
    color: "crimson",
    textAlign: "center",
    marginBottom: "1rem",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1rem",
  },
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
    transition: "transform 0.2s ease",
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
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    marginTop: "2rem",
  },
  pageButton: {
    border: "none",
    backgroundColor: "#ffcb05",
    color: "#2a4b9b",
    padding: "0.8rem 1.2rem",
    borderRadius: "999px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },
  pageText: {
    fontWeight: "bold",
    color: "#2a4b9b",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "1.5rem",
    width: "100%",
    maxWidth: "500px",
    position: "relative",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  closeButton: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    border: "none",
    backgroundColor: "#ef5350",
    color: "white",
    padding: "0.5rem 0.8rem",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  modalContent: {
    textAlign: "center",
  },
  modalTitle: {
    fontSize: "2rem",
    color: "#2a4b9b",
    marginBottom: "1rem",
  },
  modalImage: {
    width: "140px",
    height: "140px",
    imageRendering: "pixelated",
    marginBottom: "1rem",
  },
  statsList: {
    listStyle: "none",
    padding: 0,
    marginTop: "1rem",
  },

  abilitiesSection: {
    marginTop: "1rem",
  },
  abilityList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "0.5rem",
    justifyContent: "center",
  },
  abilityLink: {
    textDecoration: "none",
    backgroundColor: "#2a75bb",
    color: "white",
    padding: "0.45rem 0.8rem",
    borderRadius: "999px",
    fontWeight: "bold",
    fontSize: "0.9rem",
    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
  },
};
