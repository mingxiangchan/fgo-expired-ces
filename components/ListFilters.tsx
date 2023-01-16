import { SortOptions } from "../types";
import { Row, Col, Select, Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../utils/store";
import {
  excludeRarity,
  includeNonEvent,
  includeRarity,
  rarity,
  setIncludeNonEvent,
  setSorting,
} from "../utils/reducers/filtersReducer";

export const ListFilters = () => {
  const includeNonEventFilter = useAppSelector(includeNonEvent);
  const includedRarities = useAppSelector(rarity);

  const dispatch = useAppDispatch();

  const sortOptions = Object.values(SortOptions).map((value) => ({
    value,
    label: value,
  }));

  return (
    <Row style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>
      <Col offset={1} span={22}>
        <>
          <Select
            defaultValue={SortOptions.atkAsc}
            options={sortOptions}
            onChange={(sortOption: SortOptions) =>
              dispatch(setSorting(sortOption))
            }
            style={{ width: 300 }}
          />
          <Switch
            checked={includeNonEventFilter}
            checkedChildren={"Include Non Event CEs"}
            unCheckedChildren={"Hide Non Event CEs"}
            onChange={(option: boolean) => dispatch(setIncludeNonEvent(option))}
            style={{
              marginLeft: "1em",
            }}
          />
          {[1, 2, 3, 4, 5].map((rarityOpt) => {
            const included = includedRarities.indexOf(rarityOpt) !== -1;

            return (
              <Switch
                key={rarityOpt}
                checked={included}
                checkedChildren={`${rarityOpt} Star`}
                unCheckedChildren={`${rarityOpt} Star`}
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
        </>
      </Col>
    </Row>
  );
};
