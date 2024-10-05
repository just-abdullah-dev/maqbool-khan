"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAll, revalidateTagFunc } from "@/services/utils";
import Loading from "@/components/Utils/Loading";
import Error from "@/components/Utils/Error";
import { ArrowRight, ChevronDown, ChevronUp, SquarePen, Trash } from "lucide-react";
import AddSpecialization from "./AddSpecialization";
import EditSpecialization from "./EditSpecialization";

export default function Specializations() {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [allSpecializations, setAllSpecializationspecializations] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedObj, setSelectedObj] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const deleteSpecialization = async (_id) => {
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

      await fetch(`${process.env.API_BASE_URL}/specialization/${_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            toast.success(result?.message);
            window.location.reload();
            revalidateTagFunc("specialization");
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
      const data = await getAll(userInfo?.data?.id, "specialization");
      if (data?.success) {
        setAllSpecializationspecializations(data?.data);
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
            <AddSpecialization
              goBack={() => {
                setIsAdd(false);
              }}
            />
          ) : isEdit ? (
            <EditSpecialization
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
                {allSpecializations.length > 0 &&
                  allSpecializations.map((item, index) => {
                    if (selectedID === item?._id) {
                      return (
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
                                    deleteSpecialization(item?._id);
                                  }}
                                >
                                  <Trash />
                                </button>
                              </div>
                              
                            </div>
                            <Link href={item?.link} className=" text-blue-500" >
                            {item?.link}
                            </Link>
                            {/* courses  */}
                            <ul className=" px-6">
                              {item?.courses.map((course, index)=>{
                                return <li className=" flex gap-2 items-start" key={index}>
                                  <ArrowRight className=" mt-1" size={19} />
                                  <div>
                                    <h1>{course?.title}</h1>
                                    <Link href={course?.link} className=" text-blue-500">{course?.link}</Link>
                                  </div>
                                  
                                  </li>
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
