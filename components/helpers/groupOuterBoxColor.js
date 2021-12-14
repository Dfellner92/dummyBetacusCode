export function groupOuterBoxColor(outColor) {
  let outerColor = "";
  switch (outColor) {
    case "1":
      outerColor = "blue-border-box";
      break;
    case "2":
      outerColor = "pink-border-box";
      break;
    case "3":
      outerColor = "cream-border-box";
      break;
    case "4":
      outerColor = "green-border-box";
      break;
    default:
      outerColor = "";
      break;
  }
  return outerColor;
}
