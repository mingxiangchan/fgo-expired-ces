import { SortOptions } from "../types";
import { Row, Col, Select, Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../utils/store";
import {
  excludeRarity,
  includeRarity,
  setIncludeNonEvent,
  setSorting,
  setSearchInput,
  filtersSorting,
  filtersSearchInput,
  filtersIncludeNonEvent,
  filtersRarities,
} from "../utils/reducers/filtersReducer";
import styles from "../styles/ListFilters.module.css";
import {
  craftEssencesDisplayedItems,
  setDisplayedItems,
} from "../utils/reducers/craftEssencesReducer";
import { useEffect } from "react";

type SearchOptionType = {
  value: number;
  label: string;
};

export const ListFilters = () => {
  const sorting = useAppSelector(filtersSorting);
  const includeNonEvent = useAppSelector(filtersIncludeNonEvent);
  const rarities = useAppSelector(filtersRarities);
  const searchInput = useAppSelector(filtersSearchInput);
  const displayedItems = useAppSelector(craftEssencesDisplayedItems);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setDisplayedItems({
        sorting,
        includeNonEvent,
        rarities,
      })
    );
  }, [dispatch, sorting, includeNonEvent, rarities]);

  const sortOptions = Object.values(SortOptions).map((value) => ({
    value,
    label: value,
  }));

  const searchOptions = displayedItems.map((ce) => {
    return {
      value: ce.id,
      label: ce.name,
    };
  });

  return (
    <>
      <Row
        style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
        justify="start"
        align="middle"
      >
        <Col offset={1} xs={22} lg={5} className={styles.input}>
          <Select
            defaultValue={SortOptions.atkAsc}
            options={sortOptions}
            onChange={(sortOption: SortOptions) =>
              dispatch(setSorting(sortOption))
            }
            style={{ width: 300 }}
          />
        </Col>
        <Col xs={22} lg={3} className={styles.input}>
          <Switch
            checked={includeNonEvent}
            checkedChildren={"Include Non Event CEs"}
            unCheckedChildren={"Hide Non Event CEs"}
            onChange={(option: boolean) => dispatch(setIncludeNonEvent(option))}
            style={{
              marginLeft: "1em",
            }}
          />
        </Col>
        <Col xs={22} lg={6} className={styles.input}>
          {[1, 2, 3, 4, 5].map((rarityOpt) => {
            const included = rarities.indexOf(rarityOpt) !== -1;

            return (
              <Switch
                key={rarityOpt}
                checked={included}
                checkedChildren={`${rarityOpt}☆`}
                unCheckedChildren={`${rarityOpt}☆`}
                onChange={(option: boolean) => {
                  if (option === true) {
                    dispatch(includeRarity(rarityOpt));
                  } else {
                    dispatch(excludeRarity(rarityOpt));
                  }
                }}
                style={{
                  marginLeft: "1em",
                }}
              />
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col offset={1} xs={22} lg={6} className={styles.input}>
          <Select<number | null, SearchOptionType>
            showSearch
            style={{ width: "100%" }}
            placeholder="Search for a craft essence"
            optionFilterProp="children"
            onChange={(value) => {
              dispatch(setSearchInput(value));
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={searchOptions}
            onClear={() => {
              dispatch(setSearchInput(null));
            }}
            value={searchInput}
          />
        </Col>
      </Row>
    </>
  );
};
