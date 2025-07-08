import { Card,Typography } from "antd";

import  { Link } from "react-router";
import { accentColor } from "../utils/constans";
const { Paragraph } = Typography;
function CardItem({
  link,
  title,
  Icon,
  description,
}: {
  link: string;
  title: string;
  Icon: React.ElementType;
  description: string;
}) {
  return (
    <Link to={link}>
      <Card
        title={title}
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
export default CardItem;