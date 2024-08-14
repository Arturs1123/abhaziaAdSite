import { useEffect, useState } from "react";
import Router, { useRouter } from 'next/router';
import { Image as ImageChak } from '@chakra-ui/react'
import axios from "axios";
import { NextSeo } from "next-seo";
import { TailSpin } from "react-loader-spinner";
import { BtnActive } from '../../const/CustomConsts';
import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";
import TeleBookPanel from "../../components/common/TeleBookPanel";
import ImgAttractionPanel from "../../components/attraction/ImgAttractionPanel";
import LinkDetail from "../../components/common/LinkDetail";
import SocialLink from "../../components/common/SocailLink";
import { ArrowRight } from 'react-bootstrap-icons';
import { Helmet } from 'react-helmet';
import { getMetaData } from "../../const/Apis";
import SubtitleList from "../../components/common/SubtitleList";
import PreviewComponents from "../../components/common/PreviewComponents";

const AttractionDetail = () => {
  const [metaData, setMetaData] = useState({});
  const [isHovered1, setIsHovered1] = useState(false);

  const [loading, setLoading] = useState(false);
  const [attractionData, setAttractionData] = useState([]);
  const [attractionRecent, setAttractionRecent] = useState([]);
  const router = useRouter();
  const detailId = router.query.aid;

  const contentData = attractionData?.contents ? JSON.parse(attractionData.contents[0].content) : []
  const subtitleList = contentData.filter((item, i) => item.tool == 'subtitle' && item.data.size == "level1")

  const getAttractionRecent = () => {
    setLoading(true);
    axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/attraction').then((res) => {
      console.log(res.data.data)
      setAttractionRecent(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }
  const getAttractionData = (id) => {
    setLoading(true);
    axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/attraction/' + id).then((res) => {
      setAttractionData(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    if (detailId > 0) getAttractionData(detailId);
    getAttractionRecent();
  }, [detailId])
  useEffect(() => {
    getMetaData({}).then(res => {
      setMetaData(res.data.data.filter((ele) => ele.page === 'attraction-detail')[0]);
    }).catch(err => {
      console.log(err);
    })
  }, []);
  return (
    <>
      {/* <NextSeo title={`Достопримечательности-${attractionData.name}`} /> */}
      <NextSeo title={metaData?.title} description={metaData?.description} />
      <Helmet>
        {/* <title>{metaData?.title}</title>
            <meta name="description" content={metaData?.description} /> */}
        <meta name="keywords" content={metaData?.keyword} />
      </Helmet>
      <NavBar />
      {attractionData ? (
        <div className="bg-white mt-[60px] md:mt-[94px]">
          {loading && (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>)}
          <div className="relative w-full">
            {/* <img src='/img/attraction.png' alt="Picture" width={900} height={600} layout="responsive" /> */}
            {attractionData.bgImg ? (
              <ImageChak src={attractionData.bgImg} className="object-cover w-full h-[280px] md:h-[800px] z-50" />
              // <img loader={imageLoader} src={attractionData.bgImg} width={1440} height={990} />
            ) : null}
            <div className="bg-gradient-to-b from-[#000] absolute bottom-0 h-3/5 md:h-2/5 w-full rotate-180"></div>

            <div className="absolute bottom-0 lg:bottom-15 lg:px-[8.33333333%] lg:py-[60px] lg:space-y-8 px-4 py-8 space-y-2">
              <LinkDetail indexName={'Достопримечательности'} indexLink={"/attraction"} detailName={attractionData.name} />
              <h1 className="!text-white md:leading-[65px] leading-[34px] !text-[30px] md:!text-[62px]">
                {attractionData.name}
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center mx-auto max-w-[1440px]">
            <div className="pl-2 md:px-4 max-w-[1200px]">
              <div className="flex flex-col lg:flex-row-reverse w-full">
                <div className="w-full lg:w-[694px] relative">
                  <div className="sticky top-20">
                    <div className="md:pl-16 py-3 md:py-10 space-y-6 md:space-y-8">
                      <div className="hidden md:flex md:mb-14">
                        <SocialLink />
                      </div>
                      <SubtitleList params={subtitleList} />
                      <div className="flex justify-center w-full">
                        <button className={`${BtnActive}`}
                          onClick={() => { Router.push('/') }}
                          onMouseEnter={() => { setIsHovered1(true); }}
                          onMouseLeave={() => { setIsHovered1(false); }}
                        >
                          Забронировать экскурсию
                          <ArrowRight color={isHovered1 ? 'white' : '#FF6432'} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="py-3 md:py-10 space-y-4">
                    <div className="text-base md:text-lg xl:text-lg font-medium text-[#292D32] font-Manrop detail-custom-css">
                      <p dangerouslySetInnerHTML={{ __html: attractionData.description }} />
                    </div>
                  </div>
                  {
                    contentData.map((item, i) =>
                      <PreviewComponents data={item} key={i} />
                    )
                  }
                  <div className="py-4 md:py-10 space-y-4 font-Manrop">
                    <div className="flex justify-center">
                      <p className="text-[44px] md:text-5xl xl:text-6xl font-normal text-[#FF6432]">
                        ***
                      </p>
                    </div>
                    <p className="text-base md:text-lg font-medium pr-3">
                      {attractionData?.heading ? attractionData.heading : null}
                    </p>
                    <div className="flex md:hidden justify-center">
                      <SocialLink />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      ) : null}


      {/* Telegram */}
      <TeleBookPanel />

      {/* Other Destinations */}
      {
        attractionRecent ? (
          <div className="bg-white">
            <div className="flex flex-col container mx-auto max-w-[1440px] ">
              <div className="px-4 py-4 md:py-[60px] space-y-4 md:space-y-10">
                <p className="text-2xl md:text-3xl xl:text-[51px] font-bold">
                  Другие Достопримечательности в Абхазии
                </p>
                <ImgAttractionPanel data={attractionRecent} link={"/attraction/"} />
              </div>
            </div>
          </div>
        ) : null
      }
      <Footer />
    </>
  );
}

export default AttractionDetail;
