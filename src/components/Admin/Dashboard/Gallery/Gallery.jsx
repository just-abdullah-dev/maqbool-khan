"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAll, revalidateTagFunc } from "@/services/utils";
import Loading from "@/components/Utils/Loading";
import Error from "@/components/Utils/Error";
import { ChevronDown, ChevronUp, SquarePen, Trash } from "lucide-react";
import Image from "next/image";
import AddGallery from "./AddGallery";
import EditGallery from "./EditGallery";

export default function Gallery() {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedObj, setSelectedObj] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const deleteCountry = async (_id) => {
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

      await fetch(`/api/gallery/${_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            toast.success(result?.message);
            revalidateTagFunc("gallery");
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
      const data = await getAll("maqboolkhan", "gallery");
      if (data?.success) {
        setAllCountries(data?.data);
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
            <AddGallery
              goBack={() => {
                setIsAdd(false);
              }}
            />
          ) : isEdit ? (
            <EditGallery
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
                {allCountries.length > 0 &&
                  allCountries.map((item, index) => {
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
                                {item?.countryName}
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
                                    deleteCountry(item?._id);
                                  }}
                                >
                                  <Trash />
                                </button>
                              </div>
                            </div>
                            <p><b>Slug:</b> {item?.slug}</p>
                            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                              {/* image  */}
                              {item?.images.length > 0 && (
                                item?.images.map((img, index)=>{
                                  if(index === 4){
                                    return;
                                  }
                                  return <div key={index} className=" flex items-center justify-center">
                                     <Image
                                  className=" rounded-xl"
                                  width={200}
                                  height={200}
                                  alt={item?.countryName}
                                  src={`/uploads/${img}`}
                                />
                                    </div>
                                })
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
                            {item?.countryName}
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
