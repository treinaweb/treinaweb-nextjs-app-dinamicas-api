import * as postRepository from "@/api/service/post.service";
import PostBody from "@/ui/components/PostBody/PostBody";
import { notFound } from "next/navigation";

export default async function PostPage( { params } : { params: {slug: string}}) {
    const { slug } = await params;
    const post = await postRepository.obterPorSlug(slug);

    if(!post) {
        notFound();
    };

    return (
        <PostBody post={post} />
    )
}