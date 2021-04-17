import React from "react";
import clsx from "clsx";
import { Link } from "~/components/ui";
import { Avatar } from "~/components/common";
import styles from "./Profile.module.css";

export interface ProfileProps {
  className?: string;
}

const Profile: React.VFC<ProfileProps> = ({ className }) => (
  <aside className={clsx(styles.root, className)}>
    <Avatar className={styles.avatar} />
    <div className={styles.description}>
      <p>
        Personal blog by{" "}
        <Link href="https://twitter.com/tdkn_">Shun Tedokon</Link>.
      </p>
      <p>I write about design, programming, and thinking.</p>
    </div>
  </aside>
);

export default Profile;
