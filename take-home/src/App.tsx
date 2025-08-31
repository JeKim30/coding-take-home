import { useEffect, useState } from "react";
import {
  fetchData,
  getListingsByKeyValue,
  getAllCountries,
  getListingsWithNull,
} from "./middleware/middleware";
import type { Listing } from "./middleware/middleware";

function App() {
  const [query, setQuery] = useState("");
  const [keyType, setKeyType] = useState<"color" | "language">("color");
  const [results, setResults] = useState<Listing[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [nullRows, setNullRows] = useState<Listing[]>([]);

  // load countries and null rows on first render and when keyType changes
  useEffect(() => {
    fetchData();
    (async () => {
      setCountries(await getAllCountries());
      setNullRows(await getListingsWithNull(keyType));
    })();
  }, [keyType]);

  // search handler
  const onSearch = async () => {
    const rows = await getListingsByKeyValue(keyType, query);
    setResults(rows);
    setNullRows(await getListingsWithNull(keyType));
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "1rem" }}>
      <h1>ACTUAL take home test</h1>

      {/* search controls */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <select
          value={keyType}
          onChange={(e) => setKeyType(e.target.value as "color" | "language")}
        >
          <option value="color">Color</option>
          <option value="language">Language</option>
        </select>
        <input
          placeholder={`Search ${keyType}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={onSearch}>Search</button>
      </div>

      {/* info */}
      <div style={{ marginBottom: "1rem" }}>
        <p>
          <b>Total countries:</b> {countries.length}
        </p>
        <p>
          <b>Missing {keyType}:</b> {nullRows.length}
        </p>
        <p>
          <b>Search results:</b> {results.length}
        </p>
      </div>

      {/* results */}
      <div>
        {results.length === 0 ? (
          <p style={{ color: "#777" }}>No results yet. Try a search.</p>
        ) : (
          <ul>
            {results.map((r, idx) => (
              <li key={idx}>
                ID: {r.id} | Country: {r.country ?? "—"} | Color:{" "}
                {r.color ?? "—"} | Language: {r.language ?? "—"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
