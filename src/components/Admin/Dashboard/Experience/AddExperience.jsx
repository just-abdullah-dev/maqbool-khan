import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  company: z.string(),
  from: z.date(),
  to: z.date(),
  bio: z.string(),
  link: z.string().url(),
  desc: z.string(),
});

export default function AddExperience({ goBack }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitHandler = async (data) => {
    const body = {
      title: data?.title,
      desc: data?.desc,
      from: data?.from,
      to: data?.to,
      link: data?.link,
      company: data?.company,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      body: JSON.stringify(body),
      redirect: "follow",
    };

    await fetch("/api/experience/maqboolkhan", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          window.location.reload();
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className=" grid gap-4 px-12 py-4"
      >
        {/* form submit btn  */}
        <button
          disabled={isSubmitting}
          type="submit"
          className=" actionButtonTag"
        >
          {isSubmitting ? "Loading..." : "Save & Publish"}
        </button>
      </form>
    </div>
  );
}
