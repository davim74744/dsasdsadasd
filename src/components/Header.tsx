import Image from "next/image";

const Header: React.FC = () => {
    return (
        <div className="container max-w-4xl mx-auto flex flex-col py-3 text-white p-2">
            <div
                className="flex items-center gap-3 px-5 rounded-t-lg bg-[#BDBDC5] bg-cover bg-center lg:rounded-lg w-full h-25"
                style={{
                    backgroundImage:
                        "url('/FF-f997537d.jpg')",
                }}
            >
                <Image
                    src="/icon.png"
                    alt="Icon"
                    width={72}
                    height={72}
                    className="h-11 w-11 lg:h-[72px] lg:w-[72px]"
                />
                <div className="flex flex-col gap-y-1">
                    <div className="text-xl font-bold text-white">Free Fire</div>
                    <div className="flex items-center rounded border border-white/50 bg-black/[0.65] px-1.5 py-1.5 text-xs font-medium text-white lg:text-sm gap-1">
                        <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 80 80"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="me-1"
                        >
                            <path
                                d="M54.125 34.1211C55.2966 32.9495 55.2966 31.05 54.125 29.8784C52.9534 28.7069 51.0539 28.7069 49.8823 29.8784L38.0037 41.7571L32.125 35.8784C30.9534 34.7069 29.0539 34.7069 27.8823 35.8784C26.7108 37.05 26.7108 38.9495 27.8823 40.1211L35.8823 48.1211C37.0539 49.2926 38.9534 49.2926 40.125 48.1211L54.125 34.1211Z"
                                fill="currentColor"
                            ></path>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M43.4187 3.4715C41.2965 2.28554 38.711 2.28554 36.5889 3.4715L8.07673 19.4055C6.19794 20.4555 4.97252 22.4636 5.02506 24.7075C5.36979 39.43 10.1986 63.724 37.0183 76.9041C38.8951 77.8264 41.1125 77.8264 42.9893 76.9041C69.809 63.724 74.6377 39.43 74.9825 24.7075C75.035 22.4636 73.8096 20.4555 71.9308 19.4055L43.4187 3.4715ZM39.5159 8.7091C39.8191 8.53968 40.1885 8.53968 40.4916 8.7091L68.9826 24.6313C68.6493 38.3453 64.2154 59.7875 40.343 71.5192C40.135 71.6214 39.8725 71.6214 39.6646 71.5192C15.7921 59.7875 11.3583 38.3453 11.025 24.6313L39.5159 8.7091Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <div className="text-xs">Pagamento 100% seguro</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
