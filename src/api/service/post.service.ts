"use server"
import { Post } from "../model/post";
import axios from 'axios';

const BASE_API = "http://localhost:3001/api/posts";

export async function salvar(post: Post) {
   const { data } = await axios.post(`${BASE_API}`, post);
   return data;
}

export async function obterTodos(): Promise<Post[]> {
    const { data } = await axios.get(`${BASE_API}`);
    return data;
}

export async function obterPorSlug(slug: string): Promise<Post> {
    const { data } = await axios.get(`${BASE_API}/${slug}`);
    return data;
}

export async function excluir(slug: string): Promise<void> {
    await axios.delete(`${BASE_API}/${slug}`);
}

export async function update(post: Post): Promise<void> {
    await axios.patch(`${BASE_API}`, post);
}

/* export async function salvar(post: Post) {
    const response = await fetch(`${BASE_API}`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });

    return await response.json();
}

export async function obterTodos(): Promise<Post[]> {
    const response = await fetch(`${BASE_API}`);
    return await response.json();
}

export async function obterPorSlug(slug: string): Promise<Post> {
    const response = await fetch(`${BASE_API}/${slug}`);
    return await response.json();
}

export async function excluir(slug: string): Promise<void> {
   await fetch(`${BASE_API}/${slug}`, {
    method: 'DELETE',
   })
}

export async function update(post: Post): Promise<void> {
    await fetch(`${BASE_API}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })
} */
