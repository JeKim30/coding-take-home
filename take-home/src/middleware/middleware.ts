import data from "../mock-data/MOCK_DATA.json";

export type Listing = {
  id?: string | number;
  country?: string | null;
  color?: string | null;
  language?: string | null;
  [k: string]: unknown;
};

const DATA: Listing[] = Array.isArray(data) ? (data as Listing[]) : [];

const normalize = (s: unknown) =>
  String(s ?? "")
    .trim()
    .toLowerCase();

// log all data in console
export const fetchData = () => {
  console.log(DATA);
};

// filter listings by color or language
export async function getListingsByKeyValue(
  key: "color" | "language",
  value: string
): Promise<Listing[]> {
  const v = normalize(value);
  if (!v) return [];
  return DATA.filter((row) => normalize(row[key]) === v);
}

// get all unique countries in dataset
export async function getAllCountries(): Promise<string[]> {
  const set = new Set<string>();
  for (const row of DATA) {
    const c = String(row.country ?? "").trim();
    if (c) set.add(c);
  }
  return Array.from(set).sort();
}

// get listings where color or language is missing
export async function getListingsWithNull(
  key: "color" | "language"
): Promise<Listing[]> {
  return DATA.filter(
    (row) => row[key] == null || String(row[key]).trim() === ""
  );
}
