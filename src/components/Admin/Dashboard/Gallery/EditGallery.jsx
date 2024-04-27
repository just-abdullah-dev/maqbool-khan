"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { revalidateTagFunc } from "@/services/utils";
import { Upload } from "lucide-react";
import Image from "next/image";


export default function EditGallery({ goBack, prevData }) {
  const { userInfo } = useSelector((state) => state.user);
  const [image, setImage] = useState({
    url: "",
    value: prevData?.image ? prevData?.image : null,
    error: "",
  });

  function handleChangeImage(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage(() => {
          return { url: e.target.result, error: "", value: input.files[0] };
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues:{
      title: prevData?.title,
      link: prevData?.link,
      seriesId: prevData?.seriesId,
      certificationId: prevData?.certificationId,  
    }
  });

  const submitHandler = async (data) => {
    const urlRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/\S*)?$/;

    if (!data?.title || !data?.seriesId || !data?.certificationId) {
      toast.error("Kindly fill the fields.");
      return;
    }
    if (!urlRegex.test(data?.link)) {
      toast.error("Invalid URL");
      return;
    }

    let formdata = new FormData();
    if (image.url) {
      formdata.append("files", image.value, image.value?.name);
    }

    const body = {
      title: data?.title,
      certificationId: data?.certificationId,
      link: data?.link,
      seriesId: data?.seriesId,
    };

    formdata.append("body", JSON.stringify(body));

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
      body: formdata,
      redirect: "follow",
    };

    await fetch(`/api/certifications/${prevData?._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
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
         <div className=" grid gap-4 grid-cols-2">
          <div className=" grid gap-2">
            <h4>Title:</h4>
            <div>
              <input
                {...register("title")}
                type="text"
                className=" inputTag"
                placeholder="Title"
              />
            </div>
          </div>
          <div className=" grid gap-2">
            <h4>Series ID:</h4>
            <div>
              <input
                {...register("seriesId")}
                type="text"
                className=" inputTag"
                placeholder="Series ID"
              />
            </div>
          </div>
          <div className=" grid gap-2">
            <h4>Certification ID:</h4>
            <div>
              <input
                {...register("certificationId")}
                type="text"
                className=" inputTag"
                placeholder="Certification ID"
              />
            </div>
          </div>

          <div className=" grid gap-2">
            <h4>Link:</h4>
            <div>
              <input
                {...register("link")}
                type="text"
                className=" inputTag"
                placeholder="Certification Link"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="image"
              className=" flex gap-2 p-2 cursor-pointer rounded-lg outline outline-1 dark:outline-primary_bg_light outline-primary_bg_dark"
            >
              <Upload />
              Upload Image
            </label>
            <input
              className=" absolute opacity-0"
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={(event) => {
                handleChangeImage(event);
              }}
            />
          </div>
          {/* image  */}
          {image?.url ? (
            <div className=" w-full flex items-center justify-center">
              <Image
                className=" rounded-full aspect-square"
                width={200}
                height={200}
                alt="Certificate Logo"
                src={`${image?.url}`}
              />
            </div>
          ) : 
          (image?.value ? 
            <div className=" w-full flex items-center justify-center">
            <Image
              className=" rounded-full aspect-square"
              width={200}
              height={200}
              alt="Certificate Logo"
              src={`/uploads/${image?.value}`}
            />
          </div> : null)}
        </div>
        <div className=" flex items-center gap-4 py-4">
          {/* close btn  */}
        <button
          className=" normalButtonTag bg-red-500 w-full"
          onClick={goBack}
        >
          Cancel
        </button>
        {/* form submit btn  */}
        <button
          disabled={isSubmitting}
          type="submit"
          className=" actionButtonTag w-full"
        >
          {isSubmitting ? "Loading..." : "Update"}
        </button>
        </div>
      </form>
    </div>
  );
}
