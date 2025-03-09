'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';

interface PaymentBarProps {
    selectedPackage: { value: string; diamonds: string; bonus: string; produtonome: string } | null;
    selectedOffer: { value: string; produtonome: string } | null;
    userInfo: { name: string; nickname: string; email: string; id: string } | null;
}

const PaymentBar: React.FC<PaymentBarProps> = ({ selectedPackage, selectedOffer, userInfo }) => {
    const [pixData, setPixData] = useState<{ pixcopiaecola: string; qrcodeBase64: string } | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const isUserInfoValid = userInfo?.name;
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [showToast, setShowToast] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const formatCpf = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length > 11) return cpf;
        let formattedValue = numericValue;
        if (numericValue.length > 9) {
            formattedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9)}`;
        } else if (numericValue.length > 6) {
            formattedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
        } else if (numericValue.length > 3) {
            formattedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
        }
        return formattedValue;
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedCpf = formatCpf(e.target.value);
        setCpf(formattedCpf);
    };

    const handleOpenModal = () => {
        if (isUserInfoValid) setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setStep(1);
        setCaptchaValue(null);
        setName('');
        setCpf('');
        setEmail('');
        setLoading(false);
        setShowToast(false);
    };

    const handleNextStep = async () => {
        if (step === 1) {
            setLoading(true);
            setTimeout(() => {
                setStep(2);
                setLoading(false);
            }, 500);
        } else if (step === 2) {
            if (!recaptchaRef.current) return;
            setLoading(true);
            recaptchaRef.current.execute();
        }
    };

    const handlePrevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleCaptchaChange = async (value: string | null) => {
        setCaptchaValue(value);
        if (value && step === 2) {
            try {
                const response = await fetch('/api/gerarpix', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        recaptchaResponse: value,
                        name,
                        cpf: cpf.replace(/\D/g, ''),
                        email,
                        valor: selectedPackage?.value || selectedOffer?.value,
                        produto: selectedPackage?.produtonome || selectedOffer?.produtonome,
                    }),
                });
                const data = await response.json();

                if (data.success) {
                    setPixData(data.pixData);
                    setStep(3);
                } else {
                    alert('Falha na verificação do reCAPTCHA ou dados inválidos. Tente novamente.');
                    recaptchaRef.current?.reset();
                }
            } catch (error) {
                console.error('Erro ao verificar reCAPTCHA:', error);
                alert('Erro ao processar o pagamento. Tente novamente.');
                recaptchaRef.current?.reset();
            } finally {
                setLoading(false);
            }
        }
    };

    const copyToClipboard = () => {
        if (pixData?.pixcopiaecola) {
            navigator.clipboard.writeText(pixData.pixcopiaecola);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    const handleInputClick = () => {
        if (pixData?.pixcopiaecola) {
            navigator.clipboard.writeText(pixData.pixcopiaecola);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    return (
        <>
            <div className="fixed w-full bg-white border-t border-black/5 bottom-0 md:px-0 px-3 z-10">
                <div className="container max-w-4xl mx-auto flex py-3 text-black p-2 md:justify-end justify-between items-center gap-x-6">
                    <div className="flex flex-col">
                        {selectedPackage ? (
                            <>
                                <div className="flex items-center text-sm font-semibold gap-x-2">
                                    <Image src="/points.png" alt="logo" width={24} height={16} className="w-[16px]" />
                                    <div className="flex gap-x-1">
                                        <div className="text-black">{selectedPackage.diamonds}</div>
                                        <div className="flex">
                                            <div className="text-black">+</div>
                                            <div className="ml-1 text-black">{selectedPackage.bonus}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm font-semibold gap-x-1">
                                    <div className="text-black">Total:</div>
                                    <div className="text-red-700">R$ {selectedPackage.value}</div>
                                </div>
                            </>
                        ) : selectedOffer ? (
                            <div className="flex flex-col text-sm font-semibold">
                                <div className="text-black">{selectedOffer.produtonome}</div>
                                <div className="flex items-center gap-x-2">
                                    <div className="text-black">Total:</div>
                                    <div className="text-red-700">R$ {selectedOffer.value}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-500">Selecionar Pacote ou Oferta</div>
                        )}
                    </div>

                    <button
                        onClick={handleOpenModal}
                        className={`flex gap-x-2 items-center px-6 py-2.5 rounded bg-red-700 w-fit text-white font-semibold cursor-pointer shadow ${!isUserInfoValid ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={!isUserInfoValid}
                    >
                        <svg width="1em" height="1em" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M54.125 34.1211C55.2966 32.9495 55.2966 31.05 54.125 29.8784C52.9534 28.7069 51.0539 28.7069 49.8823 29.8784L38.0037 41.7571L32.125 35.8784C30.9534 34.7069 29.0539 34.7069 27.8823 35.8784C26.7108 37.05 26.7108 38.9495 27.8823 40.1211L35.8823 48.1211C37.0539 49.2926 38.9534 49.2926 40.125 48.1211L54.125 34.1211Z"
                                fill="currentColor"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M43.4187 3.4715C41.2965 2.28554 38.711 2.28554 36.5889 3.4715L8.07673 19.4055C6.19794 20.4555 4.97252 22.4636 5.02506 24.7075C5.36979 39.43 10.1986 63.724 37.0183 76.9041C38.8951 77.8264 41.1125 77.8264 42.9893 76.9041C69.809 63.724 74.6377 39.43 74.9825 24.7075C75.035 22.4636 73.8096 20.4555 71.9308 19.4055L43.4187 3.4715ZM39.5159 8.7091C39.8191 8.53968 40.1885 8.53968 40.4916 8.7091L68.9826 24.6313C68.6493 38.3453 64.2154 59.7875 40.343 71.5192C40.135 71.6214 39.8725 71.6214 39.6646 71.5192C15.7921 59.7875 11.3583 38.3453 11.025 24.6313L39.5159 8.7091Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span>Comprar Agora</span>
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-[#222222] rounded-lg p-1.5 md:max-w-lg max-w-sm w-full relative">
                        {/* Enhanced Toast Notification */}
                        {showToast && (
                            <div
                                className="absolute top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-fade-in"
                                style={{ animation: 'fadeIn 0.3s ease-in-out' }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-lg font-semibold">Pix Copiado!</span>
                            </div>
                        )}

                        <div className="bg-[url('/banner.jpg')] bg-cover w-full h-25 rounded-t-lg">
                            <div className="flex justify-center items-center flex-col w-full">
                                <div className="p-1 bg-white mt-16 relative rounded-lg">
                                    <img className="h-11 w-11 lg:h-[50px] lg:w-[50px]" src="/icon.png" alt="Icon" />
                                </div>
                            </div>
                        </div>
                        <br />
                        <ul className="p-1 w-full steps mt-4">
                            <li className={`step ${step >= 1 ? 'step-success' : ''}`}>Dados</li>
                            <li className={`step ${step >= 2 ? 'step-success' : ''}`}>Pagamento</li>
                            <li className={`step ${step >= 3 ? 'step-success' : ''}`}>Finalizar</li>
                        </ul>

                        <div className="relative">
                            <div
                                className={`step-content ${step === 1 ? 'visible' : 'exit'}`}
                                style={{ transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out' }}
                            >
                                {step === 1 && (
                                    <div className="mt-6 space-y-4 p-4">
                                        <div className="form-control w-full">
                                            <input
                                                type="text"
                                                placeholder="Digite seu nome"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="input input-bordered w-full focus:outline-none text-white bg-transparent border-gray-500 text-xs py-1 px-2 rounded-md"
                                            />
                                        </div>

                                        <div className="form-control w-full">
                                            <input
                                                type="text"
                                                placeholder="Digite seu CPF"
                                                value={cpf}
                                                onChange={handleCpfChange}
                                                maxLength={14}
                                                className="input input-bordered w-full focus:outline-none text-white bg-transparent border-gray-500 text-xs py-1 px-2 rounded-md"
                                            />
                                        </div>

                                        <div className="form-control w-full">
                                            <input
                                                type="text"
                                                placeholder="Digite seu E-mail"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="input input-bordered w-full focus:outline-none text-white bg-transparent border-gray-500 text-xs py-1 px-2 rounded-md"
                                            />
                                        </div>

                                        <div className="mt-6 text-right">
                                            <button
                                                onClick={handleNextStep}
                                                disabled={!name || !cpf || !email || loading}
                                                className={`btn btn-primary w-full ${loading ? 'loading' : ''} ${!name || !cpf || !email ? 'btn-disabled' : ''}`}
                                            >
                                                {loading ? 'Carregando...' : 'Próximo'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`step-content ${step === 2 ? 'visible' : 'exit'}`}
                                style={{ transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out' }}
                            >
                                {step === 2 && (
                                    <div className="space-y-6 p-4 flex flex-col items-center min-h-[50vh] justify-between">
                                        <div className="form-control w-full">
                                            <ReCAPTCHA
                                                ref={recaptchaRef}
                                                size="invisible"
                                                sitekey="6Lcbku4qAAAAAGU2lYkB6Jnj06d8B6F72VU2qfiU"
                                                onChange={handleCaptchaChange}
                                            />
                                        </div>

                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-4">
                                            Escolha como pagar
                                        </h3>

                                        <div className="w-full max-w-md space-y-4">
                                            <button
                                                onClick={() => setSelectedPayment('pix')}
                                                className={`btn w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${selectedPayment === 'pix'
                                                    ? 'btn-success bg-green-700 text-white shadow-xl border-green-700'
                                                    : 'btn-ghost border-2 border-green-700 text-green-700 hover:bg-green-700/10'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 sm:h-7 sm:w-7"
                                                        viewBox="0 0 48 48"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            d="M11.9,12h-0.68l8.04-8.04c2.62-2.61,6.86-2.61,9.48,0L36.78,12H36.1c-1.6,0-3.11,0.62-4.24,1.76 l-6.8,6.77c-0.59,0.59-1.53,0.59-2.12,0l-6.8-6.77C15.01,12.62,13.5,12,11.9,12z"
                                                        />
                                                        <path
                                                            d="M36.1,36h0.68l-8.04,8.04c-2.62,2.61-6.86,2.61-9.48,0L11.22,36h0.68c1.6,0,3.11-0.62,4.24-1.76 l6.8-6.77c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36z"
                                                        />
                                                        <path
                                                            d="M44.04,28.74L38.78,34H36.1c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78c-1.36-1.36-3.58-1.36-4.94,0 l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l-5.26-5.26c-2.61-2.62-2.61-6.86,0-9.48L9.22,14h2.68c1.07,0,2.07,0.42,2.83,1.17 l6.8,6.78c0.68,0.68,1.58,1.02,2.47,1.02s1.79-0.34,2.47-1.02l6.8-6.78C34.03,14.42,35.03,14,36.1,14h2.68l5.26,5.26 C46.65,21.88,46.65,26.12,44.04,28.74z"
                                                        />
                                                    </svg>
                                                    <span className="text-base sm:text-lg md:text-xl font-semibold">Pix</span>
                                                </div>
                                                {selectedPayment === 'pix' && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>

                                            <button
                                                disabled
                                                className="btn w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg btn-disabled bg-gray-700 text-gray-400 border-2 border-gray-600 cursor-not-allowed opacity-75"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 sm:h-7 sm:w-7"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 5h18M3 9h18M3 13h18M3 17h18M3 21h18"
                                                        />
                                                    </svg>
                                                    <span className="text-base sm:text-lg md:text-xl font-semibold">Boleto Bancário</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs sm:text-sm italic text-red-500">Em manutenção</span>
                                                </div>
                                            </button>

                                            <button
                                                disabled
                                                className="btn w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg btn-disabled bg-gray-700 text-gray-400 border-2 border-gray-600 cursor-not-allowed opacity-75"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 sm:h-7 sm:w-7"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                        />
                                                    </svg>
                                                    <span className="text-base sm:text-lg md:text-xl font-semibold">Cartão de crédito</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-xs sm:text-sm italic text-red-500">Em manutenção</span>
                                                </div>
                                            </button>
                                        </div>

                                        <div className="w-full max-w-md mt-6">
                                            <button
                                                onClick={handleNextStep}
                                                disabled={selectedPayment !== 'pix' || loading}
                                                className={`btn btn-primary w-full rounded-full text-base sm:text-lg md:text-xl font-semibold py-2 sm:py-3 transition-all duration-300 ${selectedPayment !== 'pix' || loading ? 'btn-disabled opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} ${loading ? 'loading' : ''}`}
                                            >
                                                {loading ? 'Carregando...' : 'Continuar'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`step-content ${step === 3 ? 'visible' : 'exit'}`}
                                style={{ transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out' }}
                            >
                                {step === 3 && pixData && (
                                    <div className="mt-3 space-y-4 p-4 flex flex-col items-center min-h-[50vh] justify-between">
                                        <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-2">Pague com Pix</h3>

                                        <div className="w-full flex justify-center">
                                            <div className="bg-white p-2 sm:p-3 md:p-4 rounded-xl shadow-lg border-2 border-green-500 w-full max-w-[160px] sm:max-w-[200px] md:max-w-[240px]">
                                                <img
                                                    src={pixData.qrcodeBase64}
                                                    alt="QR Code Pix"
                                                    className="w-full h-auto rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-xs sm:text-sm md:text-base text-gray-300 text-center px-2">Escaneie o QR Code com seu aplicativo de pagamento</p>

                                        <div className="w-full space-y-2 sm:space-y-3">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white text-center">Ou copie o código Pix</h3>
                                            <div className="join w-full max-w-md mx-auto">
                                                <input
                                                    type="text"
                                                    value={pixData.pixcopiaecola}
                                                    readOnly
                                                    onClick={handleInputClick}
                                                    className="input input-bordered join-item w-full text-white bg-gray-800 border-gray-600 text-xs sm:text-sm md:text-base focus:outline-none truncate cursor-pointer"
                                                />
                                                <button
                                                    onClick={copyToClipboard}
                                                    className="btn btn-primary join-item px-3 sm:px-4 flex items-center gap-1 sm:gap-2"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 sm:h-5 sm:w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <span className="text-xs sm:text-sm md:text-base hidden sm:inline">Copiar</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="w-full mt-4 sm:mt-6">
                                            <button
                                                onClick={handleCloseModal}
                                                className="btn btn-primary w-full rounded-full text-base sm:text-lg md:text-xl font-semibold py-2 sm:py-3"
                                            >
                                                Concluir
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                    <span className="loading loading-spinner loading-lg text-white"></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* CSS for fade-in animation */}
            <style jsx>{`
                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(-10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-in-out;
                }
            `}</style>
        </>
    );
};

export default PaymentBar;