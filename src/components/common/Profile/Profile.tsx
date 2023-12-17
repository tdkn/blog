import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

import { Link } from "~/components/ui";
import { classNames } from "~/lib/style";

const Profile = ({
  className,
  ...otherProps
}: ComponentPropsWithoutRef<"aside">) => (
  <aside
    className={classNames("flex flex-row items-center text-sm", className)}
    {...otherProps}
  >
    <Image
      alt="Shun Tedokon"
      className="inline-block h-16 w-16 rounded-full"
      height={64}
      src="/avatar.jpg"
      width={64}
    />
    <p className="ml-4">
      Personal blog by{" "}
      <Link href="https://twitter.com/tdkn_">Shun Tedokon</Link>.
      <br />I write about design, programming, and thinking.
    </p>
  </aside>
);

export default Profile;
