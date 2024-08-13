'use client'
import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import axios from "axios";
import Router, { useRouter, } from 'next/router';
import { Image as ImageChak } from '@chakra-ui/react'
import { ArrowRight } from 'react-bootstrap-icons';
import { TailSpin } from "react-loader-spinner";
import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";
import TeleBookPanel from "../../components/common/TeleBookPanel";
import ImgDirectPanel from "../../components/common/ImgDirectPanel";
import WeatherPanel from "../../components/weather/WeatherPanel"
import { BtnActive } from '../../const/CustomConsts';
import LinkDetail from "../../components/common/LinkDetail";
import SocialLink from "../../components/common/SocailLink";
import { Helmet } from 'react-helmet';
import { getMetaData } from "../../const/Apis";
import SubtitleList from "../../components/common/SubtitleList";
import OfferList from "../../components/common/OfferList";
import PreviewComponents from "../../components/common/PreviewComponents";


export default function DirectionDetailPage() {
  const [metaData, setMetaData] = useState({});
  const [directionData, setDirectionData] = useState({});
  const [directionRecent, setDirectionRecent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todayWeather, setTodayWeather] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  
  const router = useRouter();
  const detailId = router.query.id;

  const contentData = directionData?.contents ? JSON.parse(directionData.contents[0].content) : []
  const subtitleList = contentData.filter((item, i) => item.tool == 'subtitle' && item.data.size == "level1")
  const getDirectionRecent = () => {
    setLoading(true);
    axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/direction', { params: {} }
    ).then((res) => {
      setDirectionRecent(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getDirectionData = (id) => {
    setLoading(true);
    axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/direction/' + id,
      {
        id
      }).then((res) => {
        setDirectionData(res.data.data);
        setTodayWeather(res.data.data.weathers);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getDirectionData(detailId);
    getDirectionRecent();
  }, [detailId]);
  useEffect(() => {
    getMetaData({}).then(res => {
      setMetaData(res.data.data.filter((ele) => ele.url === window.location.pathname)[0]);
    }).catch(err => {
      console.log(err);
    })
  }, []);
  return (
    <>
      <NextSeo title={metaData?.title} description={metaData?.description} />
      <Helmet>
        <meta name="keywords" content={metaData?.keyword} />
      </Helmet>
      <NavBar />
      {directionData && (
        <div className="bg-white mt-[60px] md:mt-[94px]">
          {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}

          <div className="relative w-full">
            {directionData.bgImg && (
              <ImageChak src={directionData.bgImg} className="w-full h-[280px] md:h-[800px] z-50" objectFit="cover" />
            )}
            <div className="bg-gradient-to-b from-[#000] absolute bottom-0 h-3/5 md:h-2/5 w-full rotate-180"></div>

            <div className="absolute bottom-0 lg:bottom-15 lg:px-[8.33333333%] lg:py-[60px] lg:space-y-8 px-4 py-8 space-y-2">
              <LinkDetail indexName={'Направления'} indexLink={"/direction"} detailName={directionData.name} />
              <h1 className="!text-white md:leading-[65px] leading-[34px] !text-[30px] md:!text-[62px]">
                {directionData.title}
              </h1>
            </div>

          </div>
          <div className="flex flex-col justify-center mx-auto max-w-[1440px]">
            <div className="px-2 md:px-4 max-w-[1200px] mx-auto">
              <div className="flex flex-col lg:flex-row-reverse w-full">
                <div className="w-full lg:w-[694px] relative">
                  <div className="md:pl-12 py-3 md:py-10 space-y-6 md:space-y-14 sticky top-20">
                    <div className="hidden md:flex">
                      <SocialLink />
                    </div>
                    <SubtitleList params={subtitleList} />
                    <OfferList />
                  </div>
                </div>

                <div className="w-full">
                  <div className="space-y-4">
                    <div className="text-base md:text-lg xl:text-lg font-medium text-[#292D32] font-Manrop detail-custom-css">
                      <p dangerouslySetInnerHTML={{ __html: directionData.description }} />
                    </div>
                    {(todayWeather.length > 0) && (
                      <WeatherPanel wData={todayWeather} id={detailId} />
                    )}
                  </div>
                  {
                    contentData.map((item, i) => (
                      <PreviewComponents data={item} key={i} />
                    ))
                  }
                  <div className="mt-4">
                    <button className={`${BtnActive}`}
                      onClick={() => { Router.push('https://AllHotel.com') }}
                      onMouseEnter={() => { setIsHovered(true); }}
                      onMouseLeave={() => { setIsHovered(false); }}
                    >
                      Все отели в цандрыпшэ
                      <ArrowRight color={isHovered ? 'white' : '#FF6432'} />
                    </button>
                  </div>
                  <div className="py-4 md:py-10 space-y-4 font-Manrop">
                    <div className="flex justify-center">
                      <p className="text-[44px] md:text-5xl xl:text-6xl font-normal text-[#FF6432]">
                        ***
                      </p>
                    </div>
                    <p className="text-base md:text-lg font-medium pr-3">
                      {directionData?.heading ? directionData.heading : null}
                    </p>
                    <div className="flex md:hidden justify-center  gap-4">
                      <SocialLink />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      )}

      {/* Telegram */}
      < TeleBookPanel />

      {/* Other Destinations */}
      {directionRecent ? (
        <div className="bg-white" >
          <div className="flex flex-col container mx-auto max-w-[1440px] ">
            <div className="px-4 py-4 md:py-[60px] space-y-4 md:space-y-10">
              <p className="text-2xl md:text-3xl xl:text-[51px] font-bold">
                Другие Направления в Абхазии
              </p>
              <ImgDirectPanel data={directionRecent} link={"/direction/"} />
            </div>
          </div>
        </div >
      ) : null}

      <Footer />
    </>
  );
}

