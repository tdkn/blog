import React from "react";
import Image from "next/image";
import clsx from "clsx";

export interface Props {
  className?: string;
}

const Avatar: React.VFC<Props> = ({ className }) => (
  <div
    className={clsx(
      "relative overflow-hidden rounded-full w-16 h-16 mr-4",
      className
    )}
  >
    <Image src="/avatar.jpg" alt="Avatar" layout="fill" objectFit="cover" />
  </div>
);

export default Avatar;
