"use client";
import error from "@/app/error";
import { LoaderIcon, Send, SendHorizonal } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMsg = async (e) => {
    e.preventDefault();
    const emailPattern = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!name) {
      // toast error
      toast.error("Please enter name");
      return;
    } else if (!emailPattern.test(email)) {
      //toast error
      toast.error("Please enter valid email");
      return;
    } else if (!subject) {
      // toast err
      toast.error("Please type a subject");
      return;
    } else if (!message) {
      // toast err
      toast.error("Please type a message");
      return;
    }
     
    setIsLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message, subject }),
    };
    await fetch(`/api/v1/mail/contact/sendMail/maqboolkhan`, options)
      .then((data) => data.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          setName("");
          setEmail("");
          setMessage("");
          setSubject("");
        } else {
          toast.error(data?.message);
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error(error?.message);
        console.error(error);
        setIsLoading(false)
      });
  };
  return (
    <div className="p-4 lg:p-12 grid gap-2">
      <h1 className=" text-5xl lg:text-6xl text-mountain-meadow-500 font-serif relative">
        <div className="absolute bottom-0 left-0 h-[51%] z-50 w-[330px] bg-white dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-40"></div>
        CONTACT
      </h1>

      {/* form  */}
      <form
        onSubmit={(e) => {
          sendMsg(e);
        }}
        className=" md:px-32 lg:px-64 xl:px-80 grid gap-6 my-8"
      >
        <input
          className=" inputTag2 w-full"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <input
          className=" inputTag2 w-full"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
        />
        <input
          // disabled={type !== undefined}
          className=" inputTag2 w-full"
          name="subject"
          type="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Your Subject"
        />
        <textarea
          className=" inputTag2 w-full h-32"
          name="message"
          typeof="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message goes here..."
        />
        <button 
        disabled={isLoading}
        className="contactBtn w-full group" type="submit">
          {isLoading?
          <LoaderIcon className=" animate-spin" />:<>
          <span className="text-lg">Send</span>
          <Send
            strokeWidth={2}
            className="group-hover:opacity-0 group-hover:scale-95 transition-opacity duration-300 group-hover:absolute"
          />
          <SendHorizonal
            strokeWidth={2}
            className="opacity-0 group-hover:opacity-100 group-hover:scale-100 group-hover:block transition-opacity duration-300"
          /></>}
        </button>
      </form>
    </div>
  );
}
