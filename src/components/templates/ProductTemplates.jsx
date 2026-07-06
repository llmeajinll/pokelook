import { cva } from 'class-variance-authority';
import { useNavigate } from 'react-router-dom';
import { useSearchData } from '@/hooks/useSearchData';
import { Loading, Error, Nothing, Container } from '@/components/atoms';
import { Product } from '@/components/molecules';

const sectionTitle = cva('text-3xl font-bold text-text max-[582px]:text-xl');
const allBtn = cva('hover:underline cursor-pointer max-[582px]:text-xs');

function CardSection({
  cardData,
  isLoading,
  isError,
  error,
  title,
  navigate,
  fake,
}) {
  const { data } = cardData?.data || {};

  if (isLoading) {
    return (
      <div>
        <Container
          className='mb-5'
          direction='row'
          flexbox='space_end'
          size='full'
        >
          <h1 className={sectionTitle()}>{title}</h1>
        </Container>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Container
          className='mb-5'
          direction='row'
          flexbox='space_end'
          size='full'
        >
          <h1 className={sectionTitle()}>{title}</h1>
          <div
            className={allBtn()}
            onClick={() => {
              navigate(`/search?query=${fake}&limit=20&offset=0`);
            }}
          >
            전체보기
          </div>
        </Container>
        <Error error={error} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div>
        <Container
          className='mb-5'
          direction='row'
          flexbox='space_end'
          size='full'
        >
          <h1 className={sectionTitle()}>{title}</h1>
          <div
            className={allBtn()}
            onClick={() => {
              navigate(`/search?query=${fake}&limit=20&offset=0`);
            }}
          >
            전체보기
          </div>
        </Container>
        <Nothing>NO RESULT</Nothing>
      </div>
    );
  }

  return (
    <div>
      <Container
        className='mb-5'
        direction='row'
        flexbox='space_end'
        size='full'
      >
        <h1 className={sectionTitle()}>{title}</h1>
        <div
          className={allBtn()}
          onClick={() => {
            navigate(`/search?query=${fake}&limit=20&offset=0`);
          }}
        >
          전체보기
        </div>
      </Container>
      <div className='w-full box-border min-w-50 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5'>
        {data.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function ProductTemplates() {
  const navigate = useNavigate();
  const {
    data: grassCard,
    isLoading: isGrassCardLoading,
    isError: isGrassCardError,
    error: grassError,
  } = useSearchData({
    q: 'Bulbasaur',
    limit: 10,
  });

  const {
    data: waterCard,
    isLoading: isWaterCardLoading,
    isError: isWaterCardError,
    error: waterError,
  } = useSearchData({
    q: 'Squirtle',
    limit: 10,
  });

  const {
    data: fireCard,
    isLoading: isFireCardLoading,
    isError: isFireCardError,
    error: fireError,
  } = useSearchData({
    q: 'Charmander',
    limit: 10,
  });

  return (
    <div className='box-border px-5 pt-15 pb-10 w-full flex flex-col gap-20'>
      <CardSection
        cardData={grassCard}
        isLoading={isGrassCardLoading}
        isError={isGrassCardError}
        error={grassError}
        title='인기 상품'
        fake='이상해씨'
        navigate={navigate}
      />
      <CardSection
        cardData={waterCard}
        isLoading={isWaterCardLoading}
        isError={isWaterCardError}
        error={waterError}
        title='최신 상품'
        fake='꼬부기'
        navigate={navigate}
      />
      <CardSection
        cardData={fireCard}
        isLoading={isFireCardLoading}
        isError={isFireCardError}
        error={fireError}
        title='추천 상품'
        fake='파이리'
        navigate={navigate}
      />
    </div>
  );
}
