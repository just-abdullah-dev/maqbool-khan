"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Upload } from "lucide-react";
import Image from "next/image";
import { revalidateTagFunc } from "@/services/utils";

export default function AddGallery({ goBack }) {
  const { userInfo } = useSelector((state) => state.user);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  
  function handleChangeImages(event) {
    const input = event.target;
    if (input.files) {
      const selectedImages = Array.from(input.files);
      setImages(selectedImages.concat(images));

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
  } = useForm();

  const submitHandler = async (data) => {
    console.log(data);
    if (!data?.countryName || !data?.slug ) {
      toast.error("Kindly fill the fields.");
      return;
    }

    let formData = new FormData();
    console.log(images);
    images.forEach((img) => {
      formData.append("files", img, img.name);
    });

    const body = {
      name: data?.countryName,
      slug: data?.slug.replace(/\s/g, "")
    }
    formData.append("body", JSON.stringify(body));

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
      body: formData,
      redirect: "follow",
    };

    await fetch("/api/gallery/maqboolkhan", requestOptions)
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
          {/* Image previews */}
          {imagePreviews.map((preview, index) => (
            <div key={index} className="w-full flex items-center justify-center">
              <Image
                className="rounded-full aspect-square"
                width={200}
                height={200}
                alt={`Image ${index + 1}`}
                src={preview?.url}
              />
            </div>
          ))}
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
            {isSubmitting ? "Loading..." : "Save & Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
