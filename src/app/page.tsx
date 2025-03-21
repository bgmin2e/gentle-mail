import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Download GentleMail here</h1>
      <p className="text-lg">
        GentleMail is a Chrome extension that helps you write emails in a more
        natural and friendly way.
      </p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Download
      </button>
    </div>
  );
}
