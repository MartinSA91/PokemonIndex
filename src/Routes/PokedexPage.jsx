import { useEffect, useRef, useState } from "react";
import {
  getPokemonDetails,
  getPokemonListWithDetails,
} from "../Services/PokeApi";
import PokemonCard from "../Components/PokemonCard";
import PokemonDetails from "../Components/PokemonDetails";
import Pagination from "../Components/Pagination";
import {
  typeColors,
  getBulbapediaAbilityUrl,
  
} from "../Utils/PokemonHelpers";

const LIMIT = 20;



export default function PokedexPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState("");

  const audioRef = useRef(null);

  useEffect(() => {
    async function fetchPokemonPage() {
      try {
        setLoadingList(true);
        setError("");

        const offset = page * LIMIT;
        const data = await getPokemonListWithDetails(LIMIT, offset);

        setPokemonList(data.results);
        setHasNextPage(Boolean(data.next));
        setSelectedPokemon(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingList(false);
      }
    }

    fetchPokemonPage();
  }, [page]);

  useEffect(() => {
    return () => {
      stopCry();
    };
  }, []);

  function stopCry() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }

  function playCry(pokemonData) {
    const cryUrl = pokemonData?.cries?.latest || pokemonData?.cries?.legacy;

    if (!cryUrl) return;

    stopCry();

    const audio = new Audio(cryUrl);
    audioRef.current = audio;

    audio.play().catch(() => {
      console.log("Kunne ikke afspille cry");
    });
  }

  async function handleSelectPokemon(pokemon) {
    try {
      setLoadingDetails(true);
      setError("");

      const data = await getPokemonDetails(pokemon.url);
      setSelectedPokemon(data);
      playCry(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingDetails(false);
    }
  }

  function closeModal() {
    stopCry();
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
            {pokemonList.map((pokemon, index) => (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                index={index}
                page={page}
                limit={LIMIT}
                typeColors={typeColors}
                onSelect={handleSelectPokemon}
              />
            ))}
          </div>
        )}

        <Pagination
  page={page}
  hasNextPage={hasNextPage}
  onPrevious={() => setPage((prev) => prev - 1)}
  onNext={() => setPage((prev) => prev + 1)}
/>
        
      </section>

      <PokemonDetails
        selectedPokemon={selectedPokemon}
        loadingDetails={loadingDetails}
        onClose={closeModal}
        onPlayCry={playCry}
        getBulbapediaAbilityUrl={getBulbapediaAbilityUrl}
        typeColors={typeColors}
      />
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

  
};
