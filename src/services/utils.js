

export async function revalidateTagFunc(tag){
  const requestOptions = {
      method: 'GET',
      redirect: "follow",
    };
  const data = await fetch(`/revalidate/${tag}`, requestOptions);
  return data.json();
}

export async function getAll(professorId, tableName){
  const requestOptions = {
      method: 'GET',
      redirect: "follow",
      next: { tags: [tableName] }
    };
  const data = await fetch(`/api/${tableName}/${professorId}`, requestOptions);
  return data.json();
}