"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ArrowLeftCircle, Upload } from "lucide-react";
import { revalidateTagFunc } from "@/services/utils";
import { useSelector } from "react-redux";

const schema = z.object({
  title: z.string(),
  first: z.string(),
  middle: z.string().optional(),
  last: z.string().optional(),
  bio: z.string(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  googleScholar: z.string().optional(),
  researchGate: z.string().optional(),
  currentPosAt: z.string(),
  currentPosTitle: z.string(),
  email: z.string().email(),
  phone: z.string(),
  about: z.string(),
  showOnHome: z.boolean(),
  typeOfStd: z.string(),
  otherType: z.string().optional(),
});

export default function EditStudent({prevData, goBack}) {
  let { userInfo } = useSelector((state) => state.user);
  userInfo = userInfo?.data;
  

  const [typeOfStd, setTypeOfStd] = useState(prevData?.typeOfStd);
  
  const [avatar, setAvatar] = useState({
    url: "",
    value: null,
    error: "",
  });

  const [cover, setCover] = useState({
    url: "",
    value: null,
    error: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: prevData?.name?.title,
      first: prevData?.name?.first,
      middle: prevData?.name?.middle,
      last: prevData?.name?.last,
      bio: prevData?.bio,
      about: prevData?.about,
      currentPosTitle: prevData?.currentPosition?.title,
      currentPosAt: prevData?.currentPosition?.at,
      email: prevData?.contact?.email,
      phone: prevData?.contact?.phone + "",
      instagram: prevData?.socials?.instagram,
      twitter: prevData?.socials?.twitter,
      facebook: prevData?.socials?.facebook,
      linkedin: prevData?.socials?.linkedin,
      github: prevData?.socials?.github,
      researchGate: prevData?.socials?.researchGate,
      googleScholar: prevData?.socials?.googleScholar,
      typeOfStd: prevData?.typeOfStd,
      otherType: prevData?.otherType,
      showOnHome: prevData?.showOnHome,
    },
    resolver: zodResolver(schema),
  });

  const submitHandler = async (data) => {
    let formdata = new FormData();

    if (avatar.url) {
      formdata.append("avatar", avatar.value, avatar.value?.name);
    }

    if (cover.url) {
      formdata.append("cover", cover.value, cover.value?.name);
    }

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
      typeOfStd: data?.typeOfStd,
      otherType: data?.otherType,
      showOnHome: data?.showOnHome ? "yes" : "no",
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

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/student/${prevData?._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          revalidateTagFunc("student");
          goBack();
          window.location.reload();
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
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

  function handleChangeCover(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setCover(() => {
          return { url: e.target.result, error: "", value: input.files[0] };
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  return (
    <div>
      <button onClick={goBack}><ArrowLeftCircle size={32} /></button>
    <form
      onSubmit={handleSubmit(submitHandler)}
      className=" grid gap-4 px-12 py-4"
    >
      {/* cover  */}
      <div className=" w-full relative flex flex-col gap-6 ">
        <Image
          className=" rounded h-[250px] w-full border dark:border-white border-black"
          src={cover?.url ? cover?.url : prevData?.cover ?  `/uploads/${prevData?.cover}` : '/uploads/sample.jpeg'}
          height={250}
          width={250}
          alt="Cover Picture width(any) x height(250px max)"
        />
        <label
          htmlFor="cover"
          className=" m-auto w-72 items-center justify-center flex gap-2 cursor-pointer p-2 rounded-lg outline outline-1 dark:outline-primary_bg_light outline-primary_bg_dark"
        >
          <Upload />
          Update Cover Picture
        </label>
        <input
autoComplete="on"

          className=" absolute opacity-0"
          type="file"
          name="cover"
          id="cover"
          accept="image/*"
          onChange={(event) => {
            handleChangeCover(event);
          }}
        />
      </div>

      {/* avatar, name & bio  */}
      <div className=" flex p-8 bg-ray-500">
        {/* avatar  */}
        <div className=" w-[25%] relative flex flex-col gap-6">
          <Image
            className=" rounded-full aspect-square border dark:border-white border-black"
            src={avatar?.url ? avatar?.url : prevData?.avatar ?  `/uploads/${prevData?.avatar}` : '/uploads/sample.jpeg'}
            height={250}
            width={250}
            alt="Profile picture"
          />
          <label
            htmlFor="avatar"
            className=" flex gap-2 cursor-pointer p-2 rounded-lg outline outline-1 dark:outline-primary_bg_light outline-primary_bg_dark"
          >
            <Upload />
            Update Profile Picture
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
      {/* type of std & show on homw ?  */}
      <div className=" grid gap-2 grid-cols-2">
        {/* type of std  */}
        <div className=" grid gap-2">
            <h4>Type Of Std:</h4>
            <div>
              <select
                {...register("typeOfStd")}
                onChange={(e) => {
                  setTypeOfStd(e.target.value);
                }}
                className="inputTag"
              >
                <option value="">Select type of student</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="graduated">Graduated</option>
                <option value="master">Masters</option>
                <option value="phd">PhD</option>
                <option value="assistant-professor">Assistant Professor</option>
                <option value="professor">Professor</option>
                <option value="researcher">Researcher</option>
                <option value="other">Other</option>
              </select>
              {errors?.typeOfStd && (
                <div className="text-red-500 text-sm">
                  {errors?.typeOfStd?.message}
                </div>
              )}
            </div>
          </div>
          {typeOfStd === "other" && (
            <div className=" grid gap-2">
              <h4>Other Type:</h4>
              <div>
                <input
                  autoComplete="on"
                  {...register("otherType")}
                  type="text"
                  className=" inputTag"
                  placeholder="Other Type"
                />
                {errors?.otherType && (
                  <div className=" text-red-500 text-sm">
                    {errors?.otherType?.message}
                  </div>
                )}
              </div>
            </div>
          )}
        {/* show on home */}
        <div className=" grid gap-2 overflow-hidden">
          <h1>Show On Home Page</h1>
          <div>
            <label className="flex items-center space-x-2">
              <input
autoComplete="on"

                {...register("showOnHome")}
                type="checkbox"
                className="inputTag scale-150"
              />
            </label>
            {errors?.showOnHome && (
              <div className="text-red-500 text-sm">
                {errors?.showOnHome?.message}
              </div>
            )}
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

      {/* form submit btn  */}
      <button
        disabled={isSubmitting}
        type="submit"
        className=" actionButtonTag"
      >
        {isSubmitting ? "Loading..." : "Update"}
      </button>
    </form>
    </div>
  );
}
