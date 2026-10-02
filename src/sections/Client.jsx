import TelenorLogo from "../assets/images/logos/telenor.png";
import PizzaHutLogo from "../assets/images/logos/pizzahut.png";
import NagaseLogo from "../assets/images/logos/nagase.svg";
import RapidDataLogo from "../assets/images/logos/rapiddata.png";
import BamThailandLogo from "../assets/images/logos/bam-thailand.svg";

const clients = [
    { name: "Telenor Myanmar", logo: TelenorLogo },
    { name: "Pizza Hut Myanmar", logo: PizzaHutLogo },
    { name: "Nagase Thailand", logo: NagaseLogo },
    { name: "Rapid Data GmbH", logo: RapidDataLogo, size: "h-32 md:h-48" },
    { name: "BAM Thailand", logo: BamThailandLogo },
];

const Client = () => {
    const clientTrack = [...clients, ...clients];

    return (
        <section className="section flex flex-col gap-10 md:gap-16 px-6 md:px-12 py-20 overflow-hidden">
            <div className="reveal flex flex-row justify-between items-start section-marker text-muted">
                <span>Clients</span>
                <span className="hidden md:block">Worked With</span>
            </div>

            <div className="reveal flex flex-col gap-3">
                <h1 className="hero__title text-outline text-tan font-saunde leading-[0.85] lg:text-[4rem] md:text-5xl text-4xl uppercase">
                    5 Countries
                </h1>
                <p className="font-raleway text-sm text-muted">
                    Myanmar · Thailand · Japan · Germany · Norway
                </p>
            </div>

            <div className="reveal marquee w-full">
                <div className="marquee__track [animation-duration:12s]">
                    {clientTrack.map((client, index) => (
                        <div key={index} className="flex items-center px-10 shrink-0">
                            <img src={client.logo} alt={client.name} className={`${client.size || "h-16 md:h-24"} w-auto object-contain`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Client;
