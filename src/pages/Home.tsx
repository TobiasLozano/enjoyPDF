import { Divider, Typography, Space } from "antd";
import {
  ShrinkOutlined,
  SnippetsOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import CardItem from "../components/CardItem";

const { Title, Paragraph } = Typography;


function Home() {
  const items = [
    {
      link: "merge",
      title: "Merge",
      Icon: ShrinkOutlined,
      description: "Upload your PDF files to merge them into one.",
    },
    {
      link: "extract",
      Icon: SnippetsOutlined,
      title: "Extract images",
      description: "Extract pages from your PDF into shareable images",
    },
    {
      link: "generate",
      title: "Generate from images",
      Icon: FileImageOutlined,
      description: "Create a PDF file by uploading your images",
    },
  ];
  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        Enjoy PDF ✨
      </Title>
      <Paragraph style={{ textAlign: "center" }}>
        Useful tools to enjoy your PDF files
      </Paragraph>{" "}
      <Divider />
      <Space
        direction="horizontal"
        size="middle"
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {items.map((item) => (
          <CardItem
            key={item.link}
            title={item.title}
            link={item.link}
            Icon={item.Icon}
            description={item.description}
          />
        ))}
      </Space>
    </>
  );
}

export default Home;
