import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import { revalidateTagFunc } from "@/services/utils";

export default function AddPublication({ goBack }) {
  const { userInfo } = useSelector((state) => state.user);
  const [members, setMembers] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = async (data) => {
    const urlRegex =
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/\S*)?$/;

    if (!data?.title || !data?.year || members.length === 0) {
      toast.error("Kindly fill the fields.");
      return;
    }
    
    if (!urlRegex.test(data?.link)) {
      toast.error("Invalid URL");
      return;
    }

    let body = {
      title: data?.title,
      link: data?.link,
      year: data?.year,
      members,
      showOnHome: data?.showOnHome ? "yes" : "no",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
      body: JSON.stringify(body),
      redirect: "follow",
    };

    await fetch(`${process.env.API_BASE_URL}/publications/${userInfo?.data?.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          revalidateTagFunc("publications")
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
      setMembers((prev)=>[...prev, value]);
      e.target.value = "";
    }
  }

  const handleDeleteMember = (value) => {
    let membersArr = [];
    members.map((item)=>{
      if(item !== value){
        membersArr.push(item);
      }
    })
      setMembers(membersArr);
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className=" grid gap-4 px-12 py-4"
      >
        <div className=" grid gap-4 grid-cols-2">
          {/* title  */}
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
          <div className=" grid gap-2">
            <h4>Year:</h4>
            <div>
              <input
autoComplete="on"

                {...register("year")}
                type="text"
                className=" inputTag"
                placeholder="Year e.g 2020"
              />
            </div>
          </div>
          {/* show on home */}
          <div className=" grid gap-2 overflow-hidden">
            <h1>Show On Home Page</h1>
            <div>
              <input
autoComplete="on"

                {...register("showOnHome")}
                type="checkbox"
                className="inputTag scale-150"
              />
            </div>
          </div>
          <div className=" grid gap-2">
            <h4>Type members name & press TAB to add:</h4>
            <div>
              <input
autoComplete="on"

                type="text"
                className=" inputTag"
                onKeyDown={handleKeyDown}
                placeholder="Type members name & press TAB to add."
              />
            </div>
          </div>
        </div>
        <div className=" grid gap-2">
            <h4>Members:</h4>
            <ul className=" px-6">
              {members.length > 0 && members.map((item, index)=>{
                return <li className=" flex gap-2 items-center" key={index}>
                <ArrowRight size={18} />{item} <p className=" cursor-pointer text-red-500" onClick={()=>handleDeleteMember(item)}>Remove</p></li>
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
