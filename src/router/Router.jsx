// import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from '@/layouts';
import {
  NotFoundPage,
  MainPage,
  DetailPage,
  MyPage,
  SearchPage,
} from '@/pages';

export function Router() {
  return (
    // <Suspense fallback={<div>로딩중...</div>}>
    <Routes>
      <Route path='*' element={<NotFoundPage />} />

      <Route element={<DefaultLayout />}>
        <Route path='/' element={<MainPage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/search' element={<SearchPage />} />
      </Route>
    </Routes>
    // </Suspense>
  );
}
