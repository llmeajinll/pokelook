import { pokemonNameMap } from '@/data/pokemon';

export function getKoreanName(englishName) {
  const query = englishName.trim().replace(' ', '').toLowerCase();
  const entry = Object.entries(pokemonNameMap).find(
    ([, english]) => english.toLowerCase() === query,
  );
  return entry?.[0] ?? englishName;
}
