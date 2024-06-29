"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { revalidateTagFunc } from "@/services/utils";


export default function EditEducation({ goBack, prevData }) {
  const { userInfo } = useSelector((state) => state.user);
  const [ isWorking, setIsWorking ] = useState(false);
  const [ startDate, setStartDate ] = useState(prevData?.from ? prevData?.from.substring(0, 10) : "");
  const [ endDate, setEndDate ] = useState(prevData?.to ? prevData?.to.substring(0, 10) : "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues:{
      degree: prevData?.degree,
      desc: prevData?.desc,
      link: prevData?.link,
      institute: prevData?.institute,
      country: prevData?.country,
      field: prevData?.field,
      showOnHome: prevData?.showOnHome,
    }
  });

  const submitHandler = async (data) => {
    
    if (!data?.degree || !data?.institute || !startDate || !data?.field || !data?.country) {
      toast.error("Kindly fill the fields.");
      return;
    }
    if (!isWorking && !endDate) {
      toast.error("Kindly enter the end date.");
      return;
    }

    let body = {
      degree: data?.degree,
      desc: data?.desc,
      link: data?.link,
      institute: data?.institute,
      country: data?.country,
      field: data?.field,
      from: startDate,
      showOnHome: data?.showOnHome ? "yes" : "no",
    };
    if (!isWorking) {
      body.to = endDate;
    }else{
      body.to = undefined;
    }

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
      body: JSON.stringify(body),
      redirect: "follow",
    };

    await fetch(`/api/v1/education/${prevData?._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          revalidateTagFunc("education")
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
            <h4>Degree:</h4>
            <div>
              <input
                {...register("degree")}
                type="text"
                className=" inputTag"
                placeholder="Degree Name"
              />
            </div>
          </div>
          <div className=" grid gap-2">
            <h4>Field:</h4>
            <div>
              <input
                {...register("field")}
                type="text"
                className=" inputTag"
                placeholder="Field or Subject"
              />
            </div>
          </div>
          <div className=" grid gap-2">
            <h4>Institute:</h4>
            <div>
              <input
                {...register("institute")}
                type="text"
                className=" inputTag"
                placeholder="Institute"
              />
            </div>
          </div>
          <div className=" grid gap-2">
            <h4>Country:</h4>
            <div>
              <input
                {...register("country")}
                type="text"
                className=" inputTag"
                placeholder="Country"
              />
            </div>
          </div>
          {/* start date  */}
          <div className=" grid gap-2">
            <h4>Starting Date:</h4>
            <div>
              <input
                type="date"
                value={startDate}
                onChange={(e)=>{
                  setStartDate(e.target.value);
                }}
                className=" inputTag"
              />
            </div>
          </div>
          <div className=" grid gap-2">
            <h4>Currently Enrolled:</h4>
            <input type="checkbox" checked={isWorking} onChange={(e)=>{
            setIsWorking(e.target.checked);
          }} name="isWorking" id="isWorking" />
          </div>
          <div className=" grid gap-2">
            <h4>Ending Date:</h4>
            <div className="">
            <input
            disabled={isWorking}
              type="date"
              value={endDate}
              onChange={(e)=>{
                setEndDate(e.target.value);
              }}
              className=" inputTag disabled:opacity-60 disabled:cursor-not-allowed"
            />
            
          </div>
          </div>
          {/* show on home */}
        <div className=" grid gap-2 overflow-hidden">
          <h1>Show On Home Page</h1>
          <div>
              <input
                {...register("showOnHome")}
                type="checkbox"
                className="inputTag scale-150"
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
