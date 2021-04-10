import BaseHeader from "~/components/BaseHeader";
import BaseFooter from "~/components/BaseFooter";
import CustomHead from "~/components/CustomHead";
import Profile from "~/components/Profile";
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
