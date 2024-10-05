"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { revalidateTagFunc } from "@/services/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EditResearch({ goBack, prevData }) {
  const { userInfo } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const [interests, setInterests] = useState(
    prevData?.interest.length > 0 ? prevData?.interest : []
  );
  const [interest, setInterest] = useState("");

  const handleAddInterest = (e) => {
    if (!interest) {
      toast.error("Field is empty.");
      return;
    }
    setInterests((prev) => [...prev, interest]);
    setInterest("");
  };

  const handleDeleteInterest = (value) => {
    let arr = [];
    interests.map((item) => {
      if (item !== value) {
        arr.push(item);
      }
    });
    setInterests(arr);
  };

  const [reviewers, setReviewers] = useState(
    prevData?.reviewer.length > 0 ? prevData?.reviewer : []
  );
  const [reviewer, setReviewer] = useState("");

  const handleAddReviewer = (e) => {
    if (!reviewer) {
      toast.error("Field is empty.");
      return;
    }
    setReviewers((prev) => [...prev, reviewer]);
    setReviewer("");
  };

  const handleDeleteReviewer = (value) => {
    let arr = [];
    reviewers.map((item) => {
      if (item !== value) {
        arr.push(item);
      }
    });
    setReviewers(arr);
  };

  const [orgChairs, setOrgChairs] = useState(
    prevData?.organizationChair.length > 0 ? prevData?.organizationChair : []
  );
  const [orgChair, setOrgChair] = useState("");

  const handleAddOrgChair = (e) => {
    if (!orgChair) {
      toast.error("Field is empty.");
      return;
    }
    setOrgChairs((prev) => [...prev, orgChair]);
    setOrgChair("");
  };

  const handleDeleteOrgChair = (value) => {
    let arr = [];
    orgChairs.map((item) => {
      if (item !== value) {
        arr.push(item);
      }
    });
    setOrgChairs(arr);
  };

  const [sessionChairs, setSessionChairs] = useState(
    prevData?.sessionChair.length > 0 ? prevData?.sessionChair : []
  );
  const [sessionChair, setSessionChair] = useState("");

  const handleAddSessionChair = (e) => {
    if (!sessionChair) {
      toast.error("Field is empty.");
      return;
    }
    setSessionChairs((prev) => [...prev, sessionChair]);
    setSessionChair("");
  };

  const handleDeleteSessionChair = (value) => {
    let arr = [];
    sessionChairs.map((item) => {
      if (item !== value) {
        arr.push(item);
      }
    });
    setSessionChairs(arr);
  };

  const [members, setMembers] = useState(
    prevData?.members.length > 0 ? prevData?.members : []
  );
  const [member, setMember] = useState({ title: "", link: "" });

  const handleAddMember = (e) => {
    if (!member?.title) {
      toast.error("Enter the title of member.");
      return;
    }
    const urlRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/\S*)?$/;

    if (!urlRegex.test(member?.link)) {
      toast.error("Invalid URL");
      return;
    }

    setMembers((prev) => [...prev, member]);
    setMember({ title: "", link: "" });
  };

  const handleDeleteMember = (title) => {
    let arr = [];
    members.map((item) => {
      if (item?.title !== title) {
        arr.push(item);
      }
    });
    setMembers(arr);
  };

  const submitHandler = async (data) => {
    let body = {
      interest: interests,
      reviewer: reviewers,
      organizationChair: orgChairs,
      sessionChair: sessionChairs,
      members,
    };

    setIsLoading(true);

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
      body: JSON.stringify(body),
      redirect: "follow",
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/research/${prevData?._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          revalidateTagFunc("research");
          window.location.reload();
        } else {
          toast.error(result?.message);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className=" grid gap-x-6 gap-y-12">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-12 py-6">
        {/* research interest  */}
        <div>
          <div className=" grid gap-2">
            <h4 className=" font-semibold text-lg">Research Interest:</h4>
            <div>
              <input
                autoComplete="on"
                type="text"
                className=" inputTag"
                value={interest}
                onChange={(e) => {
                  setInterest(e.target.value);
                }}
                placeholder="Type research interest & press ADD:"
              />
              <div className="mt-4 flex items-center justify-end w-full">
                <a
                  onClick={handleAddInterest}
                  className=" bg-blue-500 normalButtonTag w-[15%] cursor-pointer"
                >
                  Add
                </a>
              </div>
            </div>
          </div>
          {interests.length > 0 && (
            <div className=" grid gap-2">
              <ul className=" px-4">
                {interests.map((interest, index) => {
                  return (
                    <li key={index} className=" flex items-center gap-2">
                      <ArrowRight size={19} />
                      {interest}{" "}
                      <a
                        className=" text-red-500 cursor-pointer"
                        onClick={() => {
                          handleDeleteInterest(interest);
                        }}
                      >
                        Remove
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Reviewer  */}
        <div>
          <div className=" grid gap-2">
            <h1 className=" font-semibold text-lg">Reviewer:</h1>
            <div>
              <input
                autoComplete="on"
                type="text"
                className=" inputTag"
                value={reviewer}
                onChange={(e) => {
                  setReviewer(e.target.value);
                }}
                placeholder="Type research reviewer & press ADD:"
              />
              <div className="mt-4 flex items-center justify-end w-full">
                <a
                  onClick={handleAddReviewer}
                  className=" bg-blue-500 normalButtonTag w-[15%] cursor-pointer"
                >
                  Add
                </a>
              </div>
            </div>
          </div>
          {reviewers.length > 0 && (
            <div className=" grid gap-2">
              <ul className=" px-4">
                {reviewers.map((review, index) => {
                  return (
                    <li key={index} className=" flex items-center gap-2">
                      <ArrowRight size={19} />
                      {review}{" "}
                      <a
                        className=" text-red-500 cursor-pointer"
                        onClick={() => {
                          handleDeleteReviewer(review);
                        }}
                      >
                        Remove
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Organising Chair  */}
        <div>
          <div className=" grid gap-2">
            <h1 className=" font-semibold text-lg">Organising Chair:</h1>
            <div>
              <input
                autoComplete="on"
                type="text"
                className=" inputTag"
                value={orgChair}
                onChange={(e) => {
                  setOrgChair(e.target.value);
                }}
                placeholder="Type Organising Chair & press ADD:"
              />
              <div className="mt-4 flex items-center justify-end w-full">
                <a
                  onClick={handleAddOrgChair}
                  className=" bg-blue-500 normalButtonTag w-[15%] cursor-pointer"
                >
                  Add
                </a>
              </div>
            </div>
          </div>
          {orgChairs.length > 0 && (
            <div className=" grid gap-2">
              <ul className=" px-4">
                {orgChairs.map((chair, index) => {
                  return (
                    <li key={index} className=" flex items-center gap-2">
                      <ArrowRight size={19} />
                      {chair}{" "}
                      <a
                        className=" text-red-500 cursor-pointer"
                        onClick={() => {
                          handleDeleteOrgChair(chair);
                        }}
                      >
                        Remove
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Session Chair  */}
        <div>
          <div className=" grid gap-2">
            <h1 className=" font-semibold text-lg">Session Chair:</h1>
            <div>
              <input
                autoComplete="on"
                type="text"
                className=" inputTag"
                value={sessionChair}
                onChange={(e) => {
                  setSessionChair(e.target.value);
                }}
                placeholder="Type Session Chair & press ADD:"
              />
              <div className="mt-4 flex items-center justify-end w-full">
                <a
                  onClick={handleAddSessionChair}
                  className=" bg-blue-500 normalButtonTag w-[15%] cursor-pointer"
                >
                  Add
                </a>
              </div>
            </div>
          </div>
          {sessionChairs.length > 0 && (
            <div className=" grid gap-2">
              <ul className=" px-4">
                {sessionChairs.map((chair, index) => {
                  return (
                    <li key={index} className=" flex items-center gap-2">
                      <ArrowRight size={19} />
                      {chair}{" "}
                      <a
                        className=" text-red-500 cursor-pointer"
                        onClick={() => {
                          handleDeleteSessionChair(chair);
                        }}
                      >
                        Remove
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Member  */}
      <div>
        <h1 className=" text-lg font-semibold">Member:</h1>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className=" grid gap-2">
            <h4>Title:</h4>
            <div>
              <input
                autoComplete="on"
                type="text"
                className=" inputTag"
                value={member?.title}
                onChange={(e) => {
                  setMember((prev) => {
                    return { ...prev, title: e.target.value };
                  });
                }}
                placeholder="Member Title"
              />
            </div>
          </div>
          <div className=" grid gap-2">
            <h4>Link:</h4>
            <div>
              <input
                autoComplete="on"
                type="text"
                className=" inputTag"
                value={member?.link}
                onChange={(e) => {
                  setMember((prev) => {
                    return { ...prev, link: e.target.value };
                  });
                }}
                placeholder="Member Link"
              />
            </div>
          </div>
        </div>
        <div className="my-4 flex items-center justify-end w-full">
          <a
            onClick={handleAddMember}
            className=" bg-blue-500 normalButtonTag w-[15%] cursor-pointer"
          >
            Add
          </a>
        </div>
        {members.length > 0 && (
          <ul className=" px-4">
            {members.map((mem, index) => {
              return (
                <li
                  key={index}
                  className=" flex items-start gap-4 "
                >
                  <ArrowRight className=" mt-1" size={19} />
                  <div>
                    <h1>{mem?.title}</h1>
                    <Link href={mem?.link} className=" text-blue-500">
                      {mem?.link}
                    </Link>
                  </div>
                  <a
                    className=" text-red-500 cursor-pointer ml-4"
                    onClick={() => {
                      handleDeleteMember(mem?.title);
                    }}
                  >
                    Remove
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {/* close and update btn  */}
      <div className=" flex items-center gap-4 py-4">
        {/* close btn  */}
        <button className=" normalButtonTag bg-red-500 w-full" onClick={goBack}>
          Cancel
        </button>
        {/* form submit btn  */}
        <button
          disabled={isLoading}
          onClick={submitHandler}
          className=" actionButtonTag w-full"
        >
          {isLoading ? "Loading..." : "Update"}
        </button>
      </div>
    </div>
  );
}
