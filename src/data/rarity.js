export const pokemonTCGRarityMap = {
  C: '커먼',
  U: '언커먼',
  R: '레어',
  RR: '더블 레어',
  RRR: '트리플 레어',
  SR: '슈퍼 레어',
  HR: '하이퍼 레어',
  UR: '울트라 레어',
  AR: '아트 레어',
  SAR: '스페셜 아트 레어',
  PR: '프로모',
  K: '캐릭터 레어',
  KR: '캐릭터 레어 R',
  CSR: '캐릭터 슈퍼 레어',
  CHR: '캐릭터 하이퍼 레어',
  TR: '트레이너 레어',
};

export function getRarityKo(rarity) {
  return pokemonTCGRarityMap[rarity] ?? rarity;
}
