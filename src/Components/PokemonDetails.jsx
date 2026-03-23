import { formatPokemonName } from "../Utils/PokemonHelpers";
export default function PokemonDetails({
  selectedPokemon,
  loadingDetails,
  onClose,
  onPlayCry,
  getBulbapediaAbilityUrl,
  typeColors,
}) {
  if (!selectedPokemon && !loadingDetails) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.closeButton}>
          Luk
        </button>

        {loadingDetails && <p style={styles.loading}>Indlæser detaljer...</p>}

        {selectedPokemon && !loadingDetails && (
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>
              {formatPokemonName(selectedPokemon.name)}
            </h3>

            {selectedPokemon.sprites?.front_default && (
              <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
                style={styles.modalImage}
              />
            )}

            {(selectedPokemon.cries?.latest ||
              selectedPokemon.cries?.legacy) && (
              <button
                onClick={() => onPlayCry(selectedPokemon)}
                style={styles.cryButton}
              >
                🔊 Afspil cry igen
              </button>
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

            <div style={styles.section}>
              <strong>Typer:</strong>
              <div style={styles.badgeList}>
                {selectedPokemon.types.map((typeEntry) => {
                  const typeName = typeEntry.type.name;

                  return (
                    <span
                      key={typeName}
                      style={{
                        ...styles.typePill,
                        backgroundColor: typeColors[typeName] || "#888",
                      }}
                    >
                      {typeName}
                    </span>
                  );
                })}
              </div>
            </div>

            <div style={styles.section}>
              <strong>Abilities:</strong>
              <div style={styles.badgeList}>
                {selectedPokemon.abilities.map((abilityEntry) => {
                  const abilityName = abilityEntry.ability.name;

                  return (
                    <a
                      key={abilityName}
                      href={getBulbapediaAbilityUrl(abilityName)}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.abilityLink}
                    >
                      {abilityName}
                    </a>
                  );
                })}
              </div>
            </div>

            <div style={styles.statsSection}>
              <strong>Stats:</strong>
              <ul style={styles.statsList}>
                {selectedPokemon.stats.map((stat) => (
                  <li key={stat.stat.name} style={styles.statItem}>
                    <span>{stat.stat.name}</span>
                    <span>{stat.base_stat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
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
    maxHeight: "90vh",
    overflowY: "auto",
    margin: "auto",
  },
  closeButton: {
    position: "sticky",
    top: "0",
    marginLeft: "auto",
    display: "block",
    border: "none",
    backgroundColor: "#ef5350",
    color: "white",
    padding: "0.5rem 0.8rem",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: "bold",
    zIndex: 2,
  },
  loading: {
    textAlign: "center",
    fontSize: "1.1rem",
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
  cryButton: {
    border: "none",
    backgroundColor: "#2a75bb",
    color: "white",
    padding: "0.7rem 1rem",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "1rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },
  section: {
    marginTop: "1rem",
  },
  badgeList: {
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
  typePill: {
    color: "white",
    padding: "0.45rem 0.8rem",
    borderRadius: "999px",
    fontWeight: "bold",
    fontSize: "0.9rem",
    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
  },
  statsSection: {
    marginTop: "1.25rem",
  },
  statsList: {
    listStyle: "none",
    padding: 0,
    marginTop: "1rem",
  },
  statItem: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f3f6fb",
    padding: "0.65rem 0.9rem",
    borderRadius: "10px",
    marginBottom: "0.5rem",
  },
};
