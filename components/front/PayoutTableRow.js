const PayoutTableRow = (props) => {
  return (
    <tr key={props.ubidx}>
      <td align="center">{props.race_id}</td>
      <td align="center">{props.bet_type}</td>
      <td align="center">{props.runners + props.scndRaceRunners + props.thrdRaceRunners}</td>
      <td align="center">{"$" + props.perRaceAmt.toFixed(2)}</td>
      {["trifecta"].indexOf(props.slctedBetType) != -1 ? (
        <>
          <td align="center">
            <span className={props.submitBet == false ? "dnone" : ""}>
              {props.perRaceTrifectaTotEarnLoss > 0
                ? "+ $" + props.perRaceTrifectaTotEarnLoss.toFixed(2)
                : "- $" + props.perRaceTrifectaTotEarnLoss.toFixed(2).slice(1)}
            </span>
          </td>
          <td align="center">
            <span className={props.submitBet == false ? "dnone" : ""}>
              {props.perRaceTrifectaTotEarnLoss > 0
                ? "+ $" + (props.perRaceTrifectaTotEarnLoss - props.perRaceAmt).toFixed(2)
                : "- $" + props.perRaceTrifectaTotEarnLoss.toFixed(2).slice(1)}
            </span>
          </td>
        </>
      ) : (
        <>
          <td align="center">
            <span className={props.submitBet == false ? "dnone" : ""}>
              {props.totalAmtEarnLoss > 0
                ? "+ $" + props.totalAmtEarnLoss.toFixed(2)
                : "- $" + props.totalAmtPerRace.toFixed(2).slice(1)}
            </span>
          </td>
          <td align="center">
            <span className={props.submitBet == false ? "dnone" : ""}>
              {props.totalAmtEarnLoss > 0
                ? "+ $" + (props.totalAmtEarnLoss - props.perRaceAmt).toFixed(2)
                : "- $" + props.totalAmtPerRace.toFixed(2).slice(1)}
            </span>
          </td>
        </>
      )}
    </tr>
  );
};

export default PayoutTableRow;