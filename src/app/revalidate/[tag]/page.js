'use server';
 
import { revalidateTag } from 'next/cache';
 
export default async function action({params}) {
  revalidateTag(params.tag);
}