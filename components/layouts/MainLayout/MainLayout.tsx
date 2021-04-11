import {
  CustomHead,
  Profile,
  BaseHeader,
  BaseFooter,
} from "~/components/common";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.root}>
      <CustomHead />
      <BaseHeader />
      <Profile />
      <main className="pt-5">{children}</main>
      <BaseFooter />
    </div>
  );
};

export default MainLayout;
