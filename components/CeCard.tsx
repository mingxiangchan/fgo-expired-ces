import { PropsWithChildren } from "react";
import { CraftEssence } from "../types";
import Image from "next/image";

type Props = {
  columnIndex: number;
  rowIndex: number;
  data: CraftEssence[];
  style: object;
};

export const CeCard = (props: PropsWithChildren<Props>): React.ReactNode => {
  const { columnIndex, rowIndex, data, style } = props;
  const idx = columnIndex * 5 + rowIndex;
  const ce = data[idx];

  return (
    <div style={style}>
      <div>
        {ce.name} {ce.atkBase}
      </div>
      <div>
        <Image
          alt={ce.name}
          src={Object.values(ce.extraAssets.charaGraph.equip)[0]}
          layout="fill"
        />
      </div>
    </div>
  );
};
