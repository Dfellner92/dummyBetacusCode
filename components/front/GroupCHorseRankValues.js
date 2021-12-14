//CHECK
const GroupCHorseRankValues = (props) => {
  return (
    <tr key={props.crankidx}>
      <td align="center">
        {typeof props.grpCHorseRankVal[1].RunnerID != "undefined"
          ? props.grpCHorseRankVal[1].RunnerID
          : 0}
      </td>
      <td align="center">
        {typeof props.grpCHorseRankVal[1].ML != "undefined"
          ? props.grpCHorseRankVal[1].ML
          : 0}
      </td>
      <td align="center">
        {typeof props.grpCHorseRankVal[1].PL != "undefined" &&
        props.grpCHorseRankVal[1].PL != null
          ? props.grpCHorseRankVal[1].PL
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.REC != "undefined" &&
          props.race.fieldsMaxValue.REC != null &&
          props.race.fieldsMaxValue.REC == props.grpCHorseRankVal[1].REC
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].REC != "undefined" &&
        props.grpCHorseRankVal[1].REC != null
          ? props.grpCHorseRankVal[1].REC
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.AC != "undefined" &&
          props.race.fieldsMaxValue.AC != null &&
          props.race.fieldsMaxValue.AC == props.grpCHorseRankVal[1].AC
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].AC != "undefined" &&
        props.grpCHorseRankVal[1].AC != null
          ? props.grpCHorseRankVal[1].AC
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.RC != "undefined" &&
          props.race.fieldsMaxValue.RC != null &&
          props.race.fieldsMaxValue.RC == props.grpCHorseRankVal[1].RC
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].RC != "undefined" &&
        props.grpCHorseRankVal[1].RC != null
          ? props.grpCHorseRankVal[1].RC
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.EP != "undefined" &&
          props.race.fieldsMaxValue.EP != null &&
          props.race.fieldsMaxValue.EP == props.grpCHorseRankVal[1].EP
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].EP != "undefined" &&
        props.grpCHorseRankVal[1].EP != null
          ? props.grpCHorseRankVal[1].EP
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.MP != "undefined" &&
          props.race.fieldsMaxValue.MP != null &&
          props.race.fieldsMaxValue.MP == props.grpCHorseRankVal[1].MP
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].MP != "undefined" &&
        props.grpCHorseRankVal[1].MP != null
          ? props.grpCHorseRankVal[1].MP
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.LP != "undefined" &&
          props.race.fieldsMaxValue.LP != null &&
          props.race.fieldsMaxValue.LP == props.grpCHorseRankVal[1].LP
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].LP != "undefined" &&
        props.grpCHorseRankVal[1].LP != null
          ? props.grpCHorseRankVal[1].LP
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.TP != "undefined" &&
          props.race.fieldsMaxValue.TP != null &&
          props.race.fieldsMaxValue.TP == props.grpCHorseRankVal[1].TP
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].TP != "undefined" &&
        props.grpCHorseRankVal[1].TP != null
          ? props.grpCHorseRankVal[1].TP
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.SR != "undefined" &&
          props.race.fieldsMaxValue.SR != null &&
          props.race.fieldsMaxValue.SR == props.grpCHorseRankVal[1].SR
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].SR != "undefined" &&
        props.grpCHorseRankVal[1].SR != null
          ? props.grpCHorseRankVal[1].SR
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.TR != "undefined" &&
          props.race.fieldsMaxValue.TR != null &&
          props.race.fieldsMaxValue.TR == props.grpCHorseRankVal[1].TR
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].TR != "undefined" &&
        props.grpCHorseRankVal[1].TR != null
          ? props.grpCHorseRankVal[1].TR
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.AR != "undefined" &&
          props.race.fieldsMaxValue.AR != null &&
          props.race.fieldsMaxValue.AR == props.grpCHorseRankVal[1].AR
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].AR != "undefined" &&
        props.grpCHorseRankVal[1].AR != null
          ? props.grpCHorseRankVal[1].AR
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.DLR != "undefined" &&
          props.race.fieldsMaxValue.DLR != null &&
          props.race.fieldsMaxValue.DLR == props.grpCHorseRankVal[1].DLR
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].DLR != "undefined" &&
        props.grpCHorseRankVal[1].DLR != null
          ? props.grpCHorseRankVal[1].AR
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.SPD_PWR != "undefined" &&
          props.race.fieldsMaxValue.SPD_PWR != null &&
          props.race.fieldsMaxValue.SPD_PWR == props.grpCHorseRankVal[1].SPD_PWR
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].SPD_PWR != "undefined" &&
        props.grpCHorseRankVal[1].SPD_PWR != null
          ? props.grpCHorseRankVal[1].SPD_PWR
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.CLOS_PWR != "undefined" &&
          props.race.fieldsMaxValue.CLOS_PWR != null &&
          props.race.fieldsMaxValue.CLOS_PWR == props.grpCHorseRankVal[1].CLOS_PWR
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].CLOS_PWR != "undefined" &&
        props.grpCHorseRankVal[1].CLOS_PWR != null
          ? props.grpCHorseRankVal[1].CLOS_PWR
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.X_PWR != "undefined" &&
          props.race.fieldsMaxValue.X_PWR != null &&
          props.race.fieldsMaxValue.X_PWR == props.grpCHorseRankVal[1].X_PWR
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].X_PWR != "undefined" &&
        props.grpCHorseRankVal[1].X_PWR != null
          ? props.grpCHorseRankVal[1].X_PWR
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.SPD_LONE != "undefined" &&
          props.race.fieldsMaxValue.SPD_LONE != null &&
          props.race.fieldsMaxValue.SPD_LONE == props.grpCHorseRankVal[1].SPD_LONE
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].SPD_LONE != "undefined" &&
        props.grpCHorseRankVal[1].SPD_LONE != null
          ? props.grpCHorseRankVal[1].SPD_LONE
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.SPD_ALT != "undefined" &&
          props.race.fieldsMaxValue.SPD_ALT != null &&
          props.race.fieldsMaxValue.SPD_ALT == props.grpCHorseRankVal[1].SPD_ALT
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].SPD_ALT != "undefined" &&
        props.grpCHorseRankVal[1].SPD_ALT != null
          ? props.grpCHorseRankVal[1].SPD_ALT
          : ""}
      </td>
      <td
        align="center"
        className={
          typeof props.race.fieldsMaxValue.CONF != "undefined" &&
          props.race.fieldsMaxValue.CONF != null &&
          props.race.fieldsMaxValue.CONF == props.grpCHorseRankVal[1].CONF
            ? "yellow-bg"
            : ""
        }
      >
        {typeof props.grpCHorseRankVal[1].CONF != "undefined" &&
        props.grpCHorseRankVal[1].CONF != null
          ? props.grpCHorseRankVal[1].CONF
          : ""}
      </td>
      <td align="center">
        {typeof props.grpCHorseRankVal[1].ExRank != "undefined" &&
        props.grpCHorseRankVal[1].ExRank != null
          ? props.grpCHorseRankVal[1].ExRank
          : ""}
      </td>
      <td align="center">
        {typeof props.grpCHorseRankVal[1].TotRank != "undefined" &&
        props.grpCHorseRankVal[1].TotRank != null
          ? props.grpCHorseRankVal[1].TotRank
          : ""}
      </td>
      <td align="center">
        {typeof props.grpCHorseRankVal[1].TotPts != "undefined" &&
        props.grpCHorseRankVal[1].TotPts != null
          ? props.grpCHorseRankVal[1].TotPts
          : ""}
      </td>
      <td align="center">
        {typeof props.grpCHorseRankVal[1].PP != "undefined" &&
        props.grpCHorseRankVal[1].PP != null
          ? props.grpCHorseRankVal[1].PP
          : ""}
      </td>
    </tr>
  );
};

export default GroupCHorseRankValues;