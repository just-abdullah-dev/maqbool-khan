
'use server';

import { revalidateTag } from "next/cache";

export async function revalidateTagFunc(tag){
  revalidateTag(tag)
}

export async function getAll(professorId, tableName){
  const requestOptions = {
      method: 'GET',
      redirect: "follow",
      next: { tags: [tableName] }
    };
const baseUrl = process.env.ENV === "production" ? "https://maqbool-khan.vercel.app" : process.env.ENV === "development" ? "http://localhost:3000" : "";
  const data = await fetch(`${baseUrl}/api/${tableName}/${professorId}`, requestOptions);
  return data.json();
}
