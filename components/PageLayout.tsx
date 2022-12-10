import { UserOutlined } from "@ant-design/icons";
const { Header, Sider, Content } = Layout;
import { Layout, Menu } from "antd";
import { PropsWithChildren } from "react";
import styles from "../styles/PageLayout.module.css";

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout className={styles.layout}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className={styles.logo} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Home",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
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
