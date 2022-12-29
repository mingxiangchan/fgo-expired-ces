const { Header, Content } = Layout;
import { Layout } from "antd";
import { PropsWithChildren } from "react";
import styles from "../styles/PageLayout.module.css";

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout hasSider>
      <Layout className={styles["site-layout"]}>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        ></Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};
