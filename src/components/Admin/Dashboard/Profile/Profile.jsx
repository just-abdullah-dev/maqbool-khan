"use client";

import { Camera, CircleUserRound, Loader2Icon, PenSquare } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "./ChangePassword";
import { userActions } from "@/store/reducers/userReducer";

function ProfileData() {
  return <div>Profile dashboard</div>;
  const [isEdit, setIsEdit] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo?.success) {
      toast.error("You are not logged in.");
      router.back();
    } else {
      setName(() => {
        return { value: userInfo?.name, error: "" };
      });
      setUsername(() => {
        return { value: userInfo?.username, error: "" };
      });
      setBio(() => {
        return { value: userInfo?.bio, error: "" };
      });
      setAbout(() => {
        return { value: userInfo?.about, error: "" };
      });
    }
  }, [router, userInfo]);

  const [name, setName] = useState({
    value: {
      title: "",
      first: "",
      middle: "",
      last: ""
    },
    error: "",
  });

  const [currentPosition, setCurrentPosition] = useState({
    value: {
      title: "",
      at: ""
    },
    error: ""
  });

  const [contact, setContact] = useState({
    value: {
      phone: 0,
      email: ""
    },
    error: ""
  });

  const [socials, setSocials] = useState({
    value: {
      instagram: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    github: "",
    googleScholar: "",
    researchGate: ""
    },
    error: ""
  })

  const [bio, setBio] = useState({
    value: "",
    error: "",
  });
  const [about, setAbout] = useState({
    value: "",
    error: "",
  });
  const [avatar, setAvatar] = useState({
    url: "",
    value: null,
    error: "",
  });

  const handleChangeName = (e) => {
    const name = e.target.value;
    setName(() => {
      return { value: name, error: "" };
    });
  };
  const handleChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(() => {
      return { value: username, error: "" };
    });
  };
  const handleChangeBio = (e) => {
    const bio = e.target.value;
    setBio(() => {
      return { value: bio, error: "" };
    });
  };
  const handleChangeAbout = (e) => {
    const about = e.target.value;
    setAbout(() => {
      return { value: about, error: "" };
    });
  };
  function handleChangeAvatar(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setAvatar(() => {
          return { url: e.target.result, error: "", value: input.files[0] };
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  async function handleUpdateProfile() {
    setIsLoading(true);
    var formdata = new FormData();
    if (avatar.url) {
      formdata.append("avatar", avatar.value, avatar.value?.name);
    }
    const body = {
      name: name.value,
      username: username.value,
      bio: bio.value,
      about: about.value,
    };
    formdata.append("document", JSON.stringify(body));

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      body: formdata,
      redirect: "follow",
    };

    await fetch("/api/users/updateProfile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          dispatch(userActions.setUserInfo(result?.data));
          localStorage.setItem("account", JSON.stringify(result?.data));
          toast.success("Profile Updated!");
        } else {
          toast.error(data?.message);
        }
      })
      .catch((error) => console.log("error", error));
      setIsEdit(false);
      setIsLoading(false);
  }
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex flex-col flex-wrap items-center justify-between gap-6 bg-white py-10 px-24 w-[800px] rounded-3xl shadow-[-6px_-1px_25px_5px_#00000024]">
        {!isEdit && (
          <PenSquare
            color="#595959"
            className="absolute top-10 right-10 cursor-pointer"
            onClick={() => {
              setIsEdit(true);
            }}
          />
        )}
        <div className={`flex items-center justify-around gap-8`}>
          <div className="w-[260px] flex items-center justify-center relative group">
            {isEdit && (
              <div className="w-[150px] aspect-square duration-300 absolute z-10 cursor-pointer opacity-0 group-hover:opacity-100 rounded-full bg-transparent bg-opacity-30 bg-dark-grey flex items-center justify-center">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                  onChange={(event) => {
                    handleChangeAvatar(event);
                  }}
                />
                <Camera
                  color="#ffffff"
                  className=""
                  size={70}
                />
              </div>
            )}
            {userInfo?.avatar || avatar.url ? (
              <Image
                width={150}
                height={150}
                src={avatar.url ? avatar.url : `/media${userInfo?.avatar}`}
                alt="DP"
                className="rounded-full aspect-square"
              />
            ) : (
              <CircleUserRound size={150} strokeWidth={1} stroke="#595959" />
            )}
          </div>
          <div
            className={`${
              isEdit ? "gap-1 " : ""
            } flex flex-col items-start w-full`}
          >
            {isEdit ? (
              <>
                <label className="labelTag">Name:</label>
                <input
                  className="inputTag w-full"
                  type="text"
                  value={name.value}
                  onChange={(e) => {
                    handleChangeName(e);
                  }}
                />
              </>
            ) : (
              <h1 className="font-bold text-2xl mb-6">{userInfo?.name}</h1>
            )}
            {isEdit ? (
              <>
                <label className="labelTag">Username:</label>
                <input
                  className="inputTag w-full"
                  type="text"
                  value={username.value}
                  onChange={(e) => {
                    handleChangeUsername(e);
                  }}
                />
              </>
            ) : (
              <h1 className="font-semibold text-lg">{userInfo?.username}</h1>
            )}
          </div>
        </div>
        <div className={`${isEdit && "w-[85%]"}`}>
          <div className="">
            {isEdit ? (
              <>
                <label className="block labelTag">Bio:</label>
                <input
                  className="inputTag w-full"
                  type="text"
                  value={bio.value}
                  onChange={(e) => {
                    handleChangeBio(e);
                  }}
                />
              </>
            ) : (
              <p className="leading-6 font-semibold text-lg">{userInfo?.bio}</p>
            )}
            {isEdit ? (
              <>
                <label className="block labelTag">About:</label>
                <textarea
                  className="inputTag w-full"
                  value={about.value}
                  onChange={(e) => {
                    handleChangeAbout(e);
                  }}
                ></textarea>
              </>
            ) : (
              <p className="leading-8 mt-4">{userInfo?.about}</p>
            )}
          </div>
        </div>
        {isEdit && (
          <div className="flex items-end gap-6 justify-end w-[85%]">
            <button
              className="normalButtonTag bg-red-500 w-[16%]"
              onClick={() => {
                setIsEdit(false);
              }}
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              className="actionButtonTag w-[16%]"
              onClick={handleUpdateProfile}
            >
              {isLoading ?
              <Loader2Icon className='animate-spin' />:
              'Update' }
            </button>
          </div>
        )}
      <ChangePassword />
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ProfileData), { ssr: false });
