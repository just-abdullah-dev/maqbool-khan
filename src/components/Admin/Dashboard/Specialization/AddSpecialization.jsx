import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { revalidateTagFunc } from "@/services/utils";

export default function AddSpecialization({ goBack }) {
  const { userInfo } = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseLink, setCourseLink] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = async (data) => {
    const urlRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/\S*)?$/;
      if (!data?.title) {
        toast.error("Title cannot be left empty/");
        return;
      }

    if (!urlRegex.test(data?.link)) {
      toast.error("Invalid URL");
      return;
    }

    let body = {
      title: data?.title,
      link: data?.link,
      courses,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
      body: JSON.stringify(body),
      redirect: "follow",
    };

    await fetch("/api/specialization/maqboolkhan", requestOptions)
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

  const handleAddCourseBtn = () => {
    const urlRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/\S*)?$/;

    if (!courseTitle) {
      toast.error("Title cannot be left empty.");
      return;
    }

    if (!urlRegex.test(courseLink)) {
      toast.error("Invalid URL");
      return;
    }

    const obj = { title: courseTitle, link: courseLink };
    setCourses((prevCourses) => [...prevCourses, obj]);
    setCourseTitle("");
    setCourseLink("");
  };

  const handleDeleteCourse = (value) => {
    let coursesArr = [];
    courses.map((item) => {
      if (item?.title !== value) {
        coursesArr.push(item);
      }
    });
    setCourses(coursesArr);
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
            <h4>Link:</h4>
            <div>
              <input
                {...register("link")}
                type="text"
                className=" inputTag"
                placeholder="Link"
              />
            </div>
          </div>
          <div className=" grid gap-2">
            <h4>Course Title</h4>
            <div>
              <input
                onChange={(e) => {
                  setCourseTitle(e.target.value);
                }}
                value={courseTitle}
                type="text"
                className=" inputTag"
                placeholder="Course Title"
              />
            </div>
          </div>
          <div className=" grid gap-2">
            <h4>Course Link:</h4>
            <div>
              <input
                onChange={(e) => {
                  setCourseLink(e.target.value);
                }}
                value={courseLink}
                type="text"
                className=" inputTag"
                placeholder="Course Link"
              />
            </div>
          </div>
          <p
            className="actionButtonTag cursor-pointer"
            onClick={handleAddCourseBtn}
          >
            Add Course
          </p>
        </div>
        <div className=" grid gap-2">
          <h4>Courses:</h4>
          <ul className=" px-6">
            {courses.length > 0 &&
              courses.map((item, index) => {
                return (
                  <li className=" flex gap-2 items-start" key={index}>
                    <ArrowRight size={18} />
                    <div>
                      <h1>{item?.title}</h1>
                      <Link href={item?.link} className=" text-blue-500">
                        {item?.link}
                      </Link>
                    </div>{" "}
                    <p
                      className=" cursor-pointer text-red-500"
                      onClick={() => handleDeleteCourse(item?.title)}
                    >
                      Remove
                    </p>
                  </li>
                );
              })}
          </ul>
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
            {isSubmitting ? "Loading..." : "Save & Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
