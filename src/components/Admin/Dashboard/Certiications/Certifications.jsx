"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAll, revalidateTagFunc } from "@/services/utils";
import Loading from "@/components/Utils/Loading";
import Error from "@/components/Utils/Error";
import { ChevronDown, ChevronUp, SquarePen, Trash } from "lucide-react";
import AddCertification from "./AddCertification";
import EditCertification from "./EditCertification";
import Image from "next/image";

export default function Certifications() {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [allCertifications, setAllCertifications] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedObj, setSelectedObj] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const deleteCertification = async (_id) => {
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

      await fetch(`/api/v1/certifications/${_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            toast.success(result?.message);
            revalidateTagFunc("certifications");
            window.location.reload();
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
      const data = await getAll("maqboolkhan", "certifications");
      if (data?.success) {
        setAllCertifications(data?.data);
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
            <AddCertification
              goBack={() => {
                setIsAdd(false);
              }}
            />
          ) : isEdit ? (
            <EditCertification
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
                {allCertifications.length > 0 &&
                  allCertifications.map((item, index) => {
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
                                    deleteCertification(item?._id);
                                  }}
                                >
                                  <Trash />
                                </button>
                              </div>
                            </div>
                            <div className=" grid grid-cols-1 lg:grid-cols-2">
                              <div className=" py-4">
                                <div className=" flex items-center gap-4 text-lg font-semibold">
                                  {item?.seriesId && (
                                    <h1>Series ID: {item?.seriesId}</h1>
                                  )}
                                  {item?.certificationId && (
                                    <h1>Certification ID: {item?.certificationId}</h1>
                                  )}
                                </div>
                                <Link
                                  href={item?.link}
                                  className=" text-blue-500"
                                >
                                  {item?.link}
                                </Link>
                              </div>
                              {/* image  */}
                              {item?.image && (
                                <Link
                                  href={item?.link}
                                  className=" w-full flex items-center justify-center mt-4"
                                >
                                  <Image
                                    className=" rounded-full aspect-square"
                                    width={200}
                                    height={200}
                                    alt="Certificate Logo"
                                    src={`/uploads/${item?.image}`}
                                  />
                                </Link>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    } else {
                      return (
                        <li key={index} className=" flex gap-4 items-start">
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
