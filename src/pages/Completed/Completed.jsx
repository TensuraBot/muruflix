import { useParams } from "react-router-dom"
import Pagination from "../../components/elements/Pagination/Pagination.jsx";
import { useEffect, useState } from "react";
import { getCompletedAnime } from "../../Hooks/Api/index.js";
import Loading from "../../components/layouts/Loading/Loading.jsx";
import Title from "../../components/elements/Title/Title.jsx";
import Card from "../../components/elements/Card/Card.jsx";
import { Helmet } from "react-helmet";

const Completed = () => {
    const {page} = useParams();
    const [completedAnime, setCompletedAnime] = useState([]);

    useEffect(() => {
        async function completedAnime() {
            try {
                const result = await getCompletedAnime(page);
                setCompletedAnime(result);
            } catch (error) {
                console.log(error)
            }
        }

        completedAnime()
    }, [page])

    return(
        <>
            <Helmet>
                <title>Completed Anime - RimuruFlix</title>
                <meta
                name="description"
                content="Nonton anime subtitle Indonesia secara gratis di RimuruFlix"
                />
                <meta name="robots" content="index, follow" />
                <meta
                property="og:title"
                content="Completed Anime - RimuruFlix"
                />
                <meta
                property="og:description"
                content="Nonton anime subtitle Indonesia secara gratis di RimuruFlix"
                />
                <meta property="og:locale" content="id_ID" />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="RimuruFlix" />
                <meta property="og:image" content="https://i.imghippo.com/files/vYItz1727847554.png" />
                <meta name="googlebot" content="index, follow" />
                <meta name="twitter:title" content="Completed Anime - RimuruFlix" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="keywords" content="RimuruFlix, otakudesu, RimuruFlix, kuramanime, web streaming anime, moenime, moenime id, moenime list, moe anime, anime batch indonesia, anime batch sub indo, animebatch sub indo, anime batch terbaru, download anime batch subtitle indonesia, situs download anime, anime sub indo, download anime sub indo, download anime subtitle indonesia, download anime terbaru, download anime bd, download anime movie, download anime batch, download anime batch sub indo, download anime batch subtitle indonesia terlengkap, streaming anime, streaming anime sub indo, streaming anime subtitle indonesia, streaming anime sub indo lengkap" />
                <meta name="twitter:description" content="Nonton Anime Online Sub Indo Gratis di RimuruFlix" />
                <meta
                name="twitter:image"
                content="https://i.imghippo.com/files/c0C9R1727916654.png"
                />
            </Helmet>
            {
                completedAnime.status === "success" ? (
                    (<main className="px-5 md:px-10 lg:px-16 my-14">
                    <Title>Completed Anime List</Title>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 py-5 px-6">
                    {
                        completedAnime.animeList.map((data, index) => {
                            return(
                                <Card
                                    key={index}
                                    imgUrl={data.thumb}
                                    href={`/anime/${data.id}`}
                                    title={data.title}
                                    episode={data.episode.replace("Episode", " Episode")}
                                    rating={`☆ ${data.score}`}
                                />
                            )
                        })
                    }
                    </div>
                    <Pagination currentPage={parseInt(page) || 1} totalPages={completedAnime.maxPage} destination="completed" />
                </main>)
                ) : <Loading />
            }
            </>
    )
}

export default Completed;