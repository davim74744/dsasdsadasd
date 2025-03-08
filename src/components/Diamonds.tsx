'use client';

import { useState } from "react";
import Image from "next/image";

interface DiamondsProps {
    setSelectedPackage: React.Dispatch<React.SetStateAction<{
        value: string;
        diamonds: string;
        bonus: string;
        produtonome: string;
    } | null>>;
    selectedPackage: {
        value: string;
        diamonds: string;
        bonus: string;
        produtonome: string;
    } | null;
    setSelectedOffer: React.Dispatch<React.SetStateAction<{
        value: string;
        produtonome: string;
    } | null>>;
    selectedOffer: { value: string; produtonome: string } | null;
}

const Diamonds: React.FC<DiamondsProps> = ({ setSelectedPackage, selectedPackage, setSelectedOffer, selectedOffer }) => {
    const packages = [
        { value: "20,00", diamonds: "850", bonus: "250", produtonome: "850 diamantes + 250", imageSrc: "/diamante.png" },
        { value: "35,00", diamonds: "1.650", bonus: "390", produtonome: "1.650 diamantes + 390", imageSrc: "/diamantes.png" },
        { value: "50,00", diamonds: "2.450", bonus: "685", produtonome: "2.450 diamantes + 685", imageSrc: "/diamantes.png" },
        { value: "100,00", diamonds: "6.100", bonus: "1.010", produtonome: "6.100 diamantes + 1.010", imageSrc: "/diamantes2.png" },
        { value: "135,00", diamonds: "12.200", bonus: "2.350", produtonome: "12.200 diamantes + 2.350", imageSrc: "/diamantes2.png" },
        { value: "180,00", diamonds: "16.500", bonus: "5.100", produtonome: "16.500 diamantes + 5.100", imageSrc: "/diamantes2.png" },
    ];

    const offers = [
        { name: "Assinatura Mensal", imageSrc: "/passemensal.png", value: "35,00" },
        { name: "Top Criminais", imageSrc: "/topcriminal.jpg", value: "30,00" },
        { name: "Skins Naruto e Sasuke", imageSrc: "/narutosasuke.jpg", value: "45,00" },
        { name: "Pacote Hip Hop", imageSrc: "/hiphop.jpg", value: "30,00" },
        { name: "Calça Angelical Amarela", imageSrc: "/angelicalamarela.jpeg", value: "25,00" },
    ];

    const handleSelectPackage = (value: string, diamonds: string, bonus: string, produtonome: string) => {
        setSelectedPackage({ value, diamonds, bonus, produtonome });
        setSelectedOffer(null);
    };

    const handleSelectOffer = (offer: { name: string; value: string }) => {
        setSelectedOffer({ value: offer.value, produtonome: offer.name });
        setSelectedPackage(null);
    };

    return (
        <div className="w-full relative flex flex-col my-6">
            <div className="flex gap-x-2 items-center">
                <div className="flex gap-x-3 items-center">
                    <div className="text-white text-sm font-bold bg-red-600 px-3 p-1 rounded-md">2</div>
                    <div className="text-white text-md font-bold">VALOR DE RECARGA</div>
                </div>
                <hr className="ms-2 grow border-gray-800 text-white" role="none" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-4">
                {packages.map((pkg, index) => (
                    <div
                        key={index}
                        className={`select-none md:w-70 w-full rounded border border-white/5 p-5 flex justify-between cursor-pointer 
                            ${selectedPackage?.value === pkg.value ? "bg-red-900" : "bg-white/5"}`}
                        onClick={() => handleSelectPackage(pkg.value, pkg.diamonds, pkg.bonus, pkg.produtonome)}
                    >
                        <div className="flex flex-col gap-y-4">
                            <div className="text-md text-white/70 font-semibold">R$ {pkg.value}</div>
                            <div className="flex flex-col text-sm text-white">
                                <div className="text-white/70">{pkg.diamonds} diamantes</div>
                                <div className="text-red-500 font-medium">+{pkg.bonus} de bônus</div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <Image
                                src={pkg.imageSrc}
                                alt="Icon"
                                width={50}
                                height={50}
                                className="h-11 w-11 lg:h-[50px] lg:w-[50px]"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full relative flex flex-col mb-15">
                <div className="flex items-center">
                    <div className="text-white">Ofertas especiais</div>
                    <hr className="ms-2 grow border-gray-800 text-white" role="none" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-4">
                    {offers.map((offer, index) => (
                        <div
                            key={index}
                            className={`select-none md:w-70 w-full rounded border border-white/5 p-3 cursor-pointer
                                ${selectedOffer?.produtonome === offer.name ? "bg-red-900" : "bg-white/5"}`}
                            onClick={() => handleSelectOffer(offer)}
                        >
                            <div className="flex flex-col justify-center items-center gap-y-2">
                                <Image
                                    src={offer.imageSrc}
                                    alt="Icon"
                                    width={200}
                                    height={50}
                                    className="h-50 w-50"
                                />
                                <div className="text-white text-sm font-semibold">{offer.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Diamonds;