'use client';

import Diamonds from "@/components/Diamonds";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Login from "@/components/Login";
import Logo from "@/components/Logo";
import PaymentBar from "@/components/PaymentBar";
import { useState } from "react";

export default function Home() {
    const [selectedPackage, setSelectedPackage] = useState<{
        value: string;
        diamonds: string;
        bonus: string;
        produtonome: string;
    } | null>(null);

    const [selectedOffer, setSelectedOffer] = useState<{
        value: string;
        produtonome: string;
    } | null>(null);

    const [userInfo, setUserInfo] = useState<{ name: string; nickname: string; email: string; id: string } | null>(null);

    return (
        <div className="min-h-screen flex flex-col bg-[#1a1d1f]">
            <Logo />
            <div className="relative w-full p-2">
                <Header />
                <div className="container max-w-4xl mx-auto flex flex-col py-3 text-white p-">
                    <Login setUserInfo={setUserInfo} />
                    <Diamonds
                        setSelectedPackage={setSelectedPackage}
                        selectedPackage={selectedPackage}
                        setSelectedOffer={setSelectedOffer}
                        selectedOffer={selectedOffer}
                    />
                </div>
            </div>

            {(selectedPackage || selectedOffer) && (
                <PaymentBar
                    selectedPackage={selectedPackage}
                    selectedOffer={selectedOffer}
                    userInfo={userInfo}
                />
            )}

            <Footer />
        </div>
    );
}