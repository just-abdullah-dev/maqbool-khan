"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAll, revalidateTagFunc } from "@/services/utils";
import Loading from "@/components/Utils/Loading";
import Error from "@/components/Utils/Error";
import EditResearch from "./EditResearch";
import { ArrowRight, SquarePen } from "lucide-react";

export default function Research() {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [allResearch, setAllResearch] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedObj, setSelectedObj] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const deleteResearch = async (_id) => {
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

      await fetch(`/api/research/${_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            toast.success(result?.message);
            revalidateTagFunc("research");
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
      const data = await getAll("maqboolkhan", "research");
      if (data?.success) {
        setAllResearch(data?.data);
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
          {isEdit ? (
            <EditResearch
              prevData={allResearch.length > 0 ? allResearch[0] : null}
              goBack={() => {
                setIsEdit(false);
              }}
            />
          ) : (
            <>
              <div className=" w-full mt-4 mr-4">
                <SquarePen
                  className=" cursor-pointer float-right"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                />
              </div>
              <ul className=" p-12 grid gap-6">
                {allResearch.length > 0 &&
                  allResearch.map((item, index) => {
                    return (
                      <li key={index} className="grid gap-6 py-6">
                        {/* research interest  */}
                        {item?.interest.length > 0 && (
                          <div className=" grid gap-2">
                            <h1 className=" font-semibold text-xl">
                              Research Interest:
                            </h1>
                            <ul className=" px-4">
                              {item?.interest.map((interest, index) => {
                                return (
                                  <li
                                    key={index}
                                    className=" flex items-center gap-2"
                                  >
                                    <ArrowRight size={19} />
                                    {interest}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}

                        {/* research reviewer  */}
                        {item?.reviewer.length > 0 && (
                          <div className=" grid gap-2">
                            <h1 className=" font-semibold text-xl">
                              Reviewer:
                            </h1>
                            <ul className=" px-4">
                              {item?.reviewer.map((reviewer, index) => {
                                return (
                                  <li
                                    key={index}
                                    className=" flex items-center gap-2"
                                  >
                                    <ArrowRight size={19} />
                                    {reviewer}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}

                        {/* research organizationChair  */}
                        {item?.organizationChair.length > 0 && (
                          <div className=" grid gap-2">
                            <h1 className=" font-semibold text-xl">
                              Organization Chair:
                            </h1>
                            <ul className=" px-4">
                              {item?.organizationChair.map(
                                (organizationChair, index) => {
                                  return (
                                    <li
                                      key={index}
                                      className=" flex items-center gap-2"
                                    >
                                      <ArrowRight size={19} />
                                      {organizationChair}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        )}
                        {/* research sessionChair  */}
                        {item?.sessionChair.length > 0 && (
                          <div className=" grid gap-2">
                            <h1 className=" font-semibold text-xl">
                              Session Chair:
                            </h1>
                            <ul className=" px-4">
                              {item?.sessionChair.map((sessionChair, index) => {
                                return (
                                  <li
                                    key={index}
                                    className=" flex items-center gap-2"
                                  >
                                    <ArrowRight size={19} />
                                    {sessionChair}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}

                        {/* research member  */}
                        {item?.members.length > 0 && (
                          <div className=" grid gap-2">
                            <h1 className=" font-semibold text-xl">Member:</h1>
                            <ul className=" px-4">
                              {item?.members.map((member, index) => {
                                return (
                                  <li
                                    key={index}
                                    className=" flex items-center gap-2"
                                  >
                                    <ArrowRight size={19} />
                                    <div>
                                      <h1>{member?.title}</h1>
                                      <Link
                                        href={member?.link}
                                        className=" text-blue-500"
                                      >
                                        {member?.link}
                                      </Link>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
