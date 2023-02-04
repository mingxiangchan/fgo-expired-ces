import { PCraftEssence, SortOptions } from "../types";
import { Row, Col, Select, Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../utils/store";
import {
  excludeRarity,
  includeNonEvent,
  includeRarity,
  rarity,
  setIncludeNonEvent,
  setSorting,
  setSearchInput,
  searchInput,
} from "../utils/reducers/filtersReducer";
import styles from "../styles/ListFilters.module.css";

type Props = {
  craftEssences: PCraftEssence[];
};

type SearchOptionType = {
  value: number;
  label: string;
};

export const ListFilters = ({ craftEssences }: Props) => {
  const includeNonEventFilter = useAppSelector(includeNonEvent);
  const includedRarities = useAppSelector(rarity);
  const selectedSearchInput = useAppSelector(searchInput);

  const dispatch = useAppDispatch();

  const sortOptions = Object.values(SortOptions).map((value) => ({
    value,
    label: value,
  }));

  const searchOptions = craftEssences
    .filter((ce) => {
      if (includeNonEventFilter === false && ce.hasEvent === false) {
        return false;
      }

      return includedRarities.indexOf(ce.rarity) !== -1;
    })
    .map((ce) => {
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
            checked={includeNonEventFilter}
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
            const included = includedRarities.indexOf(rarityOpt) !== -1;

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
            value={selectedSearchInput}
          />
        </Col>
      </Row>
    </>
  );
};
