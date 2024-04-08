import React from 'react'

export default function EditExperience({data, goBack}) {
    console.log(data);
  return (
    <div>EditExperience {data?._id}
    <button
    onClick={goBack}
    >back</button></div>
  )
}
