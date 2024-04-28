"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Trash, Upload } from "lucide-react";
import Image from "next/image";
import { revalidateTagFunc } from "@/services/utils";

export default function EditGallery({ goBack, prevData }) {
  const { userInfo } = useSelector((state) => state.user);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [deletingImages, setDeletingImages] = useState([]);

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

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      countryName: prevData?.countryName,
      slug: prevData?.slug
    }
  });

  const submitHandler = async (data) => {
    if (!data?.countryName || !data?.slug ) {
      toast.error("Kindly fill the fields.");
      return;
    }

    let formData = new FormData();

    newImages.forEach((img) => {
      formData.append("files", img, img.name);
    });

    const body = {
      name: data?.countryName,
      slug: data?.slug.replace(/\s/g, ""),
      deletingImages
    }
    formData.append("body", JSON.stringify(body));

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
      body: formData,
      redirect: "follow",
    };

    await fetch(`/api/gallery/${prevData?._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          revalidateTagFunc("gallery");
          window.location.reload();
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className=" grid gap-4 px-12 py-4"
      >
        <div className="grid gap-4 grid-cols-2">
          <div className="grid gap-2">
            <h4>Country Name:</h4>
            <div>
              <input
                {...register("countryName")}
                type="text"
                className="inputTag"
                placeholder="Country Name"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <h4>Slug:</h4>
            <div>
              <input
                {...register("slug")}
                type="text"
                className="inputTag"
                placeholder="Slug without spaces"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="images"
              className="flex gap-2 p-2 cursor-pointer rounded-lg outline outline-1 dark:outline-primary_bg_light outline-primary_bg_dark"
            >
              <Upload />
              Upload Images
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
        </div>
        {newImages.length > 0 && <h1 className=" text-lg font-semibold">New Images </h1>}
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
          {prevData?.images.length > 0 && <h1 className=" text-lg font-semibold">Existed Images </h1>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Image previews */}
          {prevData?.images.map((img, index) => {
            if(!deletingImages.includes(img)){
              return (
                <div key={index} className="w-full flex items-center justify-center relative">
                  
                  <Image
                    className="rounded-lg aspect-auto"
                    width={200}
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

        <div className="flex items-center gap-4 py-4">
          {/* Close button */}
          <button
            className="normalButtonTag bg-red-500 w-full"
            onClick={goBack}
          >
            Cancel
          </button>
          {/* Form submit button */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="actionButtonTag w-full"
          >
            {isSubmitting ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
