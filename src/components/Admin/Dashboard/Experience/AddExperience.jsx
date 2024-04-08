import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export default function AddExperience({ goBack }) {
  const { userInfo } = useSelector((state) => state.user);
  const [isWorking, setIsWorking] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = async (data) => {
    const urlRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/\S*)?$/;

    if (!data?.title || !data?.company || !data?.from) {
      toast.error("Kindly fill the fields.");
      return;
    }
    if (!urlRegex.test(data?.link)) {
      toast.error("Invalid URL");
      return;
    }
    if (!isWorking && !data?.to) {
      toast.error("Kindly enter the end date.");
      return;
    }
    let body = {
      title: data?.title,
      desc: data?.desc,
      from: data?.from,
      link: data?.link,
      company: data?.company,
    };
    if (!isWorking) {
      body.to = data?.to;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
      body: JSON.stringify(body),
      redirect: "follow",
    };

    await fetch("/api/experience/maqboolkhan", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          console.log(result);
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
            <h4>Organization:</h4>
            <div>
              <input
                {...register("company")}
                type="text"
                className=" inputTag"
                placeholder="Organization"
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
                placeholder="Organization Link"
              />
            </div>
          </div>
          <div className=" grid gap-2">
            <h4>Starting Date:</h4>
            <div>
              <input {...register("from")} type="date" className=" inputTag" />
            </div>
          </div>
          <div className=" grid gap-2">
            <h4>Currently Working:</h4>
            <input
              type="checkbox"
              checked={isWorking}
              onChange={(e) => {
                setIsWorking(e.target.checked);
              }}
              name="isWorking"
              id="isWorking"
            />
          </div>
          <div className=" grid gap-2">
            <h4>Ending Date:</h4>
            <div className="">
              <input
                disabled={isWorking}
                {...register("to")}
                type="date"
                className=" inputTag disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className=" grid gap-2">
          <h4>Description:</h4>
          <div>
            <textarea
              {...register("desc")}
              type="text"
              className=" inputTag"
              placeholder="Description"
              rows={4}
            />
          </div>
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
