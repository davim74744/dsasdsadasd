import { NextRequest, NextResponse } from 'next/server';

const verifyRecaptcha = async (recaptchaResponse: string): Promise<boolean> => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LdOHeAqAAAAAKTLjmCf5ukZfrA_gmGX1pZabshZ';
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    try {
        const response = await fetch(url, { method: 'POST' });
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Erro ao verificar reCAPTCHA:', error);
        return false;
    }
};

export async function POST(req: NextRequest) {
    try {
        const { recaptchaResponse, name, cpf, email, valor, produto } = await req.json();

        if (!recaptchaResponse || typeof recaptchaResponse !== 'string') {
            return NextResponse.json({ success: false, message: 'ReCAPTCHA inválido.' }, { status: 400 });
        }
        if (!name || !cpf || !email || !valor || !produto) {
            return NextResponse.json({ success: false, message: 'Dados incompletos (nome, CPF, email, valor ou produto faltando).' }, { status: 400 });
        }

        const recaptchaSuccess = await verifyRecaptcha(recaptchaResponse);
        if (!recaptchaSuccess) {
            return NextResponse.json({ success: false, message: 'Falha na verificação do reCAPTCHA.' }, { status: 400 });
        }

        const valorNum = parseFloat(valor.replace(',', '.'));
        if (isNaN(valorNum) || valorNum <= 0) {
            return NextResponse.json({ success: false, message: 'Valor inválido.' }, { status: 400 });
        }
        const formattedValor = Math.round(valorNum * 100);

        const secretKey = process.env.TITANSHUB_SECRET_KEY || 'sk_oj0vg-3S3U78VWIO3cJ4RFNkBbqu3N5AcxEIBLsG4B8Yv14W';
        const authValue = Buffer.from(`${secretKey}:x`).toString('base64');

        const requestBody = {
            paymentMethod: 'pix',
            items: [
                {
                    title: produto,
                    unitPrice: formattedValor,
                    quantity: 1,
                    tangible: false,
                    externalRef: 'CORREIO',
                },
            ],
            amount: formattedValor,
            installments: '1',
            customer: {
                document: {
                    type: 'cpf',
                    number: cpf,
                },
                name: name,
                email: email,
                phone: '11999999999',
            },
        };

        const response = await fetch('https://api.titanshub.io/v1/transactions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${authValue}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Erro na API TitansHub:', data);
            return NextResponse.json({ success: false, message: 'Falha ao gerar o pix' }, { status: 400 });
        }

        if (data.pix?.qrcode) {
            const qrcodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.pix.qrcode)}`;
            const qrcodeResponse = await fetch(qrcodeUrl);

            const qrcodeArrayBuffer = await qrcodeResponse.arrayBuffer();
            const qrcodeBase64 = Buffer.from(qrcodeArrayBuffer).toString('base64');

            return NextResponse.json({
                success: true,
                pixData: {
                    pixcopiaecola: data.pix.qrcode,
                    qrcodeBase64: `data:image/png;base64,${qrcodeBase64}`,
                },
            });
        }

        return NextResponse.json({ success: false, message: 'QR Code não disponível.' }, { status: 400 });

    } catch (error) {
        console.error('Erro ao processar requisição:', error);
        return NextResponse.json({ success: false, message: 'Erro interno do servidor.' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ success: false, message: 'Método não permitido.' }, { status: 405 });
}
