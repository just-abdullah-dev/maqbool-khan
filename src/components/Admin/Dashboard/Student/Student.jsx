"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAll, revalidateTagFunc } from "@/services/utils";
import Loading from "@/components/Utils/Loading";
import Error from "@/components/Utils/Error";
import { ChevronDown, ChevronUp, SquarePen, Trash } from "lucide-react";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import Image from "next/image";

export default function Student() {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [allStudents, setAllStudents] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedObj, setSelectedObj] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const deleteStudent = async (_id) => {
    if (!window.confirm("Are you sure to remove this student?")) {
      return;
    } else {
      var requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userInfo?.data?.token}`,
        },
        redirect: "follow",
      };

      await fetch(`/api/v1/student/${_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            toast.success(result?.message);
            window.location.reload();
            revalidateTagFunc("student");
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
      const data = await getAll("maqboolkhan", "student");
      if (data?.success) {
        setAllStudents(data?.data);
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
            <AddStudent
              goBack={() => {
                setIsAdd(false);
              }}
            />
          ) : isEdit ? (
            <EditStudent
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
                {allStudents.length > 0 &&
                  allStudents.map((item, index) => {
                    if (selectedID === item?._id) {
                      return (
                        // detail view
                        <li key={index} className=" flex flex-wrap items-start gap-4 rounded border border-black p-4 pl-2 dark:border-white">
                          <button
                            onClick={() => {
                              setSelectedID("");
                            }}
                            className="flex items-center justify-center"
                            type="button"
                          >
                            <ChevronUp size={32} />
                          </button>
                          <div className=" w-full grid gap-4">
                            <div className=" flex items-center justify-between">
                              <div className=" flex gap-2 items-center">
                                {/* name  */}
                                <h1 className=" text-2xl font-semibold">
                                  {item?.name?.title && item?.name?.title + "."}{" "}
                                  {item?.name?.first} {item?.name?.middle}{" "}
                                  {item?.name?.last}{" "}
                                </h1>
                                -
                                <h3>
                                  {item?.typeOfStd === "undergraduate" &&
                                    "Undergraduate"}
                                  {item?.typeOfStd === "graduated" &&
                                    "Graduated"}
                                  {item?.typeOfStd === "master" && "Masters"}
                                  {item?.typeOfStd === "phd" && "PhD"}
                                </h3>
                                -
                            <p className=" mt-1">
                              Show on Home: {item?.showOnHome?"True":"False"}
                            </p>
                              </div>
                              {/* btns  */}
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
                                    deleteStudent(item?._id);
                                  }}
                                >
                                  <Trash />
                                </button>
                              </div>
                            </div>
                            <Image
                              width={600}
                              height={600}
                              className=" rounded w-full h-[200px]"
                              src={`/uploads/${item?.cover}`}
                              alt={"Cover Picture"}
                            />
                            <div className=" grid grid-cols-1 md:grid-cols-2">
                              <Image
                                width={150}
                                height={150}
                                className=" rounded-full aspect-square"
                                src={`/uploads/${item?.avatar}`}
                                alt={"Profile Picture"}
                              />
                              <div className=" grid gap-2">
                                <div>
                                  <h1 className=" font-semibold text-lg">
                                    Bio:
                                  </h1>
                                  <p>{item?.bio}</p>
                                </div>
                                <div>
                                  <h1 className=" font-semibold text-lg">
                                    About:
                                  </h1>
                                  <p>{item?.about}</p>
                                </div>
                                <div>
                                  <h1 className=" font-semibold text-lg">
                                    Current Status:
                                  </h1>
                                  <p>
                                    {item?.currentPosition?.title} at{" "}
                                    {item?.currentPosition?.at}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* socials links  */}
                            <div>
                              <h1 className=" text-lg font-semibold">
                                Socials Links:
                              </h1>
                              <div>
                                <div className=" flex items-center gap-2">
                                  <h3 className=" font-semibold">
                                    Instagram:{" "}
                                  </h3>
                                  <Link
                                    className=" text-blue-500"
                                    href={item?.socials?.instagram}
                                  >
                                    {item?.socials?.instagram}
                                  </Link>
                                </div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">Twitter: </h3>
                                  <Link
                                    className="text-blue-500"
                                    href={item?.socials?.twitter}
                                  >
                                    {item?.socials?.twitter}
                                  </Link>
                                </div>

                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">Facebook: </h3>
                                  <Link
                                    className="text-blue-500"
                                    href={item?.socials?.facebook}
                                  >
                                    {item?.socials?.facebook}
                                  </Link>
                                </div>

                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">LinkedIn: </h3>
                                  <Link
                                    className="text-blue-500"
                                    href={item?.socials?.linkedin}
                                  >
                                    {item?.socials?.linkedin}
                                  </Link>
                                </div>

                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">GitHub: </h3>
                                  <Link
                                    className="text-blue-500"
                                    href={item?.socials?.github}
                                  >
                                    {item?.socials?.github}
                                  </Link>
                                </div>

                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">
                                    Google Scholar:{" "}
                                  </h3>
                                  <Link
                                    className="text-blue-500"
                                    href={item?.socials?.googleScholar}
                                  >
                                    {item?.socials?.googleScholar}
                                  </Link>
                                </div>

                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">
                                    Research Gate:{" "}
                                  </h3>
                                  <Link
                                    className="text-blue-500"
                                    href={item?.socials?.researchGate}
                                  >
                                    {item?.socials?.researchGate}
                                  </Link>
                                </div>
                              </div>
                            </div>

                          </div>
                        </li>
                      );
                    } else {
                      return (
                        // short view
                        <li key={index} className=" flex gap-4 items-start">
                          <div
                            className="flex items-center justify-center cursor-pointer"
                            onClick={() => {
                              setSelectedID(item?._id);
                            }}
                          >
                            <ChevronDown size={32} />
                          </div>
                          <div className=" flex gap-4 items-center">
                            {/* name  */}
                            <h1 className=" text-2xl font-semibold">
                              {item?.name?.title && item?.name?.title + "."}{" "}
                              {item?.name?.first} {item?.name?.middle}{" "}
                              {item?.name?.last}{" "}
                            </h1>
                            -
                            <h3>
                              {item?.typeOfStd === "undergraduate" &&
                                "Undergraduate"}
                              {item?.typeOfStd === "graduated" && "Graduated"}
                              {item?.typeOfStd === "master" && "Masters"}
                              {item?.typeOfStd === "phd" && "PhD"}
                            </h3>
                            -
                            <p className=" mt-1">
                              Show on Home: {item?.showOnHome?"True":"False"}
                            </p>
                          </div>
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
