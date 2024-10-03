import { Link, useRouteError } from "react-router-dom";
import Footer from "../../components/layouts/Footer/Footer";
import Navbar from "../../components/layouts/Navbar/Navbar";
import { Helmet } from "react-helmet";

const Error = () => {
    return (
        <>
            <Helmet>
                <title>RimuruFlix - Error</title>
            </Helmet>
            <Navbar />
            <div className="w-full h-[80vh] grid place-items-center text-white font-poppins">
                <div className="text-center">
                    <img src="https://i.imghippo.com/files/vYItz1727847554.png" alt="" className="m-auto w-2/3" />
                    <p className="py-6 text-white">Oops! Halaman tidak tersedia~</p>
                    <Link to="/" className="bg-kumanime rounded-full py-2 px-8 text-sm">{"<<"} Back To HomePage</Link>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Error;