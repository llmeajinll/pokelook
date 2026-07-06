import * as ReactSlick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '@/assets/images/image1.png';
import image2 from '@/assets/images/image2.png';
import image3 from '@/assets/images/image3.png';

const Slider = ReactSlick.default?.default ?? ReactSlick.default;

const slides = [image1, image2, image3];

export default function Banner() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    speed: 600,
    cssEase: 'ease-in-out',
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='w-full overflow-hidden shadow-(--shadow)'>
      <Slider {...settings}>
        {slides.map((src, i) => (
          <div key={src}>
            <div className='w-full aspect-1717/916'>
              <img
                src={src}
                alt={`banner-${i + 1}`}
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
