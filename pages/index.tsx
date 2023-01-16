import type { NextPage } from "next";
import { CeList } from "../components/CeList";
import { PCraftEssence } from "../types";
import fsPromises from "fs/promises";
import path from "path";
import { Row, Col } from "antd";
import { ListFilters } from "../components/ListFilters";

type Props = {
  craftEssences: PCraftEssence[];
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public/results.json");
  const jsonData = await fsPromises.readFile(filePath);
  const craftEssences = JSON.parse(jsonData as unknown as string);

  return {
    props: {
      craftEssences,
    },
  };
}

const Home: NextPage<Props> = ({ craftEssences }) => {
  return (
    <div>
      <ListFilters />
      <Row>
        <Col offset={1} span={22}>
          <CeList craftEssences={craftEssences} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
