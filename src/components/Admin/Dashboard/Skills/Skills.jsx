"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAll, revalidateTagFunc } from "@/services/utils";
import Loading from "@/components/Utils/Loading";
import Error from "@/components/Utils/Error";
import AddSkill from "./AddSkill";
import EditSkill from "./EditSkills";
import { ArrowRight, ChevronDown, ChevronUp, SquarePen, Trash } from "lucide-react";

export default function Skills() {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [allSkills, setAllSkills] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedObj, setSelectedObj] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const deleteSkill = async (_id) => {
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

      await fetch(`${process.env.API_BASE_URL}/skills/${_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            toast.success(result?.message);
            window.location.reload();
            revalidateTagFunc("skills");
          } else {
            toast.error(result?.message);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  useEffect(() => {
    const main = async () => {
      setIsLoading(true);
      const data = await getAll(userInfo?.data?.id, "skills");
      if (data?.success) {
        setAllSkills(data?.data);
      } else {
        setIsError(data?.message);
      }
      setIsLoading(false);
    };
    main();
  }, []);

  return (
    <div className=" px-12 py-6">
      {isError ? (
        <Error message={isError} />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div>
          {isAdd ? (
            <AddSkill
              goBack={() => {
                setIsAdd(false);
              }}
            />
          ) : isEdit ? (
            <EditSkill
              prevData={selectedObj}
              goBack={() => {
                setIsEdit(false);
                setSelectedObj(null);
              }}
            />
          ) : (
            <>
              {/* add or close btn  */}
              <div className="w-full flex flex-row-reverse">
                <button
                  onClick={() => {
                    setIsAdd(!isAdd);
                  }}
                  type="button"
                  className={` actionButtonTag w-[10%] float right-0`}
                >
                  Add
                </button>
              </div>

              <ul className=" p-12 grid gap-6">
                {allSkills.length > 0 &&
                  allSkills.map((item, index) => {
                    if (selectedID === item?._id) {
                      return (
                        // detail view 
                        <li key={index} className=" flex items-start gap-4 rounded-lg bg-gray-300 dark:bg-gray-800 py-6 px-12">
                          <button
                            onClick={() => {
                              setSelectedID("");
                            }}
                            className="flex items-center justify-center"
                            type="button"
                          >
                            <ChevronUp size={32} />
                          </button>
                          <div className=" w-full">
                            <div className=" flex items-center justify-between">
                              <h1 className=" text-2xl font-semibold">
                                {item?.title}
                              </h1>
                              <p className="mt-1">
                              Show on Home: {item?.showOnHome?"True":"False"}
                            </p>
                              <div className="  flex gap-4 ">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedObj(item);
                                    setIsEdit(true);
                                  }}
                                >
                                  <SquarePen />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    deleteSkill(item?._id);
                                  }}
                                >
                                  <Trash />
                                </button>
                              </div>
                            </div>
                            <ul className=" px-6">
                              {item?.items.map((skill, index)=>{
                                return <li className=" flex gap-2 items-center" key={index}>
                                  <ArrowRight size={18} />{skill}</li>
                              })}
                            </ul>
                          </div>
                        </li>
                      );
                    } else {
                      return (
                        <li key={index} className=" flex gap-4 items-start rounded-lg bg-gray-300 dark:bg-gray-800 py-6 px-12">
                          <div
                            className="flex items-center justify-center cursor-pointer"
                            onClick={() => {
                              setSelectedID(item?._id);
                            }}
                          >
                            <ChevronDown size={32} />
                          </div>
                          <h1 className=" text-2xl font-semibold">
                            {item?.title}
                          </h1>
                          <p className="mt-1">
                              Show on Home: {item?.showOnHome?"True":"False"}
                            </p>
                        </li>
                      );
                    }
                  })}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
