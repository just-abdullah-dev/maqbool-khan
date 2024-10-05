"use client";
import { revalidateTagFunc } from "@/services/utils";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function EditCourse({ goBack, prevData }) {
    
  const { userInfo } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: prevData?.title,
      link: prevData?.link,
    },
  });

  const submitHandler = async (data) => {
    const urlRegex =
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/\S*)?$/;

    if (!urlRegex.test(data?.link)) {
      toast.error("Invalid URL");
      return;
    }
    if (!data?.title) {
      toast.error("Title cannot be left empty.");
      return;
    }

    let body = {
      title: data?.title,
      link: data?.link,
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
      body: JSON.stringify(body),
      redirect: "follow",
    };

    await fetch(`${process.env.API_BASE_URL}/specialization/course/${prevData?._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          revalidateTagFunc("specialization");
          window.location.reload();
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <div
        className=" grid gap-4 px-12 py-4"
      >
        <div className=" grid gap-4 grid-cols-2">
          <div className=" grid gap-2">
            <h4>Title:</h4>
            <div>
              <input
autoComplete="on"

                {...register("title")}
                type="text"
                className=" inputTag"
                placeholder="Title"
              />
            </div>
          </div>
          <div className=" grid gap-2">
            <h4>Link:</h4>
            <div>
              <input
autoComplete="on"

                {...register("link")}
                type="text"
                className=" inputTag"
                placeholder="Link"
              />
            </div>
          </div>
        </div>
        {/* btns  */}
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
            onClick={handleSubmit(submitHandler)}
            className=" actionButtonTag w-full"
          >
            {isSubmitting ? "Loading..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
