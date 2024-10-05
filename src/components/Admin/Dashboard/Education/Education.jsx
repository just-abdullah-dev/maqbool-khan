"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAll, revalidateTagFunc } from "@/services/utils";
import Loading from "@/components/Utils/Loading";
import Error from "@/components/Utils/Error";
import AddEducation from "./AddEducation";
import EditEducation from "./EditEducation";
import getFormatDate from "@/utils/formateDate";
import { ChevronDown, ChevronUp, SquarePen, Trash } from "lucide-react";

export default function Education() {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [allEducations, setAllEducations] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedObj, setSelectedObj] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const deleteEducation = async (_id) => {
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

      await fetch(`${process.env.API_BASE_URL}/education/${_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            toast.success(result?.message);
            window.location.reload();
            revalidateTagFunc("education");
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
      const data = await getAll(userInfo?.data?.id, "education");
      if (data?.success) {
        setAllEducations(data?.data);
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
            <AddEducation
              goBack={() => {
                setIsAdd(false);
              }}
            />
          ) : isEdit ? (
            <EditEducation
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
                {allEducations.length > 0 &&
                  allEducations.map((item, index) => {
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
                                {item?.degree}
                              </h1>
                              <p className="mt-1">
                              Show on Home: {item?.showOnHome?"True":"False"}
                            </p>
                              <div className="">
                                {getFormatDate(item?.from)} ---{" "}
                                {item?.to
                                  ? getFormatDate(item?.to)
                                  : "Currently Enrolled"}
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
                                    deleteEducation(item?._id);
                                  }}
                                >
                                  <Trash />
                                </button>
                              </div>
                            </div>

                            <h1 className="text-xl font-semibold">
                              {item?.field}
                            </h1>

                            <div className="text-lg font-semibold flex gap-2">
                              <h1>{item?.institute},</h1>
                              <p className=" font-bold">{item?.country}</p>
                            </div>
                            <p>{item?.desc}</p>
                          </div>
                        </li>
                      );
                    } else {
                      return (
                        // short view 
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
                            {item?.degree}
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
