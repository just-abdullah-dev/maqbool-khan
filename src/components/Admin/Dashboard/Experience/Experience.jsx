"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAllExperience, revalidateTagFunc } from "@/services/utils";
import Loading from "@/components/Utils/Loading";
import Error from "@/components/Utils/Error";
import AddExperience from "./AddExperience";
import EditExperience from "./EditExperience";
import getFormatDate from "@/utils/formateDate";
import { ChevronDown, ChevronUp, SquarePen, Trash } from "lucide-react";

export default function Experience() {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [allExperiences, setAllExperiences] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedObj, setSelectedObj] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const deleteExperience = async (_id) => {
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

      await fetch(`/api/experience/${_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            toast.success(result?.message);
            window.location.reload();
            revalidateTagFunc('experience');
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
      const data = await getAllExperience("maqboolkhan");
      if (data?.success) {
        setAllExperiences(data?.data);
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
            <AddExperience
              goBack={() => {
                setIsAdd(false);
              }}
            />
          ) : isEdit ? (
            <EditExperience
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
                  className={`bg-blue-500 normalButtonTag w-[10%] float right-0`}
                >
                  Add
                </button>
              </div>

              <ul className=" p-12 grid gap-6">
                {allExperiences.length > 0 &&
                  allExperiences.map((item, index) => {
                    if (selectedID === item?._id) {
                      return (
                        <li key={index} className=" flex items-start gap-4">
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
                              <div className="">
                                {getFormatDate(item?.from)} ---{" "}
                                {item?.to ? getFormatDate(item?.to) : "Present"}
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
                                    deleteExperience(item?._id);
                                  }}
                                >
                                  <Trash />
                                </button>
                              </div>
                            </div>

                            <Link target={"_blank"} href={item?.link}>
                              <h1 className="text-lg font-semibold">
                                {item?.company}
                              </h1>
                            </Link>
                            <p>{item?.desc}</p>
                          </div>
                        </li>
                      );
                    } 
                    else {
                      return (
                        <li key={index} className=" flex gap-4 items-start">
                          <div
                            className="flex items-center justify-center"
                            onClick={() => {
                              setSelectedID(item?._id);
                            }}
                          >
                            <ChevronDown size={32} />
                          </div>
                          <h1 className=" text-2xl font-semibold">
                            {item?.title}
                          </h1>
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

