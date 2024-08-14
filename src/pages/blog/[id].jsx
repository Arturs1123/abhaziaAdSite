import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import moment from "moment";
import Image from "next/image";
import { Image as ImageChak } from '@chakra-ui/react'
import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";
import Repeat from "../../../public/img/SVG/Repeat";
import BlogAnswerPanel from "../../components/blog/BlogAnswerPanel";
import BlogAnswerPanelRepeat from "../../components/blog/BlogAnswerPanelRepeat";
import TeleBookPanel from "../../components/common/TeleBookPanel";
import ImageBottomText from "../../components/blog/ImageBottomText";
import LinkDetail from "../../components/common/LinkDetail";
import { Helmet } from 'react-helmet';
import { getMetaData } from "../../const/Apis";
import SubtitleList from "../../components/common/SubtitleList";
import PreviewComponents from "../../components/common/PreviewComponents";
import SocialLink from "../../components/common/SocailLink";

const BlogDetailPage = () => {
  const [metaData, setMetaData] = useState({});
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [blogRecent, setBlogRecent] = useState([]);
  const detailId = router.query.bid;
  const [curSi, setCurSi] = useState(0);
  const contentData = blogData?.contents ? JSON.parse(blogData.contents[0].content) : []
  const subtitleList = contentData.filter((item, i) => item.tool == 'subtitle' && item.data.size == "level1")

  const handleArrowClick = (step) => {
    let _curSi = curSi
    _curSi += step;
    _curSi = (_curSi < 0) ? 0 : _curSi;
    _curSi = (_curSi > blogRecent.length - 3) ? blogRecent.length - 3 : _curSi;
    setCurSi(_curSi);
  }

  const getBlogData = (detailId) => {
    setLoading(true);
    axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/blog/detail/' + detailId).then((res) => {
      setBlogData(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getBlogRecent = () => {
    setLoading(true);
    axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/blog',
      { params: {} }
    ).then((res) => {
      setBlogRecent(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getBlogData(detailId);
    getBlogRecent();
  }, [detailId]);

  useEffect(() => {
    getMetaData({}).then(res => {
      setMetaData(res.data.data.filter((ele) => ele.url === useRouter().pathname)[0]);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div>
      <NextSeo title={metaData?.title} description={metaData?.description} />
      <Helmet>
        <meta name="keywords" content={metaData?.keyword} />
      </Helmet>
      <NavBar />
      {blogData ? (
        <div className="bg-white mt-[60px] md:mt-[94px]">
          {loading && (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>)}
          <div className="relative w-full">
            {blogData.bgImg ? (
              <ImageChak src={blogData.bgImg} className="w-full h-[280px] md:h-[800px] z-50" objectFit="cover" />
            ) : null}
            <div className="bg-gradient-to-b from-[#000] absolute bottom-0 h-3/5 md:h-2/5 w-full rotate-180"></div>
            <div className="absolute bottom-0 lg:bottom-15 lg:px-[8.33333333%] lg:py-[60px] lg:space-y-8 px-4 py-8 space-y-2">
              <LinkDetail indexName={'Блог'} indexLink={"/blog"} detailName={blogData.title} />
              <h1 className="!text-white md:leading-[65px] leading-[34px] !text-[30px] md:!text-[62px]">
                {blogData.title}
              </h1>
            </div>
          </div>
          <div className="flex flex-col mx-auto max-w-[1440px] items-center">
            <div className="pl-2 md:px-4 max-w-[1200px] flex flex-col lg:flex-row-reverse w-full">
              <div className="w-full lg:w-[42%] top-0 relative">
                <div className="sticky top-6">
                  <div className="md:pl-16 py-3 md:py-10 space-y-6 md:space-y-14">
                    <div className="flex md:hidden justify-between items-center">
                      <p className="text-base font-medium text-[#919494] ">
                        10 октября 2023
                      </p>
                      <SocialLink />
                    </div>
                    <SocialLink className="hidden md:flex" />
                    <SubtitleList params={subtitleList} />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-[58%]">
                <div className="py-3 md:py-10 space-y-4">
                  <div className="text-base md:text-lg xl:text-lg font-medium text-[#292D32] font-Manrop detail-custom-css">
                    <p dangerouslySetInnerHTML={{ __html: blogData.description }} />
                  </div>
                </div>
                {
                  contentData.map((item, i) => (
                    <PreviewComponents data={item} key={i} />
                  ))
                }
                <div className="py-4 md:py-10 space-y-4 md:space-y-8">
                  <p className="text-2xl md:text-3xl xl:text-[44px] xl:leading-[52.8px] font-semibold">
                    Комментарии
                  </p>
                  <div className="flex flex-col md:flex-row gap-y-4">
                    <div className="w-full md:w-[10%] mr-2">
                      <div className="flex w-12 md:w-14 h-12 md:h-14 rounded-full bg-[#D7D7D7] justify-center items-center">
                        <Image src={'/img/SVG/User.svg'} width={24} height={24} />
                      </div>
                    </div>
                    <div className="flex flex-col w-full md:w-[90%] border border-[#D7D7D7] rounded-xl shadow">
                      <input
                        type="text"
                        className="outline-none p-4 w-full rounded-xl text-base md:text-lg font-medium"
                        placeholder="Ваш комментарий"
                      />
                      <div className="flex p-4 justify-end">
                        <button className="rounded-lg px-5 py-2 bg-[#FF6432] text-sm font-medium text-white">
                          Отправить
                        </button>
                      </div>
                    </div>
                  </div>


                  <div className="space-y-6">
                    <BlogAnswerPanel
                      id={1}
                      userName={'Анастасия'}
                      avatar={'/icon/avatar.png'}
                      answer={'Есле есть задолженость по кредиту то пропустят черег границу с сочи В гагры'}
                      aDate={moment().format("YYYY-MM-DD")}
                    />
                    <BlogAnswerPanelRepeat
                      id={1}
                      userName={'Анастасия'}
                      avatar={'/icon/avatar.png'}
                      answer={'Спасибо за ответ!'}
                      aDate={moment().format("YYYY-MM-DD")}
                    />
                  </div>
                  {/* new Question */}

                  <BlogAnswerPanel
                    id={1}
                    userName={'Анастасия'}
                    avatar={'/icon/avatar.png'}
                    answer={'Есле есть задолженость по кредиту то пропустят черег границу с сочи В гагры'}
                    aDate={moment().format("YYYY-MM-DD")}
                    feedCount={10}
                  />

                  {/* new Answer Form */}
                  <div className="flex  font-Manrop">
                    <div className="flex flex-col w-[15%] md:w-[10%] h-14 justify-center items-center">
                      <Repeat />
                      <p className="text-xs md:text-sm xl:text-base text-center font-medium text-[#919494]">
                        ответ
                      </p>
                    </div>
                    <div className="flex flex-col w-[85%] md:w-[90%] border border-[#D7D7D7] rounded-xl shadow">
                      <input
                        type="text"
                        className="outline-none p-4 w-full rounded-xl text-sm md:text-base xl:text-lg font-medium"
                        placeholder="Ваш Ответить"
                      />
                      <div className="flex p-4 justify-end">
                        <button className="rounded-lg px-5 py-2 bg-[#FF6432] text-sm font-medium text-white">
                          Отправить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* Telegram */}
      <TeleBookPanel />
      {/* Other Destinations */}
      {blogRecent ? (
        <div className="bg-white">
          <div className="flex flex-col container mx-auto max-w-[1440px] ">
            <div className="px-4 md:px-[8.3333333%] py-6 md:py-[60px] space-y-4 md:space-y-10">
              <p className="text-2xl md:text-3xl xl:text-[51px] font-bold">
                Другие статьи
              </p>
              <div>
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="hidden md:block ">
                    <Image className="cursor-pointer"
                      src={'/icon/ArrowLeft.png'} width={48} height={48} layout="fixed"
                      onClick={() => handleArrowClick(-1)} />
                  </div>
                  <div className="grid grid-cols-3 w-full gap-4">
                    {
                      blogRecent?.slice(curSi, curSi + 3).map((v, i, a) => (
                        <div key={i} className="col-span-3 md:col-span-1">
                          <ImageBottomText
                            uniqueLink={v.uniqueLink}
                            id={v.id}
                            imgSrc={v.bgImg}
                            imgDesc={v.title}
                            imgDate={v.createAt}
                            imgType={v.seos[0]?.keyword}
                          />
                        </div>
                      ))
                    }
                  </div>
                  <div className="hidden md:block ">
                    <Image className="cursor-pointer"
                      src={'/icon/ArrowRight.png'} width={48} height={48} layout="fixed"
                      onClick={() => handleArrowClick(1)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      ) : null}
      <Footer />
    </div >
  );
}

export default BlogDetailPage;