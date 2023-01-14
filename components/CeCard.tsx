import { PCraftEssence } from "../types";
import { Card, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

type Props = {
  ce: PCraftEssence;
};

export const CeCard = ({ ce }: Props) => {
  return (
    <Card
      actions={[
        <a
          href={`https://apps.atlasacademy.io/db/NA/craft-essence/${ce.id}`}
          key="info"
          target="_blank"
          rel="noreferrer"
        >
          <InfoCircleOutlined />
        </a>,
      ]}
      cover={<img alt={ce.name} src={ce.imageUrl} title={ce.imageUrl} />}
    >
      <Card.Meta
        title={ce.name}
        description={
          <Typography.Paragraph
            ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
          >
            {ce.effect}
          </Typography.Paragraph>
        }
      />
    </Card>
  );
};
