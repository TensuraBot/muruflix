import { useEffect, useState } from "react";
import AsideCard from "../../components/elements/AsideCard/AsideCard";
import Card from "../../components/elements/Card/Card";
import Aside from "../../components/fragments/Aside/Aside";
import Hero from "../../components/layouts/Hero/Hero"
import Cards from "../../components/layouts/Cards/Cards";
import { getAnimeDetails, getAnimeNews, getLatestAnime } from "../../Hooks/Api";
import Title from "../../components/elements/Title/Title";
import Slider from "../../components/layouts/Slider/Slider";
import Loading from "../../components/layouts/Loading/Loading";
import { Helmet } from "react-helmet";

const Homepage = () => {

    const [latestAnimeData, setLatestAnimeData] = useState([]);
    const [newsAnimeData, setNewsAnimeData] = useState([]);
    const [history, setHistory] = useState([]);

    const isHistoryExist = localStorage.getItem("history");

    useEffect(() => {
        async function getBookmarkData() {
            try {
                const result = JSON.parse(localStorage.getItem('history') || '[]');
                const updatedHistories = await Promise.all(result.map(async (history) => {
                    const animeDetails = await getAnimeDetails(history.mainSlug);
                    return {...animeDetails, epsSlug: history.epsSlug, episode: history.episode};
                }));
                setHistory(updatedHistories);
                console.log(updatedHistories);
            } catch (error) {
                console.log(error);
            }
        }

        if(isHistoryExist) {
            getBookmarkData();
        }
    }, [isHistoryExist])
    
    useEffect(() => {
        async function latestAnime() {
            try {
                const result = await getLatestAnime();
                setLatestAnimeData(result);
            } catch (error) {
                console.log(error);
            }
        }

        latestAnime();
    }, [])

    useEffect(() => {
        async function newsData() {
            try {
                const result = await getAnimeNews();
                setNewsAnimeData(result);
            } catch (error) {
                console.log(error);
            }
        }

        newsData();
    }, [])

    return (
        <>
            <Helmet>
                <title>RimuruFlix - Streaming Anime Sub Indo</title>
                <meta
                name="description"
                content="Nonton anime subtitle Indonesia secara gratis di RimuruFlix"
                />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta
                property="og:title"
                content="RimuruFlix - Streaming Anime Sub Indo"
                />
                <meta
                property="og:description"
                content="Nonton anime subtitle Indonesia secara gratis di RimuruFlix"
                />
                <meta property="og:locale" content="id_ID" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="RimuruFlix" />
                <meta property="og:image" content="https://i.imghippo.com/files/c0C9R1727916654.png" />
                <meta name="twitter:title" content="RimuruFlix - Streaming Anime Subtitle Indonesia Secara Gratis" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="keywords" content="RimuruFlix, otakudesu, RimuruFlix, RimuruFlux, web streaming anime, moenime, moenime id, moenime list, moe anime, anime batch indonesia, anime batch sub indo, animebatch sub indo, anime batch terbaru, download anime batch subtitle indonesia, situs download anime, anime sub indo, download anime sub indo, download anime subtitle indonesia, download anime terbaru, download anime bd, download anime movie, download anime batch, download anime batch sub indo, download anime batch subtitle indonesia terlengkap, streaming anime, streaming anime sub indo, streaming anime subtitle indonesia, streaming anime sub indo lengkap" />
                <meta name="twitter:description" content="Nonton Anime Online Sub Indo Gratis di RimuruFlix" />
                <meta
                name="twitter:image"
                content="https://i.imghippo.com/files/c0C9R1727916654.png"
                />
            </Helmet>
            {(latestAnimeData.status === "success" && newsAnimeData) ? (
                <>
                    <Hero />
                    <div className="main gap-5 px-7 pt-10 grid lg:grid-cols-9 grid-cols-1 bg-bg-kumanime">
                        <div className="lg:col-span-6 lg:mx-5 lg:px-10">
                            <div className={!isHistoryExist ? "hidden" : ""}>
                                <Title>Lanjut Nonton</Title>
                                <Slider>
                                    {
                                        history.map((data, index) => {
                                            return(
                                                <div className="swiper-slide" key={index}>
                                                    <Card
                                                        imgUrl={data.poster}
                                                        title={data.title}
                                                        href={`/watch/${data.epsSlug}`}
                                                        rating={`☆ ${data.score || "0"}`}
                                                        episode={`Episode ${data.current_episode}`}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                            <div className="latest mb-5">
                                <div className="flex justify-between items-center">
                                    <Title>Update Terbaru</Title>
                                    <a href="/ongoing/page/1"className="text-white font-semibold transition-all hover:text-kumanime font-poppins text-xs md:text-sm">Lihat Semua {">>"}</a>
                                </div>
                                <Cards>
                                    {
                                        latestAnimeData.home.on_going.map((data, index) => {
                                            return (
                                                <Card
                                                    key={index}
                                                    imgUrl={data.poster}
                                                    title={data.title}
                                                    href={`/anime/${data.id}`}
                                                    episode={data.current_episode}
                                                    rating="Baru"
                                                />
                                            )
                                        })
                                    }
                                </Cards>
                            </div>

                            <div>
                                <div className="flex justify-between items-center">
                                    <Title>Anime Selesai</Title>
                                    <a href="/completed/page/1" className="text-white font-semibold transition-all hover:text-kumanime font-poppins text-xs md:text-sm">Lihat Semua {">>"}</a>
                                </div>
                                <Slider>
                                    {
                                        latestAnimeData.home.complete.map((data, index) => {
                                            return(
                                                <div className="swiper-slide" key={index}>
                                                    <Card
                                                        imgUrl={data.poster}
                                                        title={data.title}
                                                        href={`/anime/${data.id}`}
                                                        episode={data.episode.replace("Episode", " Episode")}
                                                        rating={`☆ ${data.score}`}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                        
                        <div className="lg:col-span-3">
                            <Title>Berita</Title>
                            <div className="bg-bg-kumanime-semi">
                                <Aside>
                                    {
                                        newsAnimeData.slice(0, 7).map((data, index) => {
                                            return (
                                                <AsideCard
                                                    key={index}
                                                    imgUrl={data.thumbnail}
                                                    title={data.title}
                                                    href={data.url}
                                                    topics={data.topics}
                                                    uploaded={data.uploadedAt}
                                                />
                                            )
                                        })
                                    }
                                </Aside>
                            </div>
                        </div>

                    </div>
                </>
            ) : <Loading />}
        </>
    )
}

export default Homepage;
