import get from "axios";

const source = "https://api.atlasacademy.io/export/NA/nice_equip.json";

const main = async () => {
  const response = await get(source);
  console.log(response);
};


main()
