import { useState } from 'react';
import Carousel from './Carousel.js';
import BottomSheet from '../../components/BottomSheet.js';
import ShortCut from './ShortCut.js';
import QuickSearch from './QuickSearch.js';
import Restaurants from '../../components/Restaurants.js';

export default function Home() {
  const [visible, setVisible] = useState(false);

  function onBottomSheet () {
    setVisible(!visible);
  };

  function getVisible(value) {
    setVisible(value);
  }

  return (
    <main className="pb-[74px]">
      <div className="myArea">
        <button onClick={onBottomSheet}>
          <i>위치설정</i>
          <span>전국</span>
        </button>
      </div>
      {/* 바텀시트 */}
      { visible && <BottomSheet visible={visible} getVisible={getVisible}/> }
      {/* 캐러셀 */}
      <Carousel />
      <section className='gap'></section>
      {/* 숏컷 */}
      <ShortCut />
      <section className='gap shortcut-gap'></section>
      {/* 어디로 가시나요? */}
      <section className='section pb-[45px]'>
        <div className="px-[20px]">
          <div className="section-header">
            <h3 className="font-bold">어디로 가시나요?</h3>
          </div>
          <div className="section-body">
            <div className="v-scroll">
              <div className='v-scroll-inner'>
                <QuickSearch />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 웨이팅 핫플레이스 BEST */}
      <section className='section pb-[45px]'>
      <div className="px-[20px]">
          <div className="section-header section-header-v">
            <h3 className="font-bold">웨이팅 핫플레이스 BEST</h3>
            <p>핫 한 웨이팅 라인업, 이제 캐치테이블에서!</p>
            <a className="btn-more">전체보기</a>
          </div>
          <div className="section-body">
            <div className="v-scroll">
              <div className='v-scroll-inner'>
                <Restaurants />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        유저의 리얼리뷰 Pick
      </section>
      <section>
        유저 이름님이 좋아할 매장
      </section>
      <section>
        놓치면 안되는 혜택 가득!
      </section>
      <section>
        캐치테이블 on!
      </section>
      <section>
        미쉐린 가이드 2024
      </section>
      <section>
        광고 배너
      </section>
      <section>
        음식 종류별 BEST
      </section>
      <section>
        가격대별 BEST
      </section>
      <section>
        상황별, 주제별 BEST
      </section>
      <section>
        내일 예약 가능한 레스토랑
      </section>
      <section>
        브랜드관
      </section>
      <section>
        다이닝 매거진
      </section>
      <section>
        푸터
      </section>
    </main>
  );
}
