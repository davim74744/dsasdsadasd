const Footer: React.FC = () => {
    return (

        <footer className="bg-[#151718] py-12 text-center text-gray-300">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-lg font-bold mb-4">© 2025 Dimas Compra | Todos os direitos reservados.</p>
                <p className="text-sm text-gray-400 mb-4">CNPJ: 06.142.151/0001-50 - Rua Luis Gois, 9403 - Mirandópolis - SP -
                    CEP: 04043-200</p>
                <div className="text-sm mb-6">
                    <p>Email: <a href="mailto:contato@dimascompra.com"
                        className="text-blue-500 hover:underline">contato@dimascompra.com</a></p>
                    <p>Telefone: <a href="tel:+552133355582" className="text-blue-500 hover:underline">(21) 3335-5582</a></p>
                </div>
                <div className="flex justify-center space-x-6 mt-6">
                    <a href="#" target="_blank" className="text-[#1DA1F2] hover:text-[#1A91DA]">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                    <a href="#" target="_blank" className="text-[#3b5998] hover:text-[#2d4373]">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>
                    <a href="#" target="_blank" className="text-[#E4405F] hover:text-[#C13584]">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
                    <a href="#" target="_blank" className="text-[#FF4500] hover:text-[#FF6A00]">
                        <i className="fab fa-twitch fa-2x"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;