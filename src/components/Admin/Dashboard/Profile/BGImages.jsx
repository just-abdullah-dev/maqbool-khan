"use client";
import React, { useState } from "react";
import { ArrowLeftCircle, Trash, Upload } from "lucide-react";
import Image from "next/image";

export default function BGImages({ bgImages, goBack, saveBGImages }) {
  const [newImages, setNewImages] = useState([]);
  const [deletingImages, setDeletingImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleDeleteExistingImage = (name)=>{
    setDeletingImages((prev)=>[...prev, name]);
  }
  

  const handleDeleteNewImage = (name)=>{
    let images1 = [];
    newImages.map((img)=>{
      if(img?.name !== name){
        images1.push(img);
      }
    })
    setNewImages(images1);

    let images2 = [];
    imagePreviews.map((img)=>{
      if(img?.file?.name !== name){
        images2.push(img);
      }
    })
    setImagePreviews(images2);
  }
  
  function handleChangeImages(event) {
    const input = event.target;
    if (input.files) {
      const selectedImages = Array.from(input.files);
      setNewImages(selectedImages.concat(newImages));

      const previews = selectedImages.map((image) => ({
        url: URL.createObjectURL(image),
        file: image,
      }));
      setImagePreviews(previews.concat(imagePreviews))
    }
  }


  return (
    <div className=" grid gap-4 px-12 py-4 border dark:border-white rounded border-black">
        <button onClick={goBack}>
            <ArrowLeftCircle size={36} />
        </button>
          <div>
            <label
              htmlFor="images"
              className="flex gap-2 p-2 cursor-pointer rounded-lg outline outline-1 dark:outline-primary_bg_light outline-primary_bg_dark"
            >
              <Upload />
              Upload BG Images
            </label>
            <input
              className="absolute opacity-0"
              type="file"
              name="images"
              id="images"
              accept="image/*"
              multiple
              onChange={(event) => {
                handleChangeImages(event);
              }}
            />
          </div>

        {newImages.length > 0 && <h1 className=" text-lg font-semibold">New BG Images </h1>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Image previews */}
          {imagePreviews.map((preview, index) => (
            <div key={index} className="w-full flex items-center justify-center relative">
              
              <Image
                className="rounded-lg aspect-auto"
                width={200}
                height={200}
                alt={`Image ${index + 1}`}
                src={preview?.url}
              />
              <div 
              className=" absolute top-4 right-8 text-red-500 cursor-pointer p-2 bg-gray-300 rounded-lg">
              <Trash
              size={18}
              onClick={()=>{
                handleDeleteNewImage(preview?.file?.name);
              }}
              /></div>
            </div>
          ))}
          </div>
          {bgImages.length > 0 && <h1 className=" text-lg font-semibold">Existed BG Images </h1>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Image previews */}
          {bgImages.map((img, index) => {
            if(!deletingImages.includes(img)){
              return (
                <div key={index} className="w-full flex items-center justify-center relative">
                  
                  <Image
                    className="rounded-lg aspect-auto"
                    width={300}
                    height={200}
                    alt={`Image ${index + 1}`}
                    src={`/uploads/${img}`}
                  />
                  <div 
              className=" absolute top-4 right-8 text-red-500 cursor-pointer p-2 bg-gray-300 rounded-lg">
              <Trash
              size={18}
                  onClick={()=>{
                    handleDeleteExistingImage(img);
                  }}
                  /></div>
                </div>
              )
            }
          }
          
          )}
          </div>
           <button className=" actionButtonTag sm:mx-12 md:mx-24" onClick={()=>{
            saveBGImages(newImages, deletingImages)
           }}>
            Save BG Images
        </button>

    </div>
  );
}
