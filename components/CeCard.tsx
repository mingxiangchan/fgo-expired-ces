import { CraftEssence } from "../types";
import { Card, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

type Props = {
  ce: CraftEssence;
};

export const CeCard = ({ ce }: Props) => {
  // const url = `https://apps.atlasacademy.io/db/NA/craft-essence/${ce.id}`;
  const eventIds = new Set<number>();
  for (const skill of ce.skills) {
    for (const func of skill.functions) {
      for (const effect of func.funcGroup) {
        if (effect.eventId) {
          eventIds.add(effect.eventId);
        }
      }
    }
  }

  return (
    <Card
      actions={[
        <a
          href={`https://apps.atlasacademy.io/db/NA/craft-essence/${ce.id}`}
          key="info"
        >
          <InfoCircleOutlined />
        </a>,
      ]}
      cover={
        <img
          alt={ce.name}
          src={Object.values(ce.extraAssets.charaGraph.equip)[0]}
          title={ce.skills[0]?.detail}
        />
      }
    >
      <Card.Meta
        title={ce.name}
        description={
          <Typography.Paragraph
            ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
          >
            {ce.skills[0].detail}
          </Typography.Paragraph>
        }
      />
    </Card>
  );
};
