import { Profile, BaseHeader, BaseFooter } from "~/components/common";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.root}>
      <BaseHeader />
      <Profile />
      <main className="pt-5">{children}</main>
    </div>
  );
};

export default MainLayout;
