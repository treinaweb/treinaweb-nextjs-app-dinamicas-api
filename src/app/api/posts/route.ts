import { Post } from "@/backend/model/post";
import { NextRequest, NextResponse } from "next/server";
import * as postRepository from '@/backend/repository/post.respository';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const posts: Post[] = await postRepository.obterTodos();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Falha ao carregar posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newPost: Post = await req.json();
    const validation = validatePostBody(newPost);

    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error }, 
        { status: 400 }
      );
    }

    newPost.id = uuidv4();
    newPost.slug = newPost.title
      .toLowerCase()
      .replace(/\s/g, '-')
      .replace(/[^\w-]+/g, '');

    const createdPost: Post = await postRepository.salvar(newPost);
    
    return NextResponse.json(createdPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao cadastrar post " + error }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const updatePost: Post = await req.json();

    try {
      const post: Post = await postRepository.obterPorId(updatePost.id);

      if (!post) {
        return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
      }

      const validation = validatePatchBody(updatePost);
 
      if (!validation.isValid) {
        return NextResponse.json(
          { error: validation.error }, 
          { status: 400 }
        );
      } 

      const updatedPost: Post = await postRepository.update(updatePost);
      return NextResponse.json(updatedPost, { status: 200 });

    } catch (error) {
      return NextResponse.json({ message: "Falha ao atualizar post", error }, { status: 500 });
    }
  }

function validatePostBody(body: any): { isValid: boolean; error?: string } {
  if (!body) {
    return { isValid: false, error: "Request body is required" };
  }

  const requiredFields = ['title', 'description', 'picture', 'content'];
  const missingFields = requiredFields.filter(field => !body[field]);

  if (missingFields.length > 0) {
    return { 
      isValid: false, 
      error: `Missing required fields: ${missingFields.join(', ')}`
    };
  }

  return { isValid: true };
}

function validatePatchBody(body: any): { isValid: boolean; error?: string } {
  if (!body) {
    return { isValid: false, error: "Request body is required" };
  }

  const requiredFields = ['title', 'description', 'picture', 'content', 'id', 'slug'];
  const missingFields = requiredFields.filter(field => !body[field]);

  if (missingFields.length > 0) {
    return { 
      isValid: false, 
      error: `Missing required fields: ${missingFields.join(', ')}`
    };
  }

  return { isValid: true };
}