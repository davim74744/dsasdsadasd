import Image from "next/image";

const Logo: React.FC = () => {
    return (
        <div className="relative w-full bg-[#151718] border-b border-white/5 p-2">
            <div className="container max-w-4xl mx-auto flex flex-col py-5 text-white md:p-2 gap-y-8">
                <div className="flex justify-between">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={168}
                        height={42}
                        className="w-42"
                    />
                </div>
            </div>
        </div>

    );
};

export default Logo;
