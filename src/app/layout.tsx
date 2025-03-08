import "./globals.css";

export const metadata = {
  title: "Free Fire | Comprar Diamantes",
  description:
    "Recarregue Diamantes de Free Fire e ganhe bônus. Pague com Pix, PicPay, Cartão e mais. Envio imediato!",
  keywords:
    "recarregar free fire, freefire, free fire, ff, recarregar ff, bonus ff, bonus free fire, loja free fire, diamantes, diamantes ff, diamantes free fire, pix, picpay, cartao, recarregue, comprar diamantes, recarregar diamante",
  openGraph: {
    title: "Free Fire | Comprar Diamantes",
    description:
      "Recarregue Diamantes de Free Fire e ganhe bônus. Pague com Pix, PicPay, Cartão e mais. Envio imediato!",
    url: "https://freefire-brazil.com/",
    images: [
      {
        url: "https://freefire-brazil.com/img/logo-facebook.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
        <link
          rel="stylesheet"
          href="https://atugatran.github.io/FontAwesome6Pro/css/all.min.css"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
