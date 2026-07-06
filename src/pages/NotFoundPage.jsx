import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-10 font-['Noto_Sans_KR']">
      <div className='max-w-140 w-full text-center'>
        {/* 404 글리치 */}
        <div className='glitch-wrap font-press mb-2'>
          <div className='g-base text-[72px] leading-none text-accent tracking-tight'>
            404
          </div>
          <div className='g-r text-[72px] leading-none tracking-tight'>404</div>
          <div className='g-b text-[72px] leading-none tracking-tight'>404</div>
        </div>

        {/* 메시지 */}
        <p className='text-[22px] font-bold text-accent mt-6 mb-2.5 leading-snug tracking-tight'>
          이 도감 페이지는 존재하지 않아요
        </p>
        <p className='text-[15px] text-text leading-relaxed mb-8'>
          찾으시는 카드나 페이지가 이동되었거나
          <br />
          야생의 오류에게 잡아먹힌 것 같습니다.
        </p>

        {/* 버튼 */}
        <div className='flex gap-3 justify-center'>
          <button
            onClick={() => navigate('/')}
            className='text-sm font-bold text-white bg-accent px-6 py-4 rounded-xl cursor-pointer'
          >
            홈으로 돌아가기
          </button>
          <button
            onClick={() => navigate(-1)}
            className='text-sm font-bold text-text-muted bg-white border px-6 py-4 rounded-xl cursor-pointer'
          >
            이전 페이지
          </button>
        </div>
      </div>
    </div>
  );
}
