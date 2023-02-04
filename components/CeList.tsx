import { PCraftEssence } from "../types";
import { List } from "antd";
import { CeCard } from "./CeCard";
import { CONTAINER_HEIGHT, ITEM_HEIGHT } from "../utils/constants";
import VirtualList, { ListRef } from "rc-virtual-list";
import { useAppSelector } from "../utils/store";
import React, { useEffect, useRef } from "react";
import { craftEssencesDisplayedItems } from "../utils/reducers/craftEssencesReducer";
import { filtersSearchInput } from "../utils/reducers/filtersReducer";

export const CeList = () => {
  const virtualListRef = useRef<ListRef>(null);
  const cardRefs = useRef<Record<number, HTMLElement>>({});

  const displayedItems = useAppSelector(craftEssencesDisplayedItems);
  const searchInput = useAppSelector(filtersSearchInput);

  useEffect(() => {
    const listContainer = virtualListRef.current;
    let toScroll = 0;

    if (searchInput === null) {
      listContainer?.scrollTo(toScroll);
      return;
    }

    for (const idx in displayedItems) {
      const ce = displayedItems[idx];
      if (ce.id !== searchInput) {
        toScroll += ITEM_HEIGHT;
      } else {
        break;
      }
    }

    listContainer?.scrollTo(0);
    listContainer?.scrollTo(toScroll);
  }, [searchInput, displayedItems]);

  return (
    <List>
      <VirtualList
        data={displayedItems}
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
