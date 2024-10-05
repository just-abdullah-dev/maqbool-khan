
'use server';

import { revalidateTag } from "next/cache";

export async function revalidateTagFunc(tag){
  revalidateTag(tag)
}

// export async function getAll(professorId, tableName){
//   const requestOptions = {
//       method: 'GET',
//       redirect: "follow",
//       next: { tags: [tableName] }
//     };
// const baseUrl = process.env.ENV === "production" ? "https://maqbool-khan.vercel.app" : process.env.ENV === "development" ? "http://localhost:3000" : "";
//   const data = await fetch(`${baseUrl}${process.env.API_BASE_URL}/${tableName}/${professorId}`, requestOptions);
//   return data.json();
// }

export async function getAll(professorId, tableName, searchParams = []) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    next: { tags: [tableName] }
  };

  const baseUrl = process.env.CMS_BASE_URL ? process.env.CMS_BASE_URL : "http://localhost:3000";

    const apiBaseUrl = process.env.API_BASE_URL ? process.env.API_BASE_URL : "/api/v1";

    let searchParamsString = "";
    if(searchParams.length > 0){
       searchParamsString = `?`;
       searchParams.map((item, index)=>{
        searchParamsString += item?.name + "=" + item?.value;
        if(index + 1 !== searchParams.length){
          searchParamsString += "&";
        }
       })
    }

  try {
    const response = await fetch(`${baseUrl}${apiBaseUrl}/${tableName}/${professorId}${searchParamsString !== "" ? searchParamsString : ""}`, requestOptions);
    
    // Check if the response is ok (status is in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    // You can throw the error again or return a default value
    throw error; // or return null; or return { error: error.message };
  }
}

