const { Header, Content } = Layout;
import { Layout } from "antd";
import { PropsWithChildren } from "react";
import styles from "../styles/PageLayout.module.css";

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo}>FGO Past Event CE List</div>
      </Header>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
};
