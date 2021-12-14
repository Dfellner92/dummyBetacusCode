//CHECK
import Select from "react-select";
import { betTypeOptions } from '../util/betTypeOptions';
import { betAmountOptions } from '../util/betAmountOptions';

const FilterBox = (props) => {
  return (
    <div className="fltr-box">
      <div className="srch-box mt0">
        <div className="slct-box">
          <Select
            name="betType"
            id="betType"
            value={betTypeOptions.filter(function (bTOption) {
              return bTOption.value === props.betType;
            })}
            options={betTypeOptions}
            className="slct-fld bgaslct-select-box"
            classNamePrefix="bgaslct"
            onChange={props.handleBetTypeSelectEvent.bind(this)}
          />
        </div>
        <div className="slct-box">
          <Select
            name="betAmount"
            id="betAmount"
            value={betAmountOptions.filter(function (bAOption) {
              return bAOption.value === props.betAmount;
            })}
            options={betAmountOptions}
            className="slct-fld bgaslct-select-box"
            classNamePrefix="bgaslct"
            onChange={props.handleBetAmtSelectEvent.bind(this)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
