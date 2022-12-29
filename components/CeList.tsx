import { CraftEssence, SortOptions } from "../types";
import { List } from "antd";
import { CeCard } from "./CeCard";
import { NUM_COLUMNS } from "../utils/constants";

type Props = {
  craftEssences: CraftEssence[];
  sortOption: SortOptions;
};

export const CeList = ({ craftEssences, sortOption }: Props) => {
  const sortedCes = [...craftEssences];

  // sort by ascending base atk
  sortedCes.sort((first, second) => {
    if (sortOption === SortOptions.alpAsc) {
      return first.name > second.name ? 1 : -1;
    }
    if (sortOption === SortOptions.alpDesc) {
      return first.name < second.name ? 1 : -1;
    }
    if (sortOption === SortOptions.atkAsc) {
      return first.atkBase > second.atkBase ? 1 : -1;
    }
    if (sortOption === SortOptions.atkDesc) {
      return first.atkBase < second.atkBase ? 1 : -1;
    }
    if (sortOption === SortOptions.hpAsc) {
      return first.hpBase > second.hpBase ? 1 : -1;
    }
    if (sortOption === SortOptions.hpDesc) {
      return first.hpBase < second.hpBase ? 1 : -1;
    }
    return 0;
  });

  return (
    <List
      dataSource={sortedCes}
      grid={{
        gutter: 0,
        column: NUM_COLUMNS,
      }}
      renderItem={(item) => (
        <List.Item>
          <CeCard ce={item} />
        </List.Item>
      )}
    ></List>
  );
};
