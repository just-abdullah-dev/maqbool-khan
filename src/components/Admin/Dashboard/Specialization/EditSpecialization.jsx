"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { revalidateTagFunc } from "@/services/utils";
import { ArrowRight, SquarePen, Trash } from "lucide-react";
import EditCourse from "./EditCourse";
import AddCourse from "./AddCourse";
import Link from "next/link";

export default function EditSpecialization({ goBack, prevData }) {
  const { userInfo } = useSelector((state) => state.user);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAddCourse, setIsAddCourse] = useState(false);

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

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/specialization/${prevData?._id}`, requestOptions)
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

  const deleteCourse = async (_id) => {
    if (!window.confirm("Are you sure to delete it?")) {
      return;
    } else {
      var requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userInfo?.data?.token}`,
        },
        redirect: "follow",
      };

      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/specialization/course/${_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            toast.success(result?.message);
            window.location.reload();
            revalidateTagFunc("specialization");
          } else {
            toast.error(result?.message);
          }
        })
        .catch((error) => console.log("error", error));
    }
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
        {/* add btn  */}
        {isAddCourse ? (
          <AddCourse
            _id={prevData?._id}
            goBack={() => {
              setIsAddCourse(!isAddCourse);
            }}
          />
        ) : (
          <div className="w-full flex flex-row-reverse my-2">
            <button
              onClick={() => {
                setIsAddCourse(!isAddCourse);
              }}
              type="button"
              className={`bg-blue-500 normalButtonTag w-[20%] float right-0`}
            >
              Add Course
            </button>
          </div>
        )}
        <div className=" grid gap-2">
          <h4>Courses:</h4>
          {/* courses  */}
          <ul className=" px-6">
            {prevData?.courses.map((course, index) => {
              return selectedCourse?._id === course?._id ? (
                <li className=" flex gap-2 items-start" key={index}>
                  <ArrowRight className=" mt-1" size={19} />
                  <EditCourse
                    prevData={selectedCourse}
                    goBack={() => {
                      setSelectedCourse(null);
                    }}
                  />
                </li>
              ) : (
                <li className=" flex gap-2 items-start" key={index}>
                  <ArrowRight className=" mt-1" size={19} />
                  <div>
                    <h1>{course?.title}</h1>
                    <Link href={course?.link} className=" text-blue-500">
                      {course?.link}
                    </Link>
                  </div>
                  <div className="  flex gap-4 ml-16">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCourse(course);
                      }}
                    >
                      <SquarePen size={19} className="mt-1" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteCourse(course?._id);
                      }}
                    >
                      <Trash size={19} className="mt-1" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
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
            className=" actionButtonTag w-full"
          >
            {isSubmitting ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
