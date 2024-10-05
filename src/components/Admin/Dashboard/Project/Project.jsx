"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAll, revalidateTagFunc } from "@/services/utils";
import Loading from "@/components/Utils/Loading";
import Error from "@/components/Utils/Error";
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import getFormatDate from "@/utils/formateDate";
import { ArrowRight, ChevronDown, ChevronUp, SquarePen, Trash } from "lucide-react";

export default function Project() {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [allProjects, setAllProjects] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedObj, setSelectedObj] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const deleteProject = async (_id) => {
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

      await fetch(`${process.env.API_BASE_URL}/projects/${_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            toast.success(result?.message);
            window.location.reload();
            revalidateTagFunc("projects");
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
      const data = await getAll(userInfo?.data?.id, "projects");
      if (data?.success) {
        setAllProjects(data?.data);
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
            <AddProject
              goBack={() => {
                setIsAdd(false);
              }}
            />
          ) : isEdit ? (
            <EditProject
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
                {allProjects.length > 0 &&
                  allProjects.map((item, index) => {
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
                          <div className=" w-full grid gap-1">
                            <div className=" flex items-center justify-between">
                              <h1 className=" text-2xl font-semibold">
                                {item?.title}
                              </h1>
                              <p className="mt-1">
                              Show on Home: {item?.showOnHome?"True":"False"}
                            </p>
                              <div className="">
                                {getFormatDate(item?.from)} ---{" "}
                                {item?.isCompleted
                                  ? getFormatDate(item?.to)
                                  : "Currently Working"}
                              </div>
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
                                    deleteProject(item?._id);
                                  }}
                                >
                                  <Trash />
                                </button>
                              </div>
                            </div>
                              
                            <Link
                            href={item?.link}
                            className=" text-blue-500"
                            >{item?.link}</Link>
                            <h1 className=" text-xl font-semibold">{item?.institute}</h1>
                            {/* responsibilities in bullet points  */}
                            {item?.responsibilities.length > 0 && <>
                            <h1 className=" text-lg font-semibold">Responsibilities:</h1>
                            <ul className=" px-4">
                              {item?.responsibilities.map((ele, index)=>{
                              return <li key={index} className="flex items-center gap-2">
                                <ArrowRight size={19} />
                                {ele}
                              </li>
                            })}
                              </ul></>}
                            <p>{item?.desc}</p>

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
