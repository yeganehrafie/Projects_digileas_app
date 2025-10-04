import Header from "./Header";
import HeroSlider from "./Hero_Slider";
import Img_baner1 from '../../images/baner-1.webp';
import Img_baner2 from '../../images/baner-2.webp';
import Img_baner3 from '../../images/baner-3.webp';
import '../../animateAos.css';
const Main = () => {

    const Img_Baners = [
        { id: 1, img: Img_baner1 },
        { id: 2, img: Img_baner2 },
        { id: 3, img: Img_baner3 },
    ];
    return (
        <main>
            <div className=" min-h-screen bg-white">
                <Header />
                <HeroSlider />
                <section id="baners" className="pb-20">
                    <div className="baners flex flex-col md:flex-row items-center justify-center gap-6 px-[12%] mt-20 ">
                        {Img_Baners.map((baner) => (
                            <div
                                key={baner.id}
                                className="w-full  max-w-full overflow-hidden rounded-xl shadow-md"
                            >
                                <img
                                    src={baner.img}
                                    alt={`بنر ${baner.id}`}
                                    className="w-full h-auto object-cover
                                    cursor-pointer
                                    transition-transform duration-500 ease-in-out
                                    hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>

    );
}

export default Main;