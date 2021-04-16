import React from "react";
import clsx from "clsx";
import { Link } from "~/components/ui";
import { Avatar } from "~/components/common";

export interface ProfileProps {
  className?: string;
}

const Profile: React.VFC<ProfileProps> = ({ className }) => (
  <aside className={clsx("flex items-center", className)}>
    <Avatar />
    <div className="text-sm">
      <p>
        Personal blog by{" "}
        <Link
          className="font-bold leading-none"
          href="https://twitter.com/tdkn_"
        >
          Shun Tedokon
        </Link>
        .
      </p>
      <p>I write about design, programming, and thinking.</p>
    </div>
  </aside>
);

export default Profile;
