import { PCraftEssence, SortOptions } from "../types";
import { List } from "antd";
import { CeCard } from "./CeCard";
import { CONTAINER_HEIGHT, ITEM_HEIGHT } from "../utils/constants";
import VirtualList, { ListRef } from "rc-virtual-list";
import { useAppSelector } from "../utils/store";
import {
  includeNonEvent,
  rarity,
  sorting,
  searchInput,
} from "../utils/reducers/filtersReducer";
import React, { useEffect, useMemo, useRef } from "react";

type Props = {
  craftEssences: PCraftEssence[];
};

export const CeList = ({ craftEssences }: Props) => {
  const virtualListRef = useRef<ListRef>(null);
  const cardRefs = useRef<Record<number, HTMLElement>>({});

  const includeNonEventOpt = useAppSelector(includeNonEvent);
  const sortOption = useAppSelector(sorting);
  const includedRarities = useAppSelector(rarity);
  const selectedSearchInput = useAppSelector(searchInput);

  let sortedCes = useMemo(() => {
    return includeNonEventOpt
      ? [...craftEssences]
      : craftEssences.filter((ce) => ce.hasEvent);
  }, [includeNonEventOpt, craftEssences]);

  sortedCes = sortedCes.filter((ce) => {
    return includedRarities.indexOf(ce.rarity) !== -1;
  });

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

  useEffect(() => {
    const listContainer = virtualListRef.current;
    let toScroll = 0;

    if (selectedSearchInput === null) {
      listContainer?.scrollTo(toScroll);
      return;
    }

    for (const idx in sortedCes) {
      const ce = sortedCes[idx];
      if (ce.id !== selectedSearchInput) {
        toScroll += ITEM_HEIGHT;
      } else {
        break;
      }
    }

    listContainer?.scrollTo(0);
    listContainer?.scrollTo(toScroll);
  }, [selectedSearchInput, sortedCes]);

  return (
    <List>
      <VirtualList
        data={sortedCes}
        height={CONTAINER_HEIGHT}
        itemHeight={ITEM_HEIGHT}
        itemKey="id"
        ref={virtualListRef}
      >
        {(item: PCraftEssence) => (
          <List.Item
            key={item.id}
            ref={(element) => {
              if (element === null) {
                delete cardRefs.current[item.id];
              } else {
                cardRefs.current[item.id] = element;
              }
            }}
            style={{ height: ITEM_HEIGHT }}
          >
            <CeCard ce={item} />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
