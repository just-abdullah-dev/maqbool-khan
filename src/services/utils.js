
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
  const data = await fetch(`http://localhost:3000/api/${tableName}/${professorId}`, requestOptions);
  return data.json();
}