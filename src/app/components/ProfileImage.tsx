import Image from "next/image";
import React from "react";

const ProfileImage = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    className="object-cover w-10 h-10 rounded-full"
    src={src || "/default-image.png"}
    alt={alt}
    width={40}
    height={40}
    priority
  />
);

export default ProfileImage;
