import { NavLink, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brandWrap}>
          <div style={styles.pokeballOuter}>
            <div style={styles.pokeballTop}></div>
            <div style={styles.pokeballMiddle}></div>
            <div style={styles.pokeballCenter}></div>
            <div style={styles.pokeballBottom}></div>
          </div>

          <div>
            <h1 style={styles.title}>Pokédex</h1>
            <p style={styles.subtitle}>Din digitale Pokémon-oversigt</p>
          </div>
        </div>

        <nav style={styles.nav}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {}),
            })}
          >
            Pokedex
          </NavLink>

          <NavLink
            to="/about"
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {}),
            })}
          >
            About
          </NavLink>
        </nav>
      </header>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #eef6ff 0%, #f8fbff 40%, #ffffff 100%)",
  },
  header: {
    background:
      "linear-gradient(90deg, #e3350d 0%, #ef5350 50%, #d62828 100%)",
    color: "white",
    padding: "1rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
    borderBottom: "6px solid #222",
    boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
  },
  brandWrap: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  pokeballOuter: {
    position: "relative",
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "3px solid #222",
    backgroundColor: "white",
    flexShrink: 0,
  },
  pokeballTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#ff3b30",
  },
  pokeballMiddle: {
    position: "absolute",
    top: "calc(50% - 4px)",
    left: 0,
    right: 0,
    height: "8px",
    backgroundColor: "#222",
  },
  pokeballCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "white",
    border: "4px solid #222",
    zIndex: 2,
  },
  pokeballBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#f8f8f8",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    lineHeight: 1,
    color: "#ffde00",
    textShadow: "2px 2px 0 #2a4b9b",
  },
  subtitle: {
    margin: "0.35rem 0 0",
    fontSize: "0.95rem",
    opacity: 0.95,
  },
  nav: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
  },
  link: {
    color: "#222",
    backgroundColor: "#ffde00",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "0.65rem 1rem",
    borderRadius: "999px",
    border: "2px solid #222",
    boxShadow: "0 3px 0 #222",
  },
  activeLink: {
    backgroundColor: "#2a75bb",
    color: "white",
  },
  main: {
    padding: "2rem",
  },
};