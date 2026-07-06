import { pokemonNameMap } from '@/data/pokemon';

export function getEnglishName(koreaName) {
  const query = koreaName.trim().replace(' ', '');
  const entry = Object.entries(pokemonNameMap).find(([korean]) =>
    korean.includes(query),
  );
  return entry?.[1] ?? koreaName;
}
