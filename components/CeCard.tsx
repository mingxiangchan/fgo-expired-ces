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
  const idx = rowIndex * 5 + columnIndex;
  const ce = data[idx];
  const url = `https://apps.atlasacademy.io/db/NA/craft-essence/${ce.id}`;

  const eventIds = new Set<number>();
  for (const skill of ce.skills) {
    for (const func of skill.functions) {
      for (const effect of func.funcGroup) {
        if (effect.eventId) {
          eventIds.add(effect.eventId);
        }
      }
    }
  }

  return (
    <div style={style}>
      <div style={{ textAlign: "center" }}>{ce.name.substring(0, 20)}</div>
      <div style={{ height: "80%", position: "relative" }}>
        <Image
          alt={ce.name}
          src={Object.values(ce.extraAssets.charaGraph.equip)[0]}
          layout="fill"
          title={ce.skills[0]?.detail}
          objectFit="contain"
        />
      </div>
      <div style={{ textAlign: "center", fontSize: "10px" }}>
        {ce.skills[0]?.detail}
      </div>
      <div style={{ textAlign: "center" }}>
        <a href={url}>
          <button>View Info</button>
        </a>
      </div>
    </div>
  );
};
