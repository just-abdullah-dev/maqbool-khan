"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/store/reducers/userReducer";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import ChangePassword from "./ChangePassword";
import { revalidateTagFunc } from "@/services/utils";
import BGImages from "./BGImages";
import Link from "next/link";
import CopyURL from "../CopyURL";

const schema = z.object({
  title: z.string(),
  first: z.string(),
  middle: z.string(),
  last: z.string(),
  bio: z.string(),
  instagram: z.string().url(),
  twitter: z.string().url(),
  facebook: z.string().url(),
  linkedin: z.string().url(),
  github: z.string().url(),
  googleScholar: z.string().url(),
  researchGate: z.string().url(),
  currentPosAt: z.string(),
  currentPosTitle: z.string(),
  email: z.string().email(),
  phone: z.string(),
  about: z.string(),
});

export default function Profile() {
  const [newImages, setNewImages] = useState([]);
  const [deletingImages, setDeletingImages] = useState([]);
  const [isChangeBGImages, setIsChangeBGImages] = useState(false);

  const [isChangePassword, setIsChangePassword] = useState(false);
  const handlePasswordBtn = () => {
    setIsChangePassword(!isChangePassword);
    console.log(!isChangePassword);
  };
  let { userInfo } = useSelector((state) => state.user);
  userInfo = userInfo?.data;
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState({
    url: "",
    value: null,
    error: "",
  });

  const [resume, setResume] = useState({
    name: "",
    value: null,
    error: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: userInfo?.name?.title,
      first: userInfo?.name?.first,
      middle: userInfo?.name?.middle,
      last: userInfo?.name?.last,
      bio: userInfo?.bio,
      about: userInfo?.about,
      currentPosTitle: userInfo?.currentPosition?.title,
      currentPosAt: userInfo?.currentPosition?.at,
      email: userInfo?.contact?.email,
      phone: userInfo?.contact?.phone + "",
      instagram: userInfo?.socials?.instagram,
      twitter: userInfo?.socials?.twitter,
      facebook: userInfo?.socials?.facebook,
      linkedin: userInfo?.socials?.linkedin,
      github: userInfo?.socials?.github,
      researchGate: userInfo?.socials?.researchGate,
      googleScholar: userInfo?.socials?.googleScholar,
    },
    resolver: zodResolver(schema),
  });

  const submitHandler = async (data) => {
    let formdata = new FormData();
    if (avatar.url) {
      formdata.append("avatar", avatar.value, avatar.value?.name);
    }
    if (resume.name) {
      formdata.append("cv", resume.value, resume.value?.name);
    }
    newImages.forEach((img) => {
      formdata.append("bgImages", img, img.name);
    });

    const body = {
      name: {
        title: data?.title,
        first: data?.first,
        middle: data?.middle,
        last: data?.last,
      },
      currentPosition: {
        title: data?.currentPosTitle,
        at: data?.currentPosAt,
      },
      contact: {
        email: data?.email,
        phone: parseInt(data?.phone),
      },
      socials: {
        instagram: data?.instagram,
        twitter: data?.twitter,
        facebook: data?.facebook,
        linkedin: data?.linkedin,
        github: data?.github,
        googleScholar: data?.googleScholar,
        researchGate: data?.researchGate,
      },
      bio: data?.bio,
      about: data?.about,
      deletingBGImages: deletingImages,
    };
    formdata.append("body", JSON.stringify(body));

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/personal/${userInfo?.data?.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          dispatch(userActions.setUserInfo(result));
          localStorage.setItem("account", JSON.stringify(result));
          toast.success(result?.message);
          revalidateTagFunc("personal");
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
    setAvatar({
      url: "",
      value: null,
      error: "",
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

  function handleChangeResume(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setResume(() => {
          return { name: file.name, error: "", value: file };
        });
      } else {
        setResume(() => {
          return {
            name: "",
            error: "Invalid file type. Please upload a PDF or Word document.",
            value: null,
          };
        });
      }
    }
  }

  return (
    <div>
      <div className="flex items-center px-12 pt-4 justify-center">
        <button
          className={`${
            isChangePassword ? "bg-red-500 normalButtonTag" : "actionButtonTag"
          } w-[30%]`}
          onClick={handlePasswordBtn}
          type="button"
        >
          {isChangePassword ? "Close" : "Change Password?"}
        </button>
      </div>
      {isChangePassword ? (
        <ChangePassword />
      ) : (
        <>
          <CopyURL
            url={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${process.env.NEXT_PUBLIC_API_BASE_URL}/personal/${userInfo?.id}`}
          />
          <form
            onSubmit={handleSubmit(submitHandler)}
            className=" grid gap-4 px-12 py-4"
          >
            {/* avatar, name & bio  */}
            <div className=" flex p-8 bg-ray-500">
              {/* avatar  */}
              <div className=" w-[25%] relative flex flex-col gap-6">
                <Image
                  className=" rounded-full aspect-square"
                  src={
                    avatar?.url ? avatar?.url : `/uploads/${userInfo?.avatar}`
                  }
                  height={250}
                  width={250}
                  alt="Profile picture"
                />
                <label
                  htmlFor="avatar"
                  className=" flex gap-2 cursor-pointer p-2 rounded-lg outline outline-1 dark:outline-primary_bg_light outline-primary_bg_dark"
                >
                  <Upload />
                  Update Picture
                </label>
                <input
                  autoComplete="on"
                  className=" absolute opacity-0"
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  onChange={(event) => {
                    handleChangeAvatar(event);
                  }}
                />
              </div>

              {/* name & bio  */}
              <div className=" w-[75%] p-4 grid gap-4">
                {/* name div  */}
                <div className="grid gap-2">
                  <h4>Name:</h4>
                  <div className=" grid gap-2 grid-cols-2">
                    <div>
                      <input
                        autoComplete="on"
                        {...register("title")}
                        type="text"
                        className=" inputTag"
                        placeholder="title"
                      />
                      {errors?.title && (
                        <div className=" text-red-500 text-sm">
                          {errors?.title?.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        autoComplete="on"
                        {...register("first")}
                        type="text"
                        className=" inputTag"
                        placeholder="first"
                      />
                      {errors?.first && (
                        <div className=" text-red-500 text-sm">
                          {errors?.first?.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        autoComplete="on"
                        {...register("middle")}
                        type="text"
                        className=" inputTag"
                        placeholder="middle"
                      />
                      {errors?.middle && (
                        <div className=" text-red-500 text-sm">
                          {errors?.middle?.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        autoComplete="on"
                        {...register("last")}
                        type="text"
                        className=" inputTag"
                        placeholder="last"
                      />
                      {errors?.last && (
                        <div className=" text-red-500 text-sm">
                          {errors?.last?.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* bio  */}
                <div className=" grid gap-2">
                  <h4>Bio:</h4>
                  <div>
                    <textarea
                      {...register("bio")}
                      type="text"
                      className=" inputTag"
                      placeholder="bio"
                      rows={4}
                    />
                    {errors?.bio && (
                      <div className=" text-red-500 text-sm">
                        {errors?.bio?.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* current position  */}
            <div className=" grid gap-2">
              <h4>Current Position:</h4>
              <div className=" grid grid-cols-2 gap-2">
                <div>
                  <input
                    autoComplete="on"
                    {...register("currentPosTitle")}
                    type="text"
                    className=" inputTag"
                    placeholder="currentPosTitle"
                  />
                  {errors?.currentPosTitle && (
                    <div className=" text-red-500 text-sm">
                      {errors?.currentPosTitle?.message}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    autoComplete="on"
                    {...register("currentPosAt")}
                    type="text"
                    className=" inputTag"
                    placeholder="currentPosAt"
                  />
                  {errors?.currentPosAt && (
                    <div className=" text-red-500 text-sm">
                      {errors?.currentPosAt?.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* about  */}
            <div className=" grid gap-2">
              <h4>About:</h4>
              <div>
                <textarea
                  {...register("about")}
                  type="text"
                  className=" inputTag w-full"
                  placeholder="about"
                  rows={8}
                />
                {errors?.about && (
                  <div className=" text-red-500 text-sm">
                    {errors?.about?.message}
                  </div>
                )}
              </div>
            </div>
            {/* contact  */}
            <div className=" grid gap-2">
              <h4>Contact:</h4>
              <div className=" grid grid-cols-2 gap-2">
                <div>
                  <input
                    autoComplete="on"
                    {...register("email")}
                    type="text"
                    className=" inputTag"
                    placeholder="email"
                  />
                  {errors?.email && (
                    <div className=" text-red-500 text-sm">
                      {errors?.email?.message}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    autoComplete="on"
                    {...register("phone")}
                    type="number"
                    className=" inputTag"
                    placeholder="Phone # e.g: 923101234567"
                  />
                  {errors?.phone && (
                    <div className=" text-red-500 text-sm">
                      {errors?.phone?.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* socials links  */}
            <div className="grid gap-2">
              <h4>Social Links:</h4>
              <div className=" grid gap-2 grid-cols-2">
                <div>
                  <input
                    autoComplete="on"
                    {...register("instagram")}
                    type="text"
                    className=" inputTag"
                    placeholder="instagram"
                  />
                  {errors?.instagram && (
                    <div className=" text-red-500 text-sm">
                      {errors?.instagram?.message}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    autoComplete="on"
                    {...register("twitter")}
                    type="text"
                    className=" inputTag"
                    placeholder="twitter"
                  />
                  {errors?.twitter && (
                    <div className=" text-red-500 text-sm">
                      {errors?.twitter?.message}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    autoComplete="on"
                    {...register("facebook")}
                    type="text"
                    className=" inputTag"
                    placeholder="facebook"
                  />
                  {errors?.facebook && (
                    <div className=" text-red-500 text-sm">
                      {errors?.facebook?.message}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    autoComplete="on"
                    {...register("linkedin")}
                    type="text"
                    className=" inputTag"
                    placeholder="linkedin"
                  />
                  {errors?.linkedin && (
                    <div className=" text-red-500 text-sm">
                      {errors?.linkedin?.message}
                    </div>
                  )}
                </div>

                <div>
                  <input
                    autoComplete="on"
                    {...register("github")}
                    type="text"
                    className=" inputTag"
                    placeholder="github"
                  />
                  {errors?.github && (
                    <div className=" text-red-500 text-sm">
                      {errors?.github?.message}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    autoComplete="on"
                    {...register("googleScholar")}
                    type="text"
                    className=" inputTag"
                    placeholder="googleScholar"
                  />
                  {errors?.googleScholar && (
                    <div className=" text-red-500 text-sm">
                      {errors?.googleScholar?.message}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    autoComplete="on"
                    {...register("researchGate")}
                    type="text"
                    className=" inputTag"
                    placeholder="researchGate"
                  />
                  {errors?.researchGate && (
                    <div className=" text-red-500 text-sm">
                      {errors?.researchGate?.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* cv input  */}
            <div className="grid gap-2">
              <h1>Resume/CV: </h1>
              <div className=" w-full grid grid-cols-2 relative gap-6">
                <Link
                  className=" p-2 rounded-lg outline outline-1 dark:outline-primary_bg_light outline-primary_bg_dark text-center"
                  href={`/uploads/${userInfo?.cv}`}
                  target="_blank"
                >
                  View Previous CV
                </Link>
                <label
                  htmlFor="avatar"
                  className=" flex gap-2 cursor-pointer p-2 rounded-lg outline outline-1 dark:outline-primary_bg_light outline-primary_bg_dark overflow-hidden"
                >
                  <Upload />
                  Upload New Resume
                  <input
                    autoComplete="on"
                    className=" absolute opacity-0 cursor-pointer"
                    type="file"
                    name="resume"
                    id="resume"
                    onChange={(event) => {
                      handleChangeResume(event);
                    }}
                  />
                  {resume?.error ? (
                    <p className=" text-red-500 text-sm">{resume?.error}</p>
                  ) : resume?.name ? (
                    <p className=" text-sm">{resume?.name}</p>
                  ) : (
                    <p className=" text-sm">No File Chosen</p>
                  )}
                </label>
              </div>
            </div>

            {/* home page bg images  */}
            <div className=" grid place-items-center gap-2">
              <h1 className=" text-lg font-semibold">
                Home Page Background Images:
              </h1>
              {isChangeBGImages ? (
                <BGImages
                  saveBGImages={(newImagesParams, deletingImagesParams) => {
                    setDeletingImages(deletingImagesParams);
                    setNewImages(newImagesParams);
                    setIsChangeBGImages(!isChangeBGImages);
                  }}
                  bgImages={userInfo?.bgImages}
                  goBack={() => {
                    setIsChangeBGImages(!isChangeBGImages);
                  }}
                />
              ) : (
                <button
                  className=" seeMoreTag w-96"
                  onClick={() => {
                    setIsChangeBGImages(!isChangeBGImages);
                  }}
                >
                  Update BG Images
                </button>
              )}
            </div>

            {/* form submit btn  */}
            <button
              disabled={isSubmitting}
              type="submit"
              className=" actionButtonTag"
            >
              {isSubmitting ? "Loading..." : "Update Profile"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
