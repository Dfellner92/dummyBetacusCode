export function groupBoxColor(groupHorsesValues) {
  let boxColor = "";
  switch (groupHorsesValues) {
    case "1":
      boxColor = "blue-box";
      break;
    case "2":
      boxColor = "pink-box";
      break;
    case "3":
      boxColor = "cream-box";
      break;
    default:
      boxColor = "";
      break;
  }
  return boxColor;
}
