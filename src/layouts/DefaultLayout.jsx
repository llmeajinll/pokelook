import { Outlet } from 'react-router-dom';
import { Header, Footer, NavBar } from '@/components/organisms';

export default function DefaultLayout() {
  return (
    <div className='relative w-full h-screen max-w-300 min-w-62.5 mx-auto'>
      <Header />
      <div className='w-full min-h-[calc(100vh-286px)] max-[378px]:min-h-[calc(100vh-269px)] box-border'>
        <Outlet />
      </div>
      <Footer />
      <NavBar />
    </div>
  );
}
