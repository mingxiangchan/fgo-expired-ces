import { PCraftEssence, SortOptions } from "../types";
import { List } from "antd";
import { CeCard } from "./CeCard";
import { CONTAINER_HEIGHT, ITEM_HEIGHT } from "../utils/constants";
import VirtualList from "rc-virtual-list";
import { useAppSelector } from "../utils/store";
import { includeNonEvent, sorting } from "../utils/reducers/filtersReducer";

type Props = {
  craftEssences: PCraftEssence[];
};

export const CeList = ({ craftEssences }: Props) => {
  const includeNonEventOpt = useAppSelector(includeNonEvent);
  const sortOption = useAppSelector(sorting);

  const sortedCes = includeNonEventOpt
    ? [...craftEssences]
    : craftEssences.filter((ce) => ce.hasEvent);

  // sort by ascending base atk
  sortedCes.sort((first, second) => {
    if (sortOption === SortOptions.alpAsc) {
      return first.name > second.name ? 1 : -1;
    }
    if (sortOption === SortOptions.alpDesc) {
      return first.name < second.name ? 1 : -1;
    }
    if (sortOption === SortOptions.atkAsc) {
      if (first.atkBase === second.atkBase) {
        return first.id > second.atkBase ? 1 : -1;
      }

      return first.atkBase > second.atkBase ? 1 : -1;
    }
    if (sortOption === SortOptions.atkDesc) {
      if (first.atkBase === second.atkBase) {
        return first.id > second.atkBase ? 1 : -1;
      }

      return first.atkBase < second.atkBase ? 1 : -1;
    }
    if (sortOption === SortOptions.hpAsc) {
      if (first.hpBase === second.hpBase) {
        return first.id > second.atkBase ? 1 : -1;
      }

      return first.hpBase > second.hpBase ? 1 : -1;
    }
    if (sortOption === SortOptions.hpDesc) {
      if (first.hpBase === second.hpBase) {
        return first.id > second.atkBase ? 1 : -1;
      }

      return first.hpBase < second.hpBase ? 1 : -1;
    }
    return 0;
  });

  return (
    <List>
      <VirtualList
        data={sortedCes}
        height={CONTAINER_HEIGHT}
        itemHeight={ITEM_HEIGHT}
        itemKey="id"
      >
        {(item: PCraftEssence) => (
          <List.Item key={item.id}>
            <CeCard ce={item} />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
