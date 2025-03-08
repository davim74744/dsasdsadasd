import { NextResponse } from 'next/server';

interface RequestBody {
    id: string;
}

interface ExternalApiResponse {
    response: {
        code: number;
        nickname: string;
        info: string;
    };
}

export async function POST(req: Request) {
    try {
        const { id }: RequestBody = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
        }

        const externalApiUrl = `https://fly-post-route.fly.dev/send-request`;

        const response = await fetch(externalApiUrl, {
            method: 'POST',
            body: JSON.stringify({ id_usuario: id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: "Erro ao buscar usuário no servidor externo" }, { status: 500 });
        }

        const data: ExternalApiResponse = await response.json();

        const nickname = data.response.nickname;

        if (!nickname) {
            return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }

        return NextResponse.json({ id, nickname });

    } catch (err) {
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}
