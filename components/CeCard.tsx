import { PCraftEssence } from "../types";
import { Typography, List, Timeline, Row, Divider, Tag } from "antd";
import Image from "next/image";

type Props = {
  ce: PCraftEssence;
};

export const CeCard = ({ ce }: Props) => {
  // const link = `https://apps.atlasacademy.io/db/NA/craft-essence/${ce.id}`
  return (
    <>
      <List.Item.Meta
        avatar={
          <Image
            alt={ce.name}
            src={ce.imageUrl}
            title={ce.imageUrl}
            height={128}
            width={128}
          />
        }
        title={ce.name}
        description={
          <>
            <Row>
              <Typography.Paragraph
                ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
              >
                {ce.effect}
              </Typography.Paragraph>
            </Row>
            <Row>
              {ce.hasEvent ? (
                <Tag color="blue">Event</Tag>
              ) : (
                <Tag color="grey">No Event</Tag>
              )}
              {ce.hasRevival ? <Tag color="red">Revival</Tag> : null}
            </Row>
            {ce.hasEvent === false ? null : (
              <>
                <Divider orientation="left">Past Events</Divider>
                <Row>
                  <Timeline>
                    {ce.events.map((event) => (
                      <Timeline.Item key={event.id}>
                        {event.startedAt.split("T")[0]}
                        <br />
                        {event.name}
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Row>
              </>
            )}
          </>
        }
      ></List.Item.Meta>
    </>
  );
};
