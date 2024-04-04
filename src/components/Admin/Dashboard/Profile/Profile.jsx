"use client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";

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
});

export default function Profile() {
  let { userInfo } = useSelector((state) => state.user);
  userInfo = userInfo?.data;
  console.log(userInfo);

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
      phone: userInfo?.contact?.phone,
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
    try {
      var formdata = new FormData();
formdata.append("files", fileInput.files[0], "abbas2.jpg");
formdata.append("body", body);

var requestOptions = {
  method: 'PUT',
  body: formdata,
  redirect: 'follow'
};

fetch("/api/personal/maqboolkhan", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className=" grid gap-4 px-12 py-4"
      >
        {/* avatar, name & bio  */}
        <div className=" flex p-8 bg-ray-500">
          {/* avatar  */}
          <div className=" w-[25%] flex items-center justify-center">
            <Image
              className=" rounded-full"
              src={`/uploads/${userInfo?.avatar}`}
              height={250}
              width={250}
              alt="Profile picture"
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
