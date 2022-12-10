import type { NextPage } from "next";
import { CeList } from "../components/CeList";
import { CraftEssence, SortOptions } from "../types";
import fsPromises from "fs/promises";
import path from "path";
import { useState } from "react";
import { Segmented } from "antd";

type Props = {
  craftEssences: CraftEssence[];
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

  const sortOptions = Object.values(SortOptions);

  return (
    <div>
      <Segmented
        block
        options={sortOptions}
        value={selectedSorting}
        onChange={setSorting}
      />
      <CeList craftEssences={craftEssences} sortOption={selectedSorting} />
    </div>
  );
};

export default Home;
