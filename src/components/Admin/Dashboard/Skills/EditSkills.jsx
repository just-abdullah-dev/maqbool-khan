"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { revalidateTagFunc } from "@/services/utils";
import { ArrowRight } from "lucide-react";


export default function EditSkill({ goBack, prevData }) {
  const { userInfo } = useSelector((state) => state.user);
  const [ skills, setSkills ] = useState(prevData?.items.length > 0 ? prevData?.items : []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues:{
      title: prevData?.title
    }
  });

  const submitHandler = async (data) => {
    
    if (!data?.title || skills.length === 0) {
      toast.error("Kindly fill the fields.");
      return;
    }

    let body = {
      title: data?.title,
      items: skills
    }

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
      body: JSON.stringify(body),
      redirect: "follow",
    };

    await fetch(`/api/v1/skills/${prevData?._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          revalidateTagFunc("skills")
          window.location.reload();
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleKeyDown = (e) => {
    const value = e.target.value;
    if (e.key === 'Tab'){
      setSkills((prevSkills)=>[...prevSkills, value]);
      e.target.value = "";
    }
  }

  const handleDeleteSkill = (value) => {
    let skillsArr = [];
    skills.map((item)=>{
      if(item !== value){
        skillsArr.push(item);
      }
    })
      setSkills(skillsArr);
  }

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
            <h4>Type skill & press TAB to add:</h4>
            <div>
              <input
                type="text"
                className=" inputTag"
                onKeyDown={handleKeyDown}
                placeholder="Type skill & press TAB to add"
              />
            </div>
          </div>
        </div>
        <div className=" grid gap-2">
            <h4>Skills:</h4>
            <ul className=" px-6">
              {skills.length > 0 && skills.map((item, index)=>{
                return <li className=" flex gap-2 items-center" key={index}>
                <ArrowRight size={18} />{item} <p className=" cursor-pointer text-red-500" onClick={()=>handleDeleteSkill(item)}>Remove</p></li>
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
