export const pokemonTCGConditionMap = {
  mint: '최상',
  near_mint: '상',
  lightly_played: '중상',
  moderately_played: '중',
  heavily_played: '하',
  damaged: '손상',
};

export const pokemonTCGConditionLabelMap = {
  mint: { ko: '최상', abbr: 'M', desc: '완전 새 카드, 개봉 직후 상태' },
  near_mint: {
    ko: '상',
    abbr: 'NM',
    desc: '거의 새것, 육안으로 흠집 없음',
  },
  lightly_played: {
    ko: '중상',
    abbr: 'LP',
    desc: '약간의 사용감, 작은 스크래치',
  },
  moderately_played: {
    ko: '중',
    abbr: 'MP',
    desc: '눈에 띄는 사용감, 모서리 닳음',
  },
  heavily_played: {
    ko: '하',
    abbr: 'HP',
    desc: '심한 사용감, 구김/긁힘 있음',
  },
  damaged: { ko: '손상', abbr: 'D', desc: '심각한 손상, 찢김/구멍 등' },
};

// API 응답의 등급 키 → 한국어
export function getConditionKo(conditionKey) {
  return pokemonTCGConditionMap[conditionKey] ?? conditionKey;
}

// API 응답의 등급 키 → 약자
export function getConditionAbbr(conditionKey) {
  return pokemonTCGConditionLabelMap[conditionKey]?.abbr ?? conditionKey;
}
