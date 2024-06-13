import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import { revalidateTagFunc } from "@/services/utils";

export default function AddResearch({ goBack }) {
  const { userInfo } = useSelector((state) => state.user);
  const [isWorking, setIsWorking] = useState(false);
  // I am using name duties instead of responsibilities, just to short the name 
  const [duties, setDuties] = useState([]);
  const [duty, setDuty] = useState("");
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = async (data) => {
    const urlRegex =
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/\S*)?$/;
    
    if (!urlRegex.test(data?.link)) {
      toast.error("Invalid URL");
      return;
    }
    if (!data?.title || !data?.institute || !data?.from) {
      toast.error("Kindly fill the fields.");
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
      institute: data?.institute,
      responsibilities: duties
    };
    if (!isWorking) {
      body.to = data?.to;
    }else{
      body.isCompleted = false;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
      body: JSON.stringify(body),
      redirect: "follow",
    };

    await fetch("/api/v1/projects/maqboolkhan", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          revalidateTagFunc("projects");
          window.location.reload();
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleAddDuty = (e) => {
      setDuties((prev)=>[...prev, duty]);
      setDuty(""); 
  }

  const handleDeleteDuty = (value) => {
    let arr = [];
    duties.map((item)=>{
      if(item !== value){
        arr.push(item);
      }
    })
      setDuties(arr);
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
            <h4>Company:</h4>
            <div>
              <input
                {...register("institute")}
                type="text"
                className=" inputTag"
                placeholder="Company"
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
          <div className=" grid gap-2">
            <h4>Type responsibility & press ADD:</h4>
            <div>
              
              <input
                type="text"
                className=" inputTag"
                value={duty}
                onChange={(e)=>{
                  setDuty(e.target.value);
                }}
                placeholder="Type responsibility & press ADD:"
              />
              <div className="mt-4 flex items-center justify-end w-full">
                <a 
                onClick={handleAddDuty}
                className=" bg-blue-500 normalButtonTag w-[15%] cursor-pointer">Add</a>
              </div>
            </div>
          </div>

          <div className=" grid gap-2">
            <h4>Responsibilities:</h4>
            <ul className=" px-6">
              {duties.length > 0 && duties.map((item, index)=>{
                return <li className=" flex gap-2 items-center" key={index}>
                <ArrowRight size={18} />{item} <p className=" cursor-pointer text-red-500" onClick={()=>handleDeleteDuty(item)}>Remove</p></li>
              })}
            </ul>
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
