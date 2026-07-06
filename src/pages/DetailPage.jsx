import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading, Error, Nothing } from '@/components/atoms';
import { useCardDetail, useCurrency } from '@/hooks';
import { getKoreanName } from '@/utils/getKoreaName';
import { pokemonTCGConditionLabelMap } from '@/data/status';
import { formatPrice as fmt } from '@/utils/formatPrice';

const RAW_TIER_LABELS = {
  near_mint: 'Near Mint',
  lightly_played: 'Lightly Played',
  moderately_played: 'Moderately Played',
  heavily_played: 'Heavily Played',
  damaged: 'Damaged',
};

function buildTrendSeries(market, ebay) {
  const anchors = [
    ebay.avg_30d,
    ebay.avg_30d,
    ebay.avg_7d,
    ebay.avg_7d,
    ebay.avg_1d,
    market,
  ];
  const series = [];
  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];
    for (let s = 0; s < 3; s++) {
      series.push(
        a + (b - a) * (s / 3) + Math.sin(1 + i * 2 + s) * (market * 0.01),
      );
    }
  }
  series.push(anchors[anchors.length - 1]);
  return series;
}

function seriesToPoints(series, w, h, pad) {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  return series
    .map((v, i) => {
      const x = pad + (i / (series.length - 1)) * (w - 2 * pad);
      const y = h - pad - ((v - min) / range) * (h - 2 * pad);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

function seriesToArea(points, w, h, pad) {
  let d = `M ${pad},${h - pad} `;
  points.split(' ').forEach((pt) => {
    d += `L ${pt} `;
  });
  d += `L ${w - pad},${h - pad} Z`;
  return d;
}

function TrendChart({ market, ebay, currency }) {
  const width = 640;
  const height = 140;
  const pad = 8;

  const series = useMemo(() => buildTrendSeries(market, ebay), [market, ebay]);
  const points = seriesToPoints(series, width, height, pad);
  const area = seriesToArea(points, width, height, pad);
  const low = Math.min(...series);
  const high = Math.max(...series);
  const change = ((ebay.avg_1d - ebay.avg_30d) / ebay.avg_30d) * 100;
  const isUp = change >= 0;

  return (
    <div className='bg-card-bg border border-border rounded-2xl px-5 py-4'>
      <div className='flex justify-between items-center mb-3'>
        <span className='text-xs font-semibold text-text-muted tracking-wide'>
          30일 시세 추이
        </span>
        <span className='text-xs text-text-muted'>
          최저 {fmt(low, currency)} · 최고 {fmt(high, currency)}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio='none'
        className='w-full h-[140px] block'
      >
        <defs>
          <linearGradient id='trendGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop
              offset='0'
              style={{ stopColor: 'var(--accent)' }}
              stopOpacity='0.25'
            />
            <stop
              offset='1'
              style={{ stopColor: 'var(--accent)' }}
              stopOpacity='0'
            />
          </linearGradient>
        </defs>
        <path d={area} fill='url(#trendGradient)' stroke='none' />
        <polyline
          points={points}
          fill='none'
          stroke={isUp ? '#16a34a' : '#ef4444'}
          strokeWidth='2.2'
          strokeLinejoin='round'
          vectorEffect='non-scaling-stroke'
        />
      </svg>
    </div>
  );
}

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('raw');
  const { data, isLoading, isError, error } = useCardDetail(id);
  const { currency } = useCurrency();

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  const card = data?.data;
  if (!card) return null;

  const nearMint = card.prices?.raw?.near_mint;
  const market = nearMint?.tcgplayer?.market;
  const ebay = nearMint?.ebay;
  const change = ebay
    ? ((ebay.avg_1d - ebay.avg_30d) / ebay.avg_30d) * 100
    : null;
  const isUp = change !== null && change >= 0;

  const rawEntries = Object.entries(RAW_TIER_LABELS)
    .map(([key, label]) => ({
      key,
      label,
      data: card.prices?.raw?.[key]?.tcgplayer,
    }))
    .filter((entry) => entry.data);

  const psaGrades = card.prices?.graded?.psa ?? {};
  const psaEntries = Object.keys(psaGrades)
    .sort((a, b) => Number(b) - Number(a))
    .map((grade) => ({
      key: grade,
      label: `PSA ${grade}`,
      data: psaGrades[grade]?.ebay,
    }))
    .filter((entry) => entry.data);

  const activeEntries = tab === 'psa' ? psaEntries : rawEntries;

  return (
    <div className='w-full box-border px-5 py-8 max-w-4xl mx-auto'>
      <div
        className='inline-flex items-center gap-1 text-sm font-semibold text-accent cursor-pointer mb-5'
        onClick={() => navigate(-1)}
      >
        ← 목록으로
      </div>

      <div className='flex gap-6 mb-7 max-[582px]:flex-col'>
        <div className='flex-none w-37.5 max-[582px]:w-27.5 aspect-5/7 rounded-2xl overflow-hidden bg-bg-sub'>
          <img
            src={card.image_url}
            alt={card.name}
            className='w-full h-full object-cover'
            onError={(e) => {
              e.currentTarget.src = '/no_img_default.png';
            }}
          />
        </div>
        <div className='flex-1 min-w-0'>
          <div className='text-xs font-semibold text-accent tracking-wide mb-2'>
            {card.set?.name}
          </div>
          <div className='text-2xl font-bold text-text tracking-tight'>
            {getKoreanName(card.name)}
          </div>
          <div className='text-sm text-text-sub mt-1'>{card.name}</div>
          <div className='flex flex-wrap gap-1.5 mt-3'>
            <span className='text-xs font-semibold text-accent bg-accent-bg border border-accent-border px-2 py-1 rounded-md'>
              {card.rarity}
            </span>
            <span className='text-xs font-semibold text-text-mid bg-bg-sub border border-border px-2 py-1 rounded-md'>
              {card.number || '-'}
            </span>
          </div>
          <div className='flex items-baseline gap-3 mt-5'>
            <span className='text-3xl font-bold text-text tracking-tight'>
              {fmt(market, currency)}
            </span>
            {change !== null && (
              <span
                className={`text-sm font-bold ${isUp ? 'text-green-600' : 'text-red-500'}`}
              >
                {isUp ? '▲' : '▼'} {Math.abs(change).toFixed(1)}%
              </span>
            )}
          </div>
          <div className='text-xs text-text-muted mt-2'>
            평균 시세(Near Mint 기준) · 최근 30일
          </div>
        </div>
      </div>

      {ebay && (
        <div className='mb-7'>
          <TrendChart market={market} ebay={ebay} currency={currency} />
        </div>
      )}

      <div className='flex items-baseline justify-between mb-3'>
        <div className='text-lg font-bold text-text tracking-tight'>
          보존 상태별 시세
        </div>
        <div className='text-xs text-text-muted'>HIGH · MID · LOW</div>
      </div>

      <div className='flex gap-2 bg-bg-sub border border-border rounded-xl p-1 mb-4'>
        <button
          onClick={() => setTab('raw')}
          className={`flex-1 text-center py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-colors duration-150 ${
            tab === 'raw'
              ? 'bg-accent text-white'
              : 'text-text-mid hover:text-text'
          }`}
        >
          Raw ({rawEntries.length})
        </button>
        <button
          onClick={() => setTab('psa')}
          className={`flex-1 text-center py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-colors duration-150 ${
            tab === 'psa'
              ? 'bg-accent text-white'
              : 'text-text-mid hover:text-text'
          }`}
        >
          PSA ({psaEntries.length})
        </button>
      </div>

      <div className='flex flex-col gap-2.5 mb-8'>
        {activeEntries.length === 0 && <Nothing>NO RESULT</Nothing>}
        {activeEntries.map((entry, i) => (
          <div
            key={entry.key}
            className={`bg-card-bg border rounded-2xl px-4.5 py-4 ${
              i === 0 ? 'border-accent-border' : 'border-border'
            }`}
          >
            <div className='flex items-center gap-2 mb-3'>
              <span className='w-2 h-2 rounded-sm bg-accent flex-none' />
              <span className='text-sm font-bold text-text'>{entry.label}</span>
              <span className='text-xs text-text-muted'>
                {tab === 'psa'
                  ? 'eBay 1일/7일/30일 평균'
                  : `${pokemonTCGConditionLabelMap[entry.key]?.ko}: ${pokemonTCGConditionLabelMap[entry.key]?.desc}`}
              </span>
              {i === 0 && (
                <span className='ml-auto text-[11px] font-bold text-white bg-accent px-1.5 py-1 rounded'>
                  기준 등급
                </span>
              )}
            </div>
            <div className='grid grid-cols-3 gap-2.5'>
              <div className='bg-bg-sub rounded-lg px-3 py-2.5'>
                <div className='text-[10px] font-semibold text-text-muted mb-2'>
                  HIGH
                </div>
                <div className='text-base font-bold text-green-600'>
                  {fmt(
                    tab === 'psa' ? entry.data.avg_1d : entry.data.high,
                    currency,
                  )}
                </div>
              </div>
              <div className='bg-bg-sub rounded-lg px-3 py-2.5'>
                <div className='text-[10px] font-semibold text-text-muted mb-2'>
                  MID
                </div>
                <div className='text-base font-bold text-text'>
                  {fmt(
                    tab === 'psa' ? entry.data.avg_7d : entry.data.mid,
                    currency,
                  )}
                </div>
              </div>
              <div className='bg-bg-sub rounded-lg px-3 py-2.5'>
                <div className='text-[10px] font-semibold text-text-muted mb-2'>
                  LOW
                </div>
                <div className='text-base font-bold text-text-sub'>
                  {fmt(
                    tab === 'psa' ? entry.data.avg_30d : entry.data.low,
                    currency,
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='bg-bg-sub border border-border rounded-xl px-4 py-3.5 text-xs leading-relaxed text-text-muted'>
        HIGH/MID/LOW는 최근 거래 데이터의 최고·중간·최저 구간 가격입니다.
        등급/판매처 기준에 따라 다를 수 있습니다.
      </div>
    </div>
  );
}
