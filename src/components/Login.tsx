'use client';

import { useState } from "react";
import Image from "next/image";

interface LoginProps {
    setUserInfo: React.Dispatch<React.SetStateAction<{ name: string; nickname: string; email: string; id: string } | null>>;
}

const Login: React.FC<LoginProps> = ({ setUserInfo }) => {
    const [id, setId] = useState<{ uuid: number } | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [inputUuid, setInputUuid] = useState<string>("");
    const [userInfo, setLocalUserInfo] = useState<{ name: string } | null>(null);

    const handleLogin = async () => {
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: inputUuid }),
            });

            const data = await response.json();

            if (response.ok) {
                const userData = {
                    name: data.nickname,
                    nickname: data.nickname || "",
                    email: data.email || "",
                    id: data.id || ""
                };
                setUserInfo(userData);
                setLocalUserInfo(userData);
                setId({ uuid: data.id });
                setError("");
            } else {
                setUserInfo(null);
                setLocalUserInfo(null);
                setId(null);
                setError(data.error || "Erro desconhecido");
            }
        } catch (err) {
            setError("Erro ao fazer requisição");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full relative flex flex-col">
            <div className="flex gap-x-2 items-center">
                <div className="flex gap-x-3 items-center">
                    <div className="text-white text-sm font-bold bg-red-600 px-3 p-1 rounded-md">1</div>
                    <div className="text-white text-md font-bold">INFORME SEU ID</div>
                </div>
                <hr className="ms-2 grow border-gray-800 text-white" role="none" />
            </div>
            <div className="rounded my-4 text-yellow-600 flex flex-col gap-y-2 text-xs">
            </div>
            <div className="grid grid-cols-1 gap-2">
                <div className="relative w-full">
                    <input
                        type="text"
                        value={inputUuid}
                        onChange={(e) => setInputUuid(e.target.value)}
                        className="outline-none focus:border-red-500 w-full p-2.5 px-4 bg-white/5 rounded border border-white/5 text-sm text-white pr-20"
                        placeholder="ID de jogador"
                    />

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className={`absolute top-0 right-0 p-3.5 h-[2.7rem] text-sm font-medium text-white bg-[#D81A0D] rounded-e-lg flex items-center justify-center
        ${loading ? "bg-[#c41a07] cursor-not-allowed" : "hover:bg-[#c41a07] focus:bg-[#c41a07]"}`}
                    >
                        {loading ? (
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
                                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : "Entrar"}
                    </button>

                    {error && (
                        <div id="error-icon" className="mt-2 text-red-400 text-xs">
                            <div className="flex items-center">
                                <span className="mr-1">❌</span>
                                <span>{error}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {userInfo && (
                <div className="my-4 relative">
                    <div className="flex border border-white/5 rounded p-3 w-80 gap-2">
                        <Image
                            src="/avatar.png"
                            alt="Icon"
                            width={50}
                            height={50}
                            className="rounded-full w-10 h-10 lg:h-[50px] lg:w-[50px]"
                        />
                        <div className="flex flex-col justify-center">
                            <div className="flex gap-x-1 text-xs text-white">
                                Usuário: <div className="text-xs font-semibold">{userInfo.name}</div>
                            </div>
                            <div className="flex gap-x-1 text-xs text-white">
                                ID do jogador: <div className="text-xs font-semibold">{id?.uuid}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;