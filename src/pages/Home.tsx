import { Divider, Typography, Space, Card } from "antd";
import {
  ShrinkOutlined,
  SnippetsOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { accentColor } from "../utils/constans";
import { Link } from "react-router";
const { Title, Paragraph } = Typography;

function CardItem({
  link,
  Icon,
  description,
}: {
  link: string;
  Icon: React.ElementType;
  description: string;
}) {
  return (
    <Link to={link}>
      <Card
        title="Merge PDF"
        variant="borderless"
        style={{
          width: 300,
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
        hoverable
      >
        <Icon
          style={{
            marginBottom: "10px",
            fontSize: "40px",
            color: "white",
            borderRadius: "30%",
            padding: "10px",
            background: accentColor,
          }}
        />
        <Paragraph>{description} </Paragraph>
      </Card>
    </Link>
  );
}
function Home() {
  const items = [
    {
      link: "merge",
      Icon: ShrinkOutlined,
      description: "Upload your PDF files to merge them into one.",
    },
    {
      link: "split",
      Icon: SnippetsOutlined,
      description: "Extract pages from your PDF into shareable images",
    },
    {
      link: "generate",
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
