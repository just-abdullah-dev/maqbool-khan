"use client";
import { useState } from "react";
import { Copy } from "lucide-react"; // Importing the Copy icon from lucide-react

const CopyURL = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url); // Copying the URL to clipboard
    setCopied(true); // Set copied state to true
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="gap-4 max-w-2xl mx-auto ">
      <h2 className="text-lg font-semibold mb-3 pl-2">API URL</h2>
      <div className="py-2 px-4 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-between">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline "
        >
          {url}
        </a>
        <button
          onClick={handleCopy}
          className="flex h-fit p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 hover:dark:bg-gray-900 dark:text-white rounded-lg transition-colors"
        >
          <Copy className="w-5 h-5" />
          <span className=" ml-2 text-sm ">{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
};

export default CopyURL;
