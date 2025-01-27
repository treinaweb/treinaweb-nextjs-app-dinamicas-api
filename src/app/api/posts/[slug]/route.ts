import { Post } from "@/backend/model/post";
import { NextRequest, NextResponse } from "next/server";
import * as postRepository from '@/backend/repository/post.respository';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }
) {
  try {
    const { slug }  = await params;
    const post: Post = await postRepository.obterPorSlug(slug);

    if (!post) {
      return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
    }
    
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Falha ao carregar post" + error }, { status: 500 });
  }
}
  
  export async function DELETE(req: NextRequest, { params }: { params: { slug: string }}) {
    try {
      const { slug }  = await params;
      await postRepository.excluir(slug);
      return NextResponse.json({ message: "Post deletado com sucesso" }, { status: 200 });
    } catch (error: unknown) {
      return NextResponse.json({ error: "Falha ao deletar post" + error}, { status: 500 });
    }
  }

 