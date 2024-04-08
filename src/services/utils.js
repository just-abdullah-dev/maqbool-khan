

export async function getAllExperience(professorId){
    const requestOptions = {
        method: 'GET',
        redirect: "follow",
        next: { tags: ['experience'] }
      };
    const data = await fetch(`/api/experience/${professorId}`, requestOptions);
    return data.json();
}


export async function revalidateTagFunc(tag){
  const requestOptions = {
      method: 'GET',
      redirect: "follow",
    };
  const data = await fetch(`/revalidate/${tag}`, requestOptions);
  return data.json();
}