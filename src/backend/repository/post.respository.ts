"use server"
import { PrismaClient } from "@prisma/client"
import { Post } from "../model/post";

const db = new PrismaClient();
const BASE_API = "http://localhost:3001/api/posts";

export async function salvar(post: Post) {
    return await db.post.upsert({
        where: {id: post.id},
        update: post,
        create: post,
    })
}

export async function obterTodos(): Promise<Post[]> {
    const response = await fetch(`${BASE_API}`);
    return await response.json();
}

export async function obterPorSlug(slug: string): Promise<Post> {
    const response = await fetch(`${BASE_API}/${slug}`);
    return await response.json();
}

export async function excluir(id: string): Promise<void> {
    await db.post.delete({
        where: { id },
    });
}

