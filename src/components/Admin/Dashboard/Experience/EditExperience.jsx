"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { revalidateTagFunc } from "@/services/utils";


export default function AddExperience({ goBack, prevData }) {
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
      title: prevData?.title,
      link: prevData?.link,
      desc: prevData?.desc,
      company: prevData?.company,  
    }
  });

  const submitHandler = async (data) => {
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/\S*)?$/;
    
    if(!data?.title || !data?.company || !startDate || !urlRegex.test(data?.link)){
      toast.error("Kindly fill the fields.");
      return;
    }
    if(!isWorking && !endDate){
      toast.error("Kindly enter end date.");
      return;
    }
    let body = {
      title: data?.title,
      desc: data?.desc,
      from: startDate,
      link: data?.link,
      company: data?.company,
    };
    if(!isWorking){
      body.to = endDate;
    }
    console.log(body);

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
      body: JSON.stringify(body),
      redirect: "follow",
    };

    await fetch(`/api/experience/${prevData?._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result?.success) {
          toast.success(result?.message);
          revalidateTagFunc("experience")
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
              <input
                type="date"
                value={startDate}
                onChange={(e)=>{
                  setStartDate(e.target.value);
                }}
                className=" inputTag"
              />
            </div>
          </div> {prevData?._id}
          <div className=" grid gap-2">
            <h4>Currently Working:</h4>
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
          {isSubmitting ? "Loading..." : "Update"}
        </button>
        </div>
      </form>
    </div>
  );
}
