"use client";

import Image from "next/image";
import { useState } from "react";

export default function ServiceRequestCardImage({ src }: { src: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt="Service request invoice image"
        width={80}
        height={80}
        onClick={(_) => setIsModalOpen(true)}
      />
      <div
        className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center"
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <Image
          src={src}
          alt="Service request invoice image"
          width={400}
          height={400}
          onClick={(_) => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}
