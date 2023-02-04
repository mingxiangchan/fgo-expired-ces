import { Layout } from "antd";
import Link from "next/link";
import { PropsWithChildren } from "react";
import styles from "../styles/PageLayout.module.css";
import { UPDATED_ON } from "../utils/constants";

const { Header, Content, Footer } = Layout;

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo}>
          FGO Past Event CE List (Updated on {UPDATED_ON})
        </div>
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        Import on 2023-01-21 from{" "}
        <Link href="https://atlasacademy.io/data/">Atlas Academy</Link>
      </Footer>
    </Layout>
  );
};
