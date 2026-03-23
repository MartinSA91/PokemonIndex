export default function Pagination({ page, hasNextPage, onPrevious, onNext }) {
  return (
    <div style={styles.pagination}>
      <button
        onClick={onPrevious}
        disabled={page === 0}
        style={{
          ...styles.pageButton,
          ...(page === 0 ? styles.disabledButton : {}),
        }}
      >
        Previous
      </button>

      <span style={styles.pageText}>Side {page + 1}</span>

      <button
        onClick={onNext}
        disabled={!hasNextPage}
        style={{
          ...styles.pageButton,
          ...(!hasNextPage ? styles.disabledButton : {}),
        }}
      >
        Next
      </button>
    </div>
  );
}

const styles = {
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
  disabledButton: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  pageText: {
    fontWeight: "bold",
    color: "#2a4b9b",
  },
};