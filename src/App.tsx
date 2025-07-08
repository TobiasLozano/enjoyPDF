import React, { useState } from "react";
import { Layout, Menu, theme, type MenuProps } from "antd";
import { Link, Outlet, useNavigate } from "react-router";
import {
  SnippetsOutlined,
  ShrinkOutlined,
  FileImageOutlined,
  FilePdfFilled,
} from "@ant-design/icons";
import type { MenuItemType } from "antd/es/menu/interface";

const { Header, Content, Footer } = Layout;

const items: MenuItemType[] = [
  {
    label: "Merge PDF",

    key: "merge",
    icon: <ShrinkOutlined />,
  },
  {
    label: "Extract images",
    key: "extract",
    icon: <SnippetsOutlined />,
  },
  {
    label: "Image to PDF",
    key: "generate",
    icon: <FileImageOutlined />,
  },
];
const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [current, setCurrent] = useState("mail");
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    navigate(`/${e.key}`);

    setCurrent(e.key);
  };

  return (
    <Layout>
      <Header
        style={{ display: "flex", alignItems: "center" }}
        className="header"
      >
        <Link to="/">
          <FilePdfFilled
            style={{ fontSize: "32px", marginRight: "50px", color: "white" }}
          />
        </Link>

        <Menu
          theme="light"
          mode="horizontal"
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          onClick={onClick}
          selectedKeys={[current]}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            height: "calc(100vh - 130px)",
            overflowY: "scroll",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />

        
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Created with ❤️ by Tobias</Footer>
    </Layout>
  );
};

export default App;
