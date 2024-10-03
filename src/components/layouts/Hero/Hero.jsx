const Hero = () => {
    return (
        <>
            <div className="flex bg-bg-kumanime justify-evenly items-center m-auto h-[80vh] font-poppins">
                <div className="hero-text max-w-[40%] text-white">
                    <h3 className="font-bold text-xl md:text-2xl lg:text-4xl text-center md:text-left">Selamat Datang di <span className="text-kumanime">RimuruFlix</span></h3>
                    <p className="text-xs md:text-sm mt-3 mb-6 text-center md:text-left">Tempatnya streaming anime gratis subtitle Indonesia! Cuma di RimuruFlix 💙</p>
                </div>
                <img src="rimuru-flix.png" alt="Rimuru Png" className="w-[550px] hidden md:block" />
            </div>
        </>
    )
}

export default Hero;