import type { NextPage } from "next";
import { CeList } from "../components/CeList";
import { PCraftEssence, SortOptions } from "../types";
import fsPromises from "fs/promises";
import path from "path";
import { useState } from "react";
import { Row, Col, Select, Switch } from "antd";

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
  const [selectedSorting, setSorting] = useState<SortOptions>(
    SortOptions.atkAsc
  );

  const [showNonEvent, setNonEventFilter] = useState<boolean>(false);

  const sortOptions = Object.values(SortOptions).map((value) => ({
    value,
    label: value,
  }));

  return (
    <div>
      <Row style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>
        <Col offset={1} span={22}>
          <Select
            defaultValue={SortOptions.atkAsc}
            options={sortOptions}
            onChange={setSorting}
            style={{ width: 300 }}
          />
          <Switch
            checked={showNonEvent}
            checkedChildren={"Include Non Event CEs"}
            unCheckedChildren={"Hide Non Event CEs"}
            onChange={setNonEventFilter}
            style={{
              marginLeft: "2rem",
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col offset={1} span={22}>
          <CeList
            craftEssences={craftEssences}
            sortOption={selectedSorting}
            showNonEvent={showNonEvent}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
