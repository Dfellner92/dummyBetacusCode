mport { required, email, password } from '../src/components/common/Formvalidator';
import { TextField, PasswordField, EmailField } from '../src/components/common/FormAttributes';
import Form from 'react-validation/build/form';
import axios from "axios";
import qs from "qs";
import DatePicker from 'react-datetime';
//import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import Select from 'react-select';
import {setUserSession, checkUserLogin, capitalizeFirstLetter, getUserInfo} from '../src/components/common/CommonHelper';
import GroupAHorseRankValues from '../src/components/front/GroupAHorseRankValues';
import GroupBHorseRankValues from '../src/components/front/GroupBHorseRankValues';
import GroupCHorseRankValues from "../src/components/front/GroupCHorseRankValues";
import NoResultsTableColumns from '../src/components/front/NoResultsTableColumns';
import InstructionBox from '../src/components/front/InstructionBox';
import FilterBox from '../src/components/front/FilterBox';

import { groupBoxColor } from "../src/components/helpers/groupBoxColor/groupBoxColor";
import { groupOuterBoxColor } from '../src/components/helpers/groupOuterBoxColor';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typRankingsUploadDateTime: "", 
      dateFltr: "",
      trackFltr: "all",
      racesFilteredList: [],
      allRacesList: [],
      dateList: [],
      aGrpBlocksArr: [],
      bGrpBlocksArr: [],
      cGrpBlocksArr: [],
      showLoginPopup: "",
      userName: "",
      userPassword: "",
      loginSubmitDisabled:false,
      loginErrorMsg: "",
      submitAll: false,
      betType: "",
      betAmount: "",
      slctedHorse: {},
      errMsg: "",
      userBetData: [],
      userSecondRaceBetData: [],
      userThirdRaceBetData: [],
      userFourthRaceBetData: [],
      userBetRsltData: [],
      userSecondRaceBetRsltData: [],
      userThirdRaceBetRsltData: [],
      userFourthRaceBetRsltData: [],
      collapseExpandRaceId: "",
      //showBetResultsPopup: "",
      showAllResultsPopup: "",
      usrSlctedHorseArr: [],
      usrSecondRaceSlctedHorseArr: [],
      usrThirdRaceSlctedHorseArr: [],
      usrFourthRaceSlctedHorseArr: [],
      repeatRacesArr: [],
      needRepeatRacesForBetTypesArr: ["exacta", "trifecta", "superfecta"],
      lastBetType: "",
      race_id_container: [1],
      bet_type_for_func: "",
      accessRaceDaysWithoutLoginArr: [],
      hideShowLoginRegisterForm: "login",
      accessDaysWithoutLoginArr: [],
      showHideLoginRegisterPage: "login",
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      userPassword: "",
      userConfirmPassword: "",
      registerErrorMsg: "",
      formErrors: {},
      results: false,
      submitBet: false,
      grpabxclr: ''
    }
    this.setTempObject = this.setTempObject.bind(this);
    this.groupBoxColor = groupBoxColor.bind(this);
    this.groupOuterBoxColor = groupOuterBoxColor.bind(this);
  }

  async setTempObject(tempRacesList) {
    const TempObj = await {
      "Win": tempRacesList[raceid][race].Win,
      "Place": tempRacesList[raceid][race].Place,
      "Sho": tempRacesList[raceid][race].Sho,
      "Exacta": tempRacesList[raceid][race].Exacta,
      "Trifecta": tempRacesList[raceid][race].Trifecta,
      "Superfecta": tempRacesList[raceid][race].Superfecta,
      "DD": tempRacesList[raceid][race].DD,
      "Pk3": tempRacesList[raceid][race].Pk3,
      "Pk4": tempRacesList[raceid][race].Pk4,
      "Pk5": tempRacesList[raceid][race].Pk5,
      "Pk6": tempRacesList[raceid][race].Pk6,
    };
    return TempObj;
  }

  async componentDidMount() {
    //localStorage.clear();
    //localStorage.removeItem('userBetData');
    await axios({
      method: "post",
      url: apiConstants.GET_RACES_DATA_API,
      data: {}
    }).then(async response => {
      if ( response.data.status === 1 ) {
        var tmpRacesList = [];
        response.data.races.forEach(function (row, index, arr) {
          if (typeof tmpRacesList[row.Race] === "undefined") { 
            tmpRacesList[row.Race] = [];
          }
          tmpRacesList[row.Race].push( {"rowid":row.id, "PL":row.PL, "P#":row["P#"], "Date":row["Date"], "Track":row["Track"], "Clr_pre":row["Clr_pre"], "Clr_post":row["Clr_post"], "ML":row["ML"], "Avg_Diff": row["Avg_Diff"], "Name": row["Name"], "Win": row["Win"], "Place": row["Place"], "Sho" : row["Sho"], "Exacta":row["Exacta"], "Trifecta":row["Trifecta"], "Superfecta":row["Superfecta"], "FinishPosition":row["FinishPosition"], "PP":row["PP"], "RaceID":row["Race"], "RaceNumber":row["RaceNumber"], "DD":row["DD"], "Pk3":row["Pk3"], "Pk4":row["Pk4"], "Pk5":row["Pk5"], "Pk6":row["Pk6"], "val":row["P#"], "Clr": row["Clr_post"], "OuterBorderClr": row["Clr_pre"], "ML_Rank": row["ML_Rank"], "REC_Rank": row["REC_Rank"], "AC_Rank": row["AC_Rank"], "RC_Rank": row["RC_Rank"], "EP_Rank": row["EP_Rank"], "MP_Rank": row["MP_Rank"], "LP_Rank": row["LP_Rank"], "TP_Rank": row["TP_Rank"], "SR_Rank": row["SR_Rank"], "TR_Rank": row["TR_Rank"], "AR_Rank": row["AR_Rank"], "SPD_PWR_Rank": row["SPD_PWR_Rank"], "CLOS_PWR_Rank": row["CLOS_PWR_Rank"], "SPD_LONE_Rank": row["SPD_LONE_Rank"], "SPD_ALT_Rank": row["SPD_ALT_Rank"], "CONF_Rank": row["CONF_Rank"], "TYP_Rank1": row["TYP_Rank1"], "TYP_Rank2": row["TYP_Rank2"], "TotRank": row["TotRank"], "RunnerID": row["P#"], "REC": row["REC"], "AC": row["AC"], "RC": row["RC"], "EP": row["EP"], "MP": row["MP"], "LP": row["LP"], "TP": row["TP"], "SR": row["SR"], "TR": row["TR"], "AR": row["AR"], "DLR": row["DLR"], "SPD_PWR": row["SPD_PWR"], "CLOS_PWR": row["CLOS_PWR"], "X_PWR": row["X_PWR"], "SPD_LONE": row["SPD_LONE"], "SPD_ALT": row["SPD_ALT"], "CONF": row["CONF"], "ExRank": row["ExRank"], "TotPts": row["TotPts"] });
        });
        var racesOrderdList = [];
        var tmpTracksArr = [];
        var tmpAGrpBlocksArr = [];
        var tmpBGrpBlocksArr = [];
        var tmpCGrpBlocksArr = [];
        for(var raceid in tmpRacesList) {
          var tmpGrpARaces = [];
          var tmpGrpBRaces = [];
          var tmpGrpCRaces = [];
          var tmpRacesOrderdList = [];
          tmpRacesOrderdList["A"] = [];
          tmpRacesOrderdList["B"] = [];
          tmpRacesOrderdList["C"] = [];
          tmpRacesOrderdList["payouts"] = [];
          tmpRacesOrderdList["payouts"]["firstpos"] = {};
          tmpRacesOrderdList["payouts"]["secondpos"] = {};
          tmpRacesOrderdList["payouts"]["thirdpos"] = {};
          for(var race in tmpRacesList[raceid]) {
            if(typeof tmpRacesList[raceid][race].PL !== "undefined" && tmpRacesList[raceid][race].PL <= 4.9){
              tmpGrpARaces.push(tmpRacesList[raceid][race]);
            }else if(tmpRacesList[raceid][race].PL <= 9.9){
              tmpGrpBRaces.push(tmpRacesList[raceid][race]);
            }else{
              tmpGrpCRaces.push(tmpRacesList[raceid][race]);
            }
            var pospayout = {};
            if(typeof tmpRacesList[raceid][race].FinishPosition != "undefined"){
              switch(tmpRacesList[raceid][race].FinishPosition){
                case '1':
                  tmpRacesOrderdList["payouts"]["firstpos"] = this.setTempObject(tmpRacesList);
                break;
                case '2':
                  tmpRacesOrderdList["payouts"]["secondpos"] = this.setTempObject(tmpRacesList);
                break;
                case '3':
                  tmpRacesOrderdList["payouts"]["thirdpos"] = this.setTempObject(tmpRacesList);
                break;
                default:
                  pospayout = {};
                break;
              }
            }
          }
          tmpGrpARaces.sort((a1, a2) => (a1.PL > a2.PL) ? 1 : -1);
          var tmpGrpARacesArr = [];
          if(tmpGrpARaces.length > 0){
            tmpGrpARaces.forEach(function (raceRow, index, arr) {
              tmpGrpARacesArr[raceRow.PL] = raceRow;
              if (tmpAGrpBlocksArr.indexOf(raceRow.PL) == -1) {
                tmpAGrpBlocksArr.push(raceRow.PL);
              }
            });
          }
          tmpRacesOrderdList["A"] = tmpGrpARacesArr;
          tmpGrpBRaces.sort((b1, b2) => (b1.PL > b2.PL) ? 1 : -1);
          var tmpGrpBRacesArr = [];
          if(tmpGrpBRaces.length > 0){
            tmpGrpBRaces.forEach(function (raceRow, index, arr) {
              tmpGrpBRacesArr[raceRow.PL] = raceRow;
              if (tmpBGrpBlocksArr.indexOf(raceRow.PL) == -1) {
                tmpBGrpBlocksArr.push(raceRow.PL);
              }
            });
          }
          tmpRacesOrderdList["B"] = tmpGrpBRacesArr;
          tmpGrpCRaces.sort((c1, c2) => (c1.PL > c2.PL) ? 1 : -1);
          var tmpGrpCRacesArr = [];
          if(tmpGrpCRaces.length > 0){
            tmpGrpCRaces.forEach(function (raceRow, index, arr) {
              tmpGrpCRacesArr[raceRow.PL] = raceRow;
              if (tmpCGrpBlocksArr.indexOf(raceRow.PL) == -1) {
                tmpCGrpBlocksArr.push(raceRow.PL);
              }
            });
          }
          tmpRacesOrderdList["C"] = tmpGrpCRacesArr;
          tmpRacesOrderdList["Date"] = tmpRacesList[raceid][race].Date;
          tmpRacesOrderdList["Track"] = tmpRacesList[raceid][race].Track;
          tmpRacesOrderdList["id"] = raceid;
          tmpRacesOrderdList["race"] = "Race "+raceid;
          racesOrderdList.push(tmpRacesOrderdList);
          if (tmpTracksArr.indexOf(tmpRacesList[raceid][race].Track) == -1) {
            tmpTracksArr.push(tmpRacesList[raceid][race].Track);
          }
        }
        tmpAGrpBlocksArr.sort((grpa1, grpa2) => (grpa1 > grpa2) ? 1 : -1);
        tmpBGrpBlocksArr.sort((grpb1, grpb2) => (grpb1 > grpb2) ? 1 : -1);
        tmpCGrpBlocksArr.sort((grpc1, grpc2) => (grpc1 > grpc2) ? 1 : -1);
        var tmpAccessRaceDaysWithoutLoginArr = this.state.accessRaceDaysWithoutLoginArr;
        tmpAccessRaceDaysWithoutLoginArr.push(response.data.today_date);
        var currDateIndx = response.data.dt_list.indexOf(response.data.today_date);
        var nextDate = response.data.dt_list[currDateIndx+1];
        if(nextDate){
          tmpAccessRaceDaysWithoutLoginArr.push(nextDate);
        }
        var tmpAccessDaysWithoutLoginArr = this.state.accessDaysWithoutLoginArr;
        if(typeof response.data.dt_list[0] != "undefined"){
          tmpAccessDaysWithoutLoginArr.push(response.data.dt_list[0].toString());
        }
        if(typeof response.data.dt_list[1] != "undefined"){
          tmpAccessDaysWithoutLoginArr.push(response.data.dt_list[1].toString());
        }
        await this.setState({
          typRankingsUploadDateTime: response.data.typ_rankings_upload_date_time, 
          racesFilteredList: racesOrderdList,
          allRacesList: response.data.races,
          dateFltr: response.data.today_date.toString(),
          trackFltr: response.data.default_track.toString(),
          tracksList: tmpTracksArr,
          dateList: response.data.dt_list,
          aGrpBlocksArr: tmpAGrpBlocksArr,
          bGrpBlocksArr: tmpBGrpBlocksArr,
          cGrpBlocksArr: tmpCGrpBlocksArr,
          userBetData: [],
          accessRaceDaysWithoutLoginArr: tmpAccessRaceDaysWithoutLoginArr,
          accessDaysWithoutLoginArr: tmpAccessDaysWithoutLoginArr
        });
      }else{
        //this.setState({success_msg: '', error_msg: response.data.message});
      }
    }).catch(error => this.setState({success_msg: '', error_msg: 'Something goes wrong, please try again later!'}));
  }
  async handleDateChangeEvent(e) {
    if(typeof e.format("YYYYMMDD") != 'undefined' && e.format("YYYYMMDD") != ""){
      var allAccess = 0;
      if (this.state.accessRaceDaysWithoutLoginArr.indexOf(e.format("YYYYMMDD")) !== -1) {
        allAccess = 1;
      }else{
        if(checkUserLogin() === true){
          allAccess = 1;
        }
      }
      if(allAccess == 0){
        await this.setState({showLoginPopup: 'open'});
      }else{
        await axios({
          method: "post",
          url: apiConstants.GET_RACES_DATA_API+"?dt="+e.format("YYYYMMDD"),
          data: {}
        }).then(async response => {
          if ( response.data.status === 1 ) {
            //localStorage.removeItem('userBetData');
            await this.setState({
              submitAll: false,
              results: false,
              slctedHorse: {},
              userBetData: [],
              userBetRsltData: [],
              usrSlctedHorseArr: []
            });
            var tmpRacesList = [];
            response.data.races.forEach(function (row, index, arr) {
              if (typeof tmpRacesList[row.Race] === "undefined") { 
                tmpRacesList[row.Race] = [];
              }
              tmpRacesList[row.Race].push( {"rowid":row.id, "PL":row.PL, "P#":row["P#"], "Date":row["Date"], "Track":row["Track"], "Clr_pre":row["Clr_pre"], "Clr_post":row["Clr_post"], "ML":row["ML"], "Avg_Diff": row["Avg_Diff"], "Name": row["Name"], "Win": row["Win"], "Place": row["Place"], "Sho" : row["Sho"], "Exacta":row["Exacta"], "Trifecta":row["Trifecta"], "Superfecta":row["Superfecta"], "FinishPosition":row["FinishPosition"], "PP":row["PP"], "RaceID":row["Race"], "RaceNumber":row["RaceNumber"], "DD":row["DD"], "Pk3":row["Pk3"], "Pk4":row["Pk4"], "Pk5":row["Pk5"], "Pk6":row["Pk6"], "val":row["P#"], "Clr": row["Clr_post"], "OuterBorderClr": row["Clr_pre"], "ML_Rank": row["ML_Rank"], "REC_Rank": row["REC_Rank"], "AC_Rank": row["AC_Rank"], "RC_Rank": row["RC_Rank"], "EP_Rank": row["EP_Rank"], "MP_Rank": row["MP_Rank"], "LP_Rank": row["LP_Rank"], "TP_Rank": row["TP_Rank"], "SR_Rank": row["SR_Rank"], "TR_Rank": row["TR_Rank"], "AR_Rank": row["AR_Rank"], "SPD_PWR_Rank": row["SPD_PWR_Rank"], "CLOS_PWR_Rank": row["CLOS_PWR_Rank"], "SPD_LONE_Rank": row["SPD_LONE_Rank"], "SPD_ALT_Rank": row["SPD_ALT_Rank"], "CONF_Rank": row["CONF_Rank"], "TYP_Rank1": row["TYP_Rank1"], "TYP_Rank2": row["TYP_Rank2"], "TotRank": row["TotRank"], "RunnerID": row["P#"], "REC": row["REC"], "AC": row["AC"], "RC": row["RC"], "EP": row["EP"], "MP": row["MP"], "LP": row["LP"], "TP": row["TP"], "SR": row["SR"], "TR": row["TR"], "AR": row["AR"], "DLR": row["DLR"], "SPD_PWR": row["SPD_PWR"], "CLOS_PWR": row["CLOS_PWR"], "X_PWR": row["X_PWR"], "SPD_LONE": row["SPD_LONE"], "SPD_ALT": row["SPD_ALT"], "CONF": row["CONF"], "ExRank": row["ExRank"], "TotPts": row["TotPts"] });
            });
            var racesOrderdList = [];
            var tmpTracksArr = [];
            var tmpAGrpBlocksArr = [];
            var tmpBGrpBlocksArr = [];
            var tmpCGrpBlocksArr = [];
            for(var raceid in tmpRacesList) {
              var tmpGrpARaces = [];
              var tmpGrpBRaces = [];
              var tmpGrpCRaces = [];
              var tmpRacesOrderdList = [];
              tmpRacesOrderdList["A"] = [];
              tmpRacesOrderdList["B"] = [];
              tmpRacesOrderdList["C"] = [];
              tmpRacesOrderdList["payouts"] = [];
              tmpRacesOrderdList["payouts"]["firstpos"] = {};
              tmpRacesOrderdList["payouts"]["secondpos"] = {};
              tmpRacesOrderdList["payouts"]["thirdpos"] = {};
              for(var race in tmpRacesList[raceid]) {
                if(typeof tmpRacesList[raceid][race].PL !== "undefined" && tmpRacesList[raceid][race].PL <= 4.9){
                  tmpGrpARaces.push(tmpRacesList[raceid][race]);
                }else if(tmpRacesList[raceid][race].PL <= 9.9){
                  tmpGrpBRaces.push(tmpRacesList[raceid][race]);
                }else{
                  tmpGrpCRaces.push(tmpRacesList[raceid][race]);
                }
                var pospayout = {};
                if(typeof tmpRacesList[raceid][race].FinishPosition != "undefined"){
                  switch(tmpRacesList[raceid][race].FinishPosition){
                    case '1':
                      tmpRacesOrderdList["payouts"]["firstpos"] = this.setTempObject(tmpRacesList);
                    break;
                    case '2':
                      tmpRacesOrderdList["payouts"]["secondpos"] = this.setTempObject(tmpRacesList);
                    break;
                    case '3':
                      tmpRacesOrderdList["payouts"]["thirdpos"] = this.setTempObject(tmpRacesList);
                    break;
                    default:
                      pospayout = {};
                    break;
                  }
                }
              }
              tmpGrpARaces.sort((a1, a2) => (a1.PL > a2.PL) ? 1 : -1);
              var tmpGrpARacesArr = [];
              if(tmpGrpARaces.length > 0){
                tmpGrpARaces.forEach(function (raceRow, index, arr) {
                  tmpGrpARacesArr[raceRow.PL] = raceRow;
                  if (tmpAGrpBlocksArr.indexOf(raceRow.PL) == -1) {
                    tmpAGrpBlocksArr.push(raceRow.PL);
                  }
                });
              }
              tmpRacesOrderdList["A"] = tmpGrpARacesArr;
              tmpGrpBRaces.sort((b1, b2) => (b1.PL > b2.PL) ? 1 : -1);
              var tmpGrpBRacesArr = [];
              if(tmpGrpBRaces.length > 0){
                tmpGrpBRaces.forEach(function (raceRow, index, arr) {
                  tmpGrpBRacesArr[raceRow.PL] = raceRow;
                  if (tmpBGrpBlocksArr.indexOf(raceRow.PL) == -1) {
                    tmpBGrpBlocksArr.push(raceRow.PL);
                  }
                });
              }
              tmpRacesOrderdList["B"] = tmpGrpBRacesArr;
              tmpGrpCRaces.sort((c1, c2) => (c1.PL > c2.PL) ? 1 : -1);
              var tmpGrpCRacesArr = [];
              if(tmpGrpCRaces.length > 0){
                tmpGrpCRaces.forEach(function (raceRow, index, arr) {
                  tmpGrpCRacesArr[raceRow.PL] = raceRow;
                  if (tmpCGrpBlocksArr.indexOf(raceRow.PL) == -1) {
                    tmpCGrpBlocksArr.push(raceRow.PL);
                  }
                });
              }
              tmpRacesOrderdList["C"] = tmpGrpCRacesArr;
              tmpRacesOrderdList["Date"] = tmpRacesList[raceid][race].Date;
              tmpRacesOrderdList["Track"] = tmpRacesList[raceid][race].Track;
              tmpRacesOrderdList["id"] = raceid;
              tmpRacesOrderdList["race"] = "Race "+raceid;
              racesOrderdList.push(tmpRacesOrderdList);
              if (tmpTracksArr.indexOf(tmpRacesList[raceid][race].Track) == -1) {
                tmpTracksArr.push(tmpRacesList[raceid][race].Track);
              }
            }
            tmpAGrpBlocksArr.sort((grpa1, grpa2) => (grpa1 > grpa2) ? 1 : -1);
            tmpBGrpBlocksArr.sort((grpb1, grpb2) => (grpb1 > grpb2) ? 1 : -1);
            tmpCGrpBlocksArr.sort((grpc1, grpc2) => (grpc1 > grpc2) ? 1 : -1);
            await this.setState({
              typRankingsUploadDateTime: response.data.typ_rankings_upload_date_time, 
              racesFilteredList: racesOrderdList,
              allRacesList: response.data.races,
              dateFltr: response.data.today_date.toString(),
              trackFltr: response.data.default_track.toString(),
              tracksList: tmpTracksArr,
              dateList: response.data.dt_list,
              aGrpBlocksArr: tmpAGrpBlocksArr,
              bGrpBlocksArr: tmpBGrpBlocksArr,
              cGrpBlocksArr: tmpCGrpBlocksArr,
              submitAll: false,
              submitBet: false,
              betType: '',
              betAmount: ''
            });
          }else{
            //this.setState({success_msg: '', error_msg: response.data.message});
          }
        }).catch(error => this.setState({success_msg: '', error_msg: 'Something goes wrong, please try again later!'}));
      }
    }
  }
  async handleTrackFilter(e) {
    e.preventDefault();
    if(typeof e.target.value != 'undefined' && e.target.value != ""){
      await this.setState({ trackFltr: e.target.value });
      this.setRacesData();
    }
  }
  async setRacesData(){
    var tmpAllRacesList = this.state.allRacesList;
    var trackFilter = this.state.trackFltr;
    var tmpRacesList = [];
    if(tmpAllRacesList.length > 0){
      tmpAllRacesList.forEach(function (row, index, arr) {
        if(trackFilter == "all"){
          if(typeof tmpRacesList[row.Race] === "undefined") { 
            tmpRacesList[row.Race] = [];
          }
          tmpRacesList[row.Race].push( {"rowid":row.id, "PL":row.PL, "P#":row["P#"], "Date":row["Date"], "Track":row["Track"], "Clr_pre":row["Clr_pre"], "Clr_post":row["Clr_post"], "ML":row["ML"], "Avg_Diff": row["Avg_Diff"], "Name": row["Name"], "Win": row["Win"], "Place": row["Place"], "Sho" : row["Sho"], "Exacta":row["Exacta"], "Trifecta":row["Trifecta"], "Superfecta":row["Superfecta"], "FinishPosition":row["FinishPosition"], "PP":row["PP"], "RaceID":row["Race"], "RaceNumber":row["RaceNumber"], "DD":row["DD"], "Pk3":row["Pk3"], "Pk4":row["Pk4"], "Pk5":row["Pk5"], "Pk6":row["Pk6"], "val":row["P#"], "Clr": row["Clr_post"], "OuterBorderClr": row["Clr_pre"], "ML_Rank": row["ML_Rank"], "REC_Rank": row["REC_Rank"], "AC_Rank": row["AC_Rank"], "RC_Rank": row["RC_Rank"], "EP_Rank": row["EP_Rank"], "MP_Rank": row["MP_Rank"], "LP_Rank": row["LP_Rank"], "TP_Rank": row["TP_Rank"], "SR_Rank": row["SR_Rank"], "TR_Rank": row["TR_Rank"], "AR_Rank": row["AR_Rank"], "SPD_PWR_Rank": row["SPD_PWR_Rank"], "CLOS_PWR_Rank": row["CLOS_PWR_Rank"], "SPD_LONE_Rank": row["SPD_LONE_Rank"], "SPD_ALT_Rank": row["SPD_ALT_Rank"], "CONF_Rank": row["CONF_Rank"], "TYP_Rank1": row["TYP_Rank1"], "TYP_Rank2": row["TYP_Rank2"], "TotRank": row["TotRank"], "RunnerID": row["P#"], "REC": row["REC"], "AC": row["AC"], "RC": row["RC"], "EP": row["EP"], "MP": row["MP"], "LP": row["LP"], "TP": row["TP"], "SR": row["SR"], "TR": row["TR"], "AR": row["AR"], "DLR": row["DLR"], "SPD_PWR": row["SPD_PWR"], "CLOS_PWR": row["CLOS_PWR"], "X_PWR": row["X_PWR"], "SPD_LONE": row["SPD_LONE"], "SPD_ALT": row["SPD_ALT"], "CONF": row["CONF"], "ExRank": row["ExRank"], "TotPts": row["TotPts"] });
        }else{
          if(row.Track == trackFilter){
            if(typeof tmpRacesList[row.Race] === "undefined") { 
              tmpRacesList[row.Race] = [];
            }
            tmpRacesList[row.Race].push( {"rowid":row.id, "PL":row.PL, "P#":row["P#"], "Date":row["Date"], "Track":row["Track"], "Clr_pre":row["Clr_pre"], "Clr_post":row["Clr_post"], "ML":row["ML"], "Avg_Diff": row["Avg_Diff"], "Name": row["Name"], "Win": row["Win"], "Place": row["Place"], "Sho" : row["Sho"], "Exacta":row["Exacta"], "Trifecta":row["Trifecta"], "Superfecta":row["Superfecta"], "FinishPosition":row["FinishPosition"], "PP":row["PP"], "RaceID":row["Race"], "RaceNumber":row["RaceNumber"], "DD":row["DD"], "Pk3":row["Pk3"], "Pk4":row["Pk4"], "Pk5":row["Pk5"], "Pk6":row["Pk6"], "val":row["P#"], "Clr": row["Clr_post"], "OuterBorderClr": row["Clr_pre"], "ML_Rank": row["ML_Rank"], "REC_Rank": row["REC_Rank"], "AC_Rank": row["AC_Rank"], "RC_Rank": row["RC_Rank"], "EP_Rank": row["EP_Rank"], "MP_Rank": row["MP_Rank"], "LP_Rank": row["LP_Rank"], "TP_Rank": row["TP_Rank"], "SR_Rank": row["SR_Rank"], "TR_Rank": row["TR_Rank"], "AR_Rank": row["AR_Rank"], "SPD_PWR_Rank": row["SPD_PWR_Rank"], "CLOS_PWR_Rank": row["CLOS_PWR_Rank"], "SPD_LONE_Rank": row["SPD_LONE_Rank"], "SPD_ALT_Rank": row["SPD_ALT_Rank"], "CONF_Rank": row["CONF_Rank"], "TYP_Rank1": row["TYP_Rank1"], "TYP_Rank2": row["TYP_Rank2"], "TotRank": row["TotRank"], "RunnerID": row["P#"], "REC": row["REC"], "AC": row["AC"], "RC": row["RC"], "EP": row["EP"], "MP": row["MP"], "LP": row["LP"], "TP": row["TP"], "SR": row["SR"], "TR": row["TR"], "AR": row["AR"], "DLR": row["DLR"], "SPD_PWR": row["SPD_PWR"], "CLOS_PWR": row["CLOS_PWR"], "X_PWR": row["X_PWR"], "SPD_LONE": row["SPD_LONE"], "SPD_ALT": row["SPD_ALT"], "CONF": row["CONF"], "ExRank": row["ExRank"], "TotPts": row["TotPts"] });
          }
        }
      });
    }
    if(Object.entries(tmpRacesList).length > 0){
      var racesOrderdList = [];
      var tmpTracksArr = [];
      var tmpAGrpBlocksArr = [];
      var tmpBGrpBlocksArr = [];
      var tmpCGrpBlocksArr = [];
      for(var raceid in tmpRacesList) {
        var tmpGrpARaces = [];
        var tmpGrpBRaces = [];
        var tmpGrpCRaces = [];
        var tmpRacesOrderdList = [];
        tmpRacesOrderdList["A"] = [];
        tmpRacesOrderdList["B"] = [];
        tmpRacesOrderdList["C"] = [];
        tmpRacesOrderdList["payouts"] = [];
        tmpRacesOrderdList["payouts"]["firstpos"] = {};
        tmpRacesOrderdList["payouts"]["secondpos"] = {};
        tmpRacesOrderdList["payouts"]["thirdpos"] = {};
        for(var race in tmpRacesList[raceid]) {
          if(typeof tmpRacesList[raceid][race].PL !== "undefined" && tmpRacesList[raceid][race].PL <= 4.9){
            tmpGrpARaces.push(tmpRacesList[raceid][race]);
          }else if(tmpRacesList[raceid][race].PL <= 9.9){
            tmpGrpBRaces.push(tmpRacesList[raceid][race]);
          }else{
            tmpGrpCRaces.push(tmpRacesList[raceid][race]);
          }
          var pospayout = {};
          if(typeof tmpRacesList[raceid][race].FinishPosition != "undefined"){
            switch(tmpRacesList[raceid][race].FinishPosition){
              case '1':
                tmpRacesOrderdList["payouts"]["firstpos"] = {
                  "Win": tmpRacesList[raceid][race].Win,
                  "Place": tmpRacesList[raceid][race].Place,
                  "Sho": tmpRacesList[raceid][race].Sho,
                  "Exacta": tmpRacesList[raceid][race].Exacta,
                  "Trifecta": tmpRacesList[raceid][race].Trifecta,
                  "Superfecta": tmpRacesList[raceid][race].Superfecta,
                  "DD": tmpRacesList[raceid][race].DD,
                  "Pk3": tmpRacesList[raceid][race].Pk3,
                  "Pk4": tmpRacesList[raceid][race].Pk4,
                  "Pk5": tmpRacesList[raceid][race].Pk5,
                  "Pk6": tmpRacesList[raceid][race].Pk6
                }
              break;
              case '2':
                tmpRacesOrderdList["payouts"]["secondpos"] = {
                  "Win": tmpRacesList[raceid][race].Win,
                  "Place": tmpRacesList[raceid][race].Place,
                  "Sho": tmpRacesList[raceid][race].Sho,
                  "Exacta": tmpRacesList[raceid][race].Exacta,
                  "Trifecta": tmpRacesList[raceid][race].Trifecta,
                  "Superfecta": tmpRacesList[raceid][race].Superfecta,
                  "DD": tmpRacesList[raceid][race].DD,
                  "Pk3": tmpRacesList[raceid][race].Pk3,
                  "Pk4": tmpRacesList[raceid][race].Pk4,
                  "Pk5": tmpRacesList[raceid][race].Pk5,
                  "Pk6": tmpRacesList[raceid][race].Pk6
                }
              break;
              case '3':
                tmpRacesOrderdList["payouts"]["thirdpos"] = {
                  "Win": tmpRacesList[raceid][race].Win,
                  "Place": tmpRacesList[raceid][race].Place,
                  "Sho": tmpRacesList[raceid][race].Sho,
                  "Exacta": tmpRacesList[raceid][race].Exacta,
                  "Trifecta": tmpRacesList[raceid][race].Trifecta,
                  "Superfecta": tmpRacesList[raceid][race].Superfecta,
                  "DD": tmpRacesList[raceid][race].DD,
                  "Pk3": tmpRacesList[raceid][race].Pk3,
                  "Pk4": tmpRacesList[raceid][race].Pk4,
                  "Pk5": tmpRacesList[raceid][race].Pk5,
                  "Pk6": tmpRacesList[raceid][race].Pk6
                }
              break;
              default:
                pospayout = {};
              break;
            }
          }
        }
        tmpGrpARaces.sort((a1, a2) => (a1.PL > a2.PL) ? 1 : -1);
        var tmpGrpARacesArr = [];
        if(tmpGrpARaces.length > 0){
          tmpGrpARaces.forEach(function (raceRow, index, arr) {
            tmpGrpARacesArr[raceRow.PL] = raceRow;
            if (tmpAGrpBlocksArr.indexOf(raceRow.PL) == -1) {
              tmpAGrpBlocksArr.push(raceRow.PL);
            }
          });
        }
        tmpRacesOrderdList["A"] = tmpGrpARacesArr;
        tmpGrpBRaces.sort((b1, b2) => (b1.PL > b2.PL) ? 1 : -1);
        var tmpGrpBRacesArr = [];
        if(tmpGrpBRaces.length > 0){
          tmpGrpBRaces.forEach(function (raceRow, index, arr) {
            tmpGrpBRacesArr[raceRow.PL] = raceRow;
            if (tmpBGrpBlocksArr.indexOf(raceRow.PL) == -1) {
              tmpBGrpBlocksArr.push(raceRow.PL);
            }
          });
        }
        tmpRacesOrderdList["B"] = tmpGrpBRacesArr;
        tmpGrpCRaces.sort((c1, c2) => (c1.PL > c2.PL) ? 1 : -1);
        var tmpGrpCRacesArr = [];
        if(tmpGrpCRaces.length > 0){
          tmpGrpCRaces.forEach(function (raceRow, index, arr) {
            tmpGrpCRacesArr[raceRow.PL] = raceRow;
            if (tmpCGrpBlocksArr.indexOf(raceRow.PL) == -1) {
              tmpCGrpBlocksArr.push(raceRow.PL);
            }
          });
        }
        tmpRacesOrderdList["C"] = tmpGrpCRacesArr;
        tmpRacesOrderdList["Date"] = tmpRacesList[raceid][race].Date;
        tmpRacesOrderdList["Track"] = tmpRacesList[raceid][race].Track;
        tmpRacesOrderdList["id"] = raceid;
        tmpRacesOrderdList["race"] = "Race "+raceid;
        racesOrderdList.push(tmpRacesOrderdList);
        if (tmpTracksArr.indexOf(tmpRacesList[raceid][race].Track) == -1) {
          tmpTracksArr.push(tmpRacesList[raceid][race].Track);
        }
      }
      tmpAGrpBlocksArr.sort((grpa1, grpa2) => (grpa1 > grpa2) ? 1 : -1);
      tmpBGrpBlocksArr.sort((grpb1, grpb2) => (grpb1 > grpb2) ? 1 : -1);
      tmpCGrpBlocksArr.sort((grpc1, grpc2) => (grpc1 > grpc2) ? 1 : -1);
    }
    await this.setState({
      racesFilteredList: racesOrderdList,
      aGrpBlocksArr: tmpAGrpBlocksArr,
      bGrpBlocksArr: tmpBGrpBlocksArr,
      cGrpBlocksArr: tmpCGrpBlocksArr
    });
  }
  async handelRepeatRaceEvent() {
    let raceid = event.target.getAttribute('data-raceid');
    var tmpRepeatRacesArr = this.state.repeatRacesArr;
    if(typeof raceid != "undefined" && raceid != null && typeof tmpRepeatRacesArr != "undefined" && tmpRepeatRacesArr.indexOf(raceid) == -1 && typeof this.state.needRepeatRacesForBetTypesArr != "undefined" && this.state.needRepeatRacesForBetTypesArr.indexOf(this.state.betType) != -1){
      tmpRepeatRacesArr.push(raceid);
    }
    await this.setState({repeatRacesArr: tmpRepeatRacesArr});
    this.setRacesData();
  };
  async handelSecondRaceHorseBoxClickEvent(horsedata) {
    this.setState({errMsg: ""});
    var currDate = this.state.dateFltr;
    var allAccess = 0;
    if (this.state.accessRaceDaysWithoutLoginArr.indexOf(currDate) !== -1) {
      allAccess = 1;
    }else{
      if(checkUserLogin() === true){
        allAccess = 1;
      }
    }
    if(allAccess == 0){
      await this.setState({showLoginPopup: 'open'});
    }else{
      if(this.state.betType == ""){
        await this.setState({errMsg: "Please select Bet Type."});
      }else if(this.state.betAmount == ""){
        await this.setState({errMsg: "Please select Bet Amount."});
      }else{
        this.placeSecondRaceBetEvent(horsedata);
      }
    }
    this.setRacesData();
  };
  async placeSecondRaceBetEvent(slctedHorse) {
    var betType = this.state.betType;
    var betAmount = this.state.betAmount;
    var usrSecondRaceBetData = this.state.userSecondRaceBetData;
    var tmpUsrBetData = {};
    if(betType != "" && betAmount != "" && slctedHorse != ""){
      var usrSlctedHrsArr = this.state.usrSecondRaceSlctedHorseArr;
      if(typeof usrSlctedHrsArr != "undefined" && usrSlctedHrsArr.length > 0 && usrSlctedHrsArr.indexOf(slctedHorse.RaceID+"_"+slctedHorse.val+"_"+betType) !== -1){
        var tmpUsrBetDataArr = [];
        usrSecondRaceBetData.forEach((betData) => {
          if(typeof betData.selectedHorse != "undefined" && betData.selectedHorse.RaceID != "undefined" && betData.selectedHorse.val != "undefined" && betData.selectedHorse.RaceID+"_"+betData.selectedHorse.val !== slctedHorse.RaceID+"_"+slctedHorse.val){
            tmpUsrBetDataArr.push(betData);
          }
        })
        usrSecondRaceBetData = tmpUsrBetDataArr;
      }else{
        tmpUsrBetData["betType"] = betType;
        tmpUsrBetData["betAmount"] = betAmount;
        tmpUsrBetData["selectedHorse"] = slctedHorse;
        usrSecondRaceBetData.push(tmpUsrBetData);
      }
      var tmpBetRunnerArr = [];
      if(usrSecondRaceBetData.length > 0){
        var tmpUsrBetArr = [];
        var tmpUsrSlctedHorseArr = [];
        usrSecondRaceBetData.forEach(function (ubrow, index, arr) {
          if (tmpBetRunnerArr.indexOf(ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val+"_"+ubrow.betType) == -1) { 
            tmpBetRunnerArr.push(ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val);
            if (typeof tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType] === "undefined") { 
              tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType] = [];
            }
            tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType].push(ubrow);
            tmpUsrSlctedHorseArr.push(ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val+"_"+ubrow.betType);
            tmpUsrSlctedHorseArr[ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val+"_"+ubrow.betType] = ubrow.betType;
          }
        });
      }
    }
    await this.setState({userSecondRaceBetData: usrSecondRaceBetData, userSecondRaceBetRsltData: tmpUsrBetArr, usrSecondRaceSlctedHorseArr: tmpUsrSlctedHorseArr});
  };
  async handelThirdRaceHorseBoxClickEvent(horsedata) {
    this.setState({errMsg: ""});
    var currDate = this.state.dateFltr;
    var allAccess = 0;
    if (this.state.accessRaceDaysWithoutLoginArr.indexOf(currDate) !== -1) {
      allAccess = 1;
    }else{
      if(checkUserLogin() === true){
        allAccess = 1;
      }
    }
    if(allAccess == 0){
      await this.setState({showLoginPopup: 'open'});
    }else{
      if(this.state.betType == ""){
        await this.setState({errMsg: "Please select Bet Type."});
      }else if(this.state.betAmount == ""){
        await this.setState({errMsg: "Please select Bet Amount."});
      }else{
        this.placeThirdRaceBetEvent(horsedata);
      }
    }
    this.setRacesData();
  };
  async placeThirdRaceBetEvent(slctedHorse) {
    var betType = this.state.betType;
    var betAmount = this.state.betAmount;
    var usrThirdRaceBetData = this.state.userThirdRaceBetData;
    var tmpUsrBetData = {};
    if(betType != "" && betAmount != "" && slctedHorse != ""){
      var usrSlctedHrsArr = this.state.usrThirdRaceSlctedHorseArr;
      if(typeof usrSlctedHrsArr != "undefined" && usrSlctedHrsArr.length > 0 && usrSlctedHrsArr.indexOf(slctedHorse.RaceID+"_"+slctedHorse.val+"_"+betType) !== -1){
        var tmpUsrBetDataArr = [];
        usrThirdRaceBetData.forEach((betData) => {
          if(typeof betData.selectedHorse != "undefined" && betData.selectedHorse.RaceID != "undefined" && betData.selectedHorse.val != "undefined" && betData.selectedHorse.RaceID+"_"+betData.selectedHorse.val !== slctedHorse.RaceID+"_"+slctedHorse.val){
            tmpUsrBetDataArr.push(betData);
          }
        })
        usrThirdRaceBetData = tmpUsrBetDataArr;
      }else{
        tmpUsrBetData["betType"] = betType;
        tmpUsrBetData["betAmount"] = betAmount;
        tmpUsrBetData["selectedHorse"] = slctedHorse;
        usrThirdRaceBetData.push(tmpUsrBetData);
      }
      var tmpBetRunnerArr = [];
      if(usrThirdRaceBetData.length > 0){
        var tmpUsrBetArr = [];
        var tmpUsrSlctedHorseArr = [];
        usrThirdRaceBetData.forEach(function (ubrow, index, arr) {
          if (tmpBetRunnerArr.indexOf(ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val+"_"+ubrow.betType) == -1) { 
            tmpBetRunnerArr.push(ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val);
            if (typeof tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType] === "undefined") { 
              tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType] = [];
            }
            tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType].push(ubrow);
            tmpUsrSlctedHorseArr.push(ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val+"_"+ubrow.betType);
            tmpUsrSlctedHorseArr[ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val+"_"+ubrow.betType] = ubrow.betType;
          }
        });
      }
    }
    await this.setState({userThirdRaceBetData: usrThirdRaceBetData, userThirdRaceBetRsltData: tmpUsrBetArr, usrThirdRaceSlctedHorseArr: tmpUsrSlctedHorseArr});
  };
  async handelFourthRaceHorseBoxClickEvent(horsedata) {
    this.setState({errMsg: ""});
    var currDate = this.state.dateFltr;
    var allAccess = 0;
    if (this.state.accessRaceDaysWithoutLoginArr.indexOf(currDate) !== -1) {
      allAccess = 1;
    }else{
      if(checkUserLogin() === true){
        allAccess = 1;
      }
    }
    if(allAccess == 0){
      await this.setState({showLoginPopup: 'open'});
    }else{
      if(this.state.betType == ""){
        await this.setState({errMsg: "Please select Bet Type."});
      }else if(this.state.betAmount == ""){
        await this.setState({errMsg: "Please select Bet Amount."});
      }else{
        this.placeFourthRaceBetEvent(horsedata);
      }
    }
    this.setRacesData();
  };
  async placeFourthRaceBetEvent(slctedHorse) {
    var betType = this.state.betType;
    var betAmount = this.state.betAmount;
    var usrFourthRaceBetData = this.state.userFourthRaceBetData;
    var tmpUsrBetData = {};
    if(betType != "" && betAmount != "" && slctedHorse != ""){
      var usrSlctedHrsArr = this.state.usrFourthRaceSlctedHorseArr;
      if(typeof usrSlctedHrsArr != "undefined" && usrSlctedHrsArr.length > 0 && usrSlctedHrsArr.indexOf(slctedHorse.RaceID+"_"+slctedHorse.val+"_"+betType) !== -1){
        var tmpUsrBetDataArr = [];
        usrFourthRaceBetData.forEach((betData) => {
          if(typeof betData.selectedHorse != "undefined" && betData.selectedHorse.RaceID != "undefined" && betData.selectedHorse.val != "undefined" && betData.selectedHorse.RaceID+"_"+betData.selectedHorse.val !== slctedHorse.RaceID+"_"+slctedHorse.val){
            tmpUsrBetDataArr.push(betData);
          }
        })
        usrFourthRaceBetData = tmpUsrBetDataArr;
      }else{
        tmpUsrBetData["betType"] = betType;
        tmpUsrBetData["betAmount"] = betAmount;
        tmpUsrBetData["selectedHorse"] = slctedHorse;
        usrFourthRaceBetData.push(tmpUsrBetData);
      }
      var tmpBetRunnerArr = [];
      if(usrFourthRaceBetData.length > 0){
        var tmpUsrBetArr = [];
        var tmpUsrSlctedHorseArr = [];
        usrFourthRaceBetData.forEach(function (ubrow, index, arr) {
          if (tmpBetRunnerArr.indexOf(ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val+"_"+ubrow.betType) == -1) { 
            tmpBetRunnerArr.push(ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val);
            if (typeof tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType] === "undefined") { 
              tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType] = [];
            }
            tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType].push(ubrow);
            tmpUsrSlctedHorseArr.push(ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val+"_"+ubrow.betType);
            tmpUsrSlctedHorseArr[ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val+"_"+ubrow.betType] = ubrow.betType;
          }
        });
      }
    }
    await this.setState({userFourthRaceBetData: usrFourthRaceBetData, userFourthRaceBetRsltData: tmpUsrBetArr, usrFourthRaceSlctedHorseArr: tmpUsrSlctedHorseArr});
  };
  async handelHorseBoxClickEvent(horsedata) {
    this.setState({errMsg: ""});
    var currDate = this.state.dateFltr;
    var allAccess = 0;
    if (this.state.accessRaceDaysWithoutLoginArr.indexOf(currDate) !== -1) {
      allAccess = 1;
    }else{
      if(checkUserLogin() === true){
        allAccess = 1;
      }
    }
    if(allAccess == 0){
      await this.setState({showLoginPopup: 'open'});
    }else{
      if(this.state.betType == ""){
        await this.setState({errMsg: "Please select Bet Type."});
      }else if(this.state.betAmount == ""){
        await this.setState({errMsg: "Please select Bet Amount."});
      }else{
        this.placeBetEvent(horsedata);
        await this.setState({slctedHorse: horsedata});
      }
    }
    this.setRacesData();
  };
  async placeBetEvent(slctedHorse) {
    var betType = this.state.betType;
    var betAmount = this.state.betAmount;
    var usrBetData = this.state.userBetData;
    var tmpUsrBetData = {};
    if(betType != "" && betAmount != "" && slctedHorse != ""){
      var usrSlctedHrsArr = this.state.usrSlctedHorseArr;
      if(typeof usrSlctedHrsArr != "undefined" && usrSlctedHrsArr.length > 0 && usrSlctedHrsArr.indexOf(slctedHorse.RaceID+"_"+slctedHorse.val+"_"+betType) !== -1){
        var tmpUsrBetDataArr = [];
        usrBetData.forEach((betData) => {
          if(typeof betData.selectedHorse != "undefined" && betData.selectedHorse.RaceID != "undefined" && betData.selectedHorse.val != "undefined" && (betData.selectedHorse.RaceID+"_"+betData.selectedHorse.val !== slctedHorse.RaceID+"_"+slctedHorse.val || betData.betType != betType)){
            tmpUsrBetDataArr.push(betData);
          }
        })
        usrBetData = tmpUsrBetDataArr;
      }else{
        tmpUsrBetData["betType"] = betType;
        tmpUsrBetData["betAmount"] = betAmount;
        tmpUsrBetData["newBet"] = 1;
        tmpUsrBetData["selectedHorse"] = slctedHorse;
        usrBetData.push(tmpUsrBetData);
      }
      var tmpBetRunnerArr = [];
      if(usrBetData.length > 0){
        var tmpUsrBetArr = [];
        var tmpUsrSlctedHorseArr = [];
        usrBetData.forEach(function (ubrow, index, arr) {
          if (tmpBetRunnerArr.indexOf(tmpBetRunnerArr[ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val+"_"+ubrow.betType]) == -1) { 
            tmpBetRunnerArr.push(ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val);
            if (typeof tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType] === "undefined") { 
              tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType] = [];
            }
            tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType].push(ubrow);
            tmpUsrSlctedHorseArr.push(ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val+"_"+ubrow.betType);
            tmpUsrSlctedHorseArr[ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val+"_"+ubrow.betType] = ubrow.betType;
          }
        });
      }
    }
    await this.setState({userBetData: usrBetData, userBetRsltData: tmpUsrBetArr, slctedHorse: {}, usrSlctedHorseArr: tmpUsrSlctedHorseArr});
  };
  /*async placeBetEvent(slctedHorse) {
    var betType = this.state.betType;
    var betAmount = this.state.betAmount;
    var usrBetData = this.state.userBetData;
    var tmpUsrBetData = {};
    if(betType != "" && betAmount != "" && slctedHorse != ""){
      var usrSlctedHrsArr = this.state.usrSlctedHorseArr;
      if(typeof usrSlctedHrsArr != "undefined" && usrSlctedHrsArr.length > 0 && usrSlctedHrsArr.indexOf(slctedHorse.RaceID+"_"+slctedHorse.val) !== -1 && usrSlctedHrsArr[slctedHorse.RaceID+"_"+slctedHorse.val] == betType){
        var tmpUsrBetDataArr = [];
        usrBetData.forEach((betData) => {
          if(typeof betData.selectedHorse != "undefined" && betData.selectedHorse.RaceID != "undefined" && betData.selectedHorse.val != "undefined" && (betData.selectedHorse.RaceID+"_"+betData.selectedHorse.val !== slctedHorse.RaceID+"_"+slctedHorse.val || betData.betType != betType)){
            tmpUsrBetDataArr.push(betData);
          }
        })
        usrBetData = tmpUsrBetDataArr;
      }else{
        tmpUsrBetData["betType"] = betType;
        tmpUsrBetData["betAmount"] = betAmount;
        tmpUsrBetData["selectedHorse"] = slctedHorse;
        usrBetData.push(tmpUsrBetData);
      }
      var tmpBetRunnerArr = [];
      if(usrBetData.length > 0){
        var tmpUsrBetArr = [];
        var tmpUsrSlctedHorseArr = [];
        usrBetData.forEach(function (ubrow, index, arr) {
          if (tmpBetRunnerArr.indexOf(tmpBetRunnerArr[ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val]) == -1) { 
            tmpBetRunnerArr.push(ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val);
            if (typeof tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType] === "undefined") { 
              tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType] = [];
            }
            tmpUsrBetArr[ubrow.selectedHorse.RaceID+"_"+ubrow.betType].push(ubrow);
            tmpUsrSlctedHorseArr.push(ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val);
            tmpUsrSlctedHorseArr[ubrow.selectedHorse.RaceID+"_"+ubrow.selectedHorse.val] = ubrow.betType;
          }
        });
      }
    }
    await this.setState({userBetData: usrBetData, userBetRsltData: tmpUsrBetArr, slctedHorse: {}, usrSlctedHorseArr: tmpUsrSlctedHorseArr});
  };*/
  async submitSecondRaceBetEvent(event) {
    let raceid = event.target.getAttribute('data-sbmitbtnraceid');
    var repeatRaces = this.state.repeatRacesArr;
    repeatRaces.splice(repeatRaces.indexOf(raceid), 1);
    await this.setState({repeatRacesArr: repeatRaces});
    this.setRacesData();
  };
  async submitAllEvent(e) {
    if(checkUserLogin() === true){
      var usrSlctBetData = this.state.userBetData;
      var usrBetData = [];
      usrSlctBetData.forEach((betData) => {
        betData.newBet = 0;
        usrBetData.push(betData);
      });
      await this.setState({submitAll: true, submitBet: true, userBetData: usrBetData});
      /*let usrData = getUserInfo();
      await axios({
        method: "post",
        url: apiConstants.SAVE_USER_BET_DATA_API,
        data: {
          userId: usrData.user_id,
          userBetData: qs.stringify(this.state.userBetRsltData)
        }
      }).then(async response => {
        if ( response.data.status === 1 ) {
          await this.setState({submitAll: true, repeatRacesArr: []});
        }else{
          //this.setState({success_msg: '', error_msg: response.data.message});
        }
      }).catch(error => this.setState({success_msg: '', error_msg: 'Something goes wrong, please try again later!'}));*/
    }else{
      await this.setState({showLoginPopup: 'open'});
    }
    this.setRacesData();
  };
  async closeLoginPopup(e) {
    e.preventDefault();
    this.setRacesData();
    await this.setState({showLoginPopup: ''});
  };
  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    this.setRacesData();
  }
  handleBetTypeSelectEvent = (betTypeSlctOption) => {
    if(typeof betTypeSlctOption.value != "undefined"){
      /*if(["exacta","trifecta", "superfecta"].indexOf(betTypeSlctOption.value) != -1 || ["exacta","trifecta", "superfecta"].indexOf(this.state.betType) != -1){
        this.setState({
          slctedHorse: {}, 
          userBetRsltData: [], 
          usrSlctedHorseArr: [], 
          repeatRacesArr: [], 
          userBetData: [],
          userSecondRaceBetData: [], 
          userSecondRaceBetRsltData: [], 
          usrSecondRaceSlctedHorseArr: [],
          userThirdRaceBetData: [],
          userThirdRaceBetRsltData: [],
          usrThirdRaceSlctedHorseArr: []
        });
      }*/
      this.setState({
        betType: betTypeSlctOption.value, 
        lastBetType: betTypeSlctOption.value, 
        submitAll: false,
        results: false,
        repeatRacesArr: []
      });
    }
    this.setRacesData();
  }
  handleBetAmtSelectEvent = (betAmtSlctOption) => {
    if(typeof betAmtSlctOption.value != "undefined"){
      this.setState({betAmount: betAmtSlctOption.value, submitAll: false, results: false});
    }
    this.setRacesData();
  }
  async handleLoginBtnEvent(e) {
    e.preventDefault();
    await this.setState({showHideLoginRegisterPage: 'login'});
    this.setRacesData();
  };
  async submitLoginForm(event) {
    event.preventDefault();
    if (this.handleLoginFrmValidation()) {
      const params = {
        userName: this.state.userName,
        userPassword: this.state.userPassword
      }
      this.setState({loginSubmitDisabled:true });
      axios({
        method: "post",
        url: apiConstants.USER_LOGIN_API,
        data: params
      }).then(async response => {
        if (response.data.status === 1) {
          loginErrorMsg: response.data.msg
          localStorage.setItem('userInfo', JSON.stringify(response.data.userData));
          setUserSession(localStorage);
          await this.setState({loginSubmitDisabled:false, showLoginPopup: '' });
        } else {
          await this.setState({loginErrorMsg: response.data.msg});
        }
        this.setRacesData();
      }).catch(error => this.setState({success_msg: '', error_msg: 'Something goes wrong, please try again later!'}));
    }
  }
  handleLoginFrmValidation() {
    this.loginForm.validateAll();
    const { userName, userPassword } = this.state;
    if (userName && userPassword) {
      return true;
    }
    return false;
  }
  showHideRacesPayout(event) {
    let raceid = event.target.getAttribute('data-raceid');
    let colexp = event.target.getAttribute('data-colexp');
    let raceno = event.target.getAttribute('data-raceno');
    if(colexp == "collapse"){
      raceid = "";
    }
    this.setState({collapseExpandRaceId: raceid+raceno});
    this.setRacesData();
  };
  async showAllResults(e) {
    if(checkUserLogin() === true){
      //await this.setState({showAllResultsPopup: "open"});
      let usrData = getUserInfo();
      await axios({
        method: "post",
        url: apiConstants.SAVE_USER_BET_DATA_API,
        data: {
          userId: usrData.user_id,
          userBetData: qs.stringify(this.state.userBetRsltData)
        }
      }).then(async response => {
        if ( response.data.status === 1 ) {
          await this.setState({results: true, repeatRacesArr: []});
        }else{
          //this.setState({success_msg: '', error_msg: response.data.message});
        }
      }).catch(error => this.setState({success_msg: '', error_msg: 'Something goes wrong, please try again later!'}));
    }else{
      await this.setState({showLoginPopup: 'open'});
    }
    this.setRacesData();
  };
  /*async closeAllResultsPopup(e) {
    e.preventDefault();
    this.setRacesData();
    await this.setState({showAllResultsPopup: ''});
  };*/
  async handelNextDayBtnEvent(e) {
    var currDate = this.state.dateFltr;
    var dateListArr = this.state.dateList;
    var curDateIndx = dateListArr.indexOf(currDate);
    var nxtDate = this.state.dateList[curDateIndx+1];
    var allAccess = 0;
    if (this.state.accessRaceDaysWithoutLoginArr.indexOf(nxtDate) !== -1) {
      allAccess = 1;
    }else{
      if(checkUserLogin() === true){
        allAccess = 1;
      }else{
        await this.setState({showLoginPopup: 'open'});
      }
    }
    if(allAccess == 1){
      await axios({
        method: "post",
        url: apiConstants.GET_RACES_DATA_API+"?dt="+nxtDate,
        data: {}
      }).then(async response => {
        if ( response.data.status === 1 ) {
          await this.setState({
            submitAll: false,
            results: false,
            slctedHorse: {},
            userBetData: [],
            userBetRsltData: [],
            usrSlctedHorseArr: []
          });
          var tmpRacesList = [];
          response.data.races.forEach(function (row, index, arr) {
            if (typeof tmpRacesList[row.Race] === "undefined") { 
              tmpRacesList[row.Race] = [];
            }
            tmpRacesList[row.Race].push( {"rowid":row.id, "PL":row.PL, "P#":row["P#"], "Date":row["Date"], "Track":row["Track"], "Clr_pre":row["Clr_pre"], "Clr_post":row["Clr_post"], "ML":row["ML"], "Avg_Diff": row["Avg_Diff"], "Name": row["Name"], "Win": row["Win"], "Place": row["Place"], "Sho" : row["Sho"], "Exacta":row["Exacta"], "Trifecta":row["Trifecta"], "Superfecta":row["Superfecta"], "FinishPosition":row["FinishPosition"], "PP":row["PP"], "RaceID":row["Race"], "RaceNumber":row["RaceNumber"], "DD":row["DD"], "Pk3":row["Pk3"], "Pk4":row["Pk4"], "Pk5":row["Pk5"], "Pk6":row["Pk6"], "val":row["P#"], "Clr": row["Clr_post"], "OuterBorderClr": row["Clr_pre"], "ML_Rank": row["ML_Rank"], "REC_Rank": row["REC_Rank"], "AC_Rank": row["AC_Rank"], "RC_Rank": row["RC_Rank"], "EP_Rank": row["EP_Rank"], "MP_Rank": row["MP_Rank"], "LP_Rank": row["LP_Rank"], "TP_Rank": row["TP_Rank"], "SR_Rank": row["SR_Rank"], "TR_Rank": row["TR_Rank"], "AR_Rank": row["AR_Rank"], "SPD_PWR_Rank": row["SPD_PWR_Rank"], "CLOS_PWR_Rank": row["CLOS_PWR_Rank"], "SPD_LONE_Rank": row["SPD_LONE_Rank"], "SPD_ALT_Rank": row["SPD_ALT_Rank"], "CONF_Rank": row["CONF_Rank"], "TYP_Rank1": row["TYP_Rank1"], "TYP_Rank2": row["TYP_Rank2"], "TotRank": row["TotRank"], "RunnerID": row["P#"], "REC": row["REC"], "AC": row["AC"], "RC": row["RC"], "EP": row["EP"], "MP": row["MP"], "LP": row["LP"], "TP": row["TP"], "SR": row["SR"], "TR": row["TR"], "AR": row["AR"], "DLR": row["DLR"], "SPD_PWR": row["SPD_PWR"], "CLOS_PWR": row["CLOS_PWR"], "X_PWR": row["X_PWR"], "SPD_LONE": row["SPD_LONE"], "SPD_ALT": row["SPD_ALT"], "CONF": row["CONF"], "ExRank": row["ExRank"], "TotPts": row["TotPts"] });
          });
          var racesOrderdList = [];
          var tmpTracksArr = [];
          var tmpAGrpBlocksArr = [];
          var tmpBGrpBlocksArr = [];
          var tmpCGrpBlocksArr = [];
          for(var raceid in tmpRacesList) {
            var tmpGrpARaces = [];
            var tmpGrpBRaces = [];
            var tmpGrpCRaces = [];
            var tmpRacesOrderdList = [];
            tmpRacesOrderdList["A"] = [];
            tmpRacesOrderdList["B"] = [];
            tmpRacesOrderdList["C"] = [];
            tmpRacesOrderdList["payouts"] = [];
            tmpRacesOrderdList["payouts"]["firstpos"] = {};
            tmpRacesOrderdList["payouts"]["secondpos"] = {};
            tmpRacesOrderdList["payouts"]["thirdpos"] = {};
            for(var race in tmpRacesList[raceid]) {
              if(typeof tmpRacesList[raceid][race].PL !== "undefined" && tmpRacesList[raceid][race].PL <= 4.9){
                tmpGrpARaces.push(tmpRacesList[raceid][race]);
              }else if(tmpRacesList[raceid][race].PL <= 9.9){
                tmpGrpBRaces.push(tmpRacesList[raceid][race]);
              }else{
                tmpGrpCRaces.push(tmpRacesList[raceid][race]);
              }
              var pospayout = {};
              if(typeof tmpRacesList[raceid][race].FinishPosition != "undefined"){
                switch(tmpRacesList[raceid][race].FinishPosition){
                  case '1':
                    tmpRacesOrderdList["payouts"]["firstpos"] = {
                      "Win": tmpRacesList[raceid][race].Win,
                      "Place": tmpRacesList[raceid][race].Place,
                      "Sho": tmpRacesList[raceid][race].Sho,
                      "Exacta": tmpRacesList[raceid][race].Exacta,
                      "Trifecta": tmpRacesList[raceid][race].Trifecta,
                      "Superfecta": tmpRacesList[raceid][race].Superfecta,
                      "DD": tmpRacesList[raceid][race].DD,
                      "Pk3": tmpRacesList[raceid][race].Pk3,
                      "Pk4": tmpRacesList[raceid][race].Pk4,
                      "Pk5": tmpRacesList[raceid][race].Pk5,
                      "Pk6": tmpRacesList[raceid][race].Pk6
                    }
                  break;
                  case '2':
                    tmpRacesOrderdList["payouts"]["secondpos"] = {
                      "Win": tmpRacesList[raceid][race].Win,
                      "Place": tmpRacesList[raceid][race].Place,
                      "Sho": tmpRacesList[raceid][race].Sho,
                      "Exacta": tmpRacesList[raceid][race].Exacta,
                      "Trifecta": tmpRacesList[raceid][race].Trifecta,
                      "Superfecta": tmpRacesList[raceid][race].Superfecta,
                      "DD": tmpRacesList[raceid][race].DD,
                      "Pk3": tmpRacesList[raceid][race].Pk3,
                      "Pk4": tmpRacesList[raceid][race].Pk4,
                      "Pk5": tmpRacesList[raceid][race].Pk5,
                      "Pk6": tmpRacesList[raceid][race].Pk6
                    }
                  break;
                  case '3':
                    tmpRacesOrderdList["payouts"]["thirdpos"] = {
                      "Win": tmpRacesList[raceid][race].Win,
                      "Place": tmpRacesList[raceid][race].Place,
                      "Sho": tmpRacesList[raceid][race].Sho,
                      "Exacta": tmpRacesList[raceid][race].Exacta,
                      "Trifecta": tmpRacesList[raceid][race].Trifecta,
                      "Superfecta": tmpRacesList[raceid][race].Superfecta,
                      "DD": tmpRacesList[raceid][race].DD,
                      "Pk3": tmpRacesList[raceid][race].Pk3,
                      "Pk4": tmpRacesList[raceid][race].Pk4,
                      "Pk5": tmpRacesList[raceid][race].Pk5,
                      "Pk6": tmpRacesList[raceid][race].Pk6
                    }
                  break;
                  default:
                    pospayout = {};
                  break;
                }
              }
            }
            tmpGrpARaces.sort((a1, a2) => (a1.PL > a2.PL) ? 1 : -1);
            var tmpGrpARacesArr = [];
            if(tmpGrpARaces.length > 0){
              tmpGrpARaces.forEach(function (raceRow, index, arr) {
                tmpGrpARacesArr[raceRow.PL] = raceRow;
                if (tmpAGrpBlocksArr.indexOf(raceRow.PL) == -1) {
                  tmpAGrpBlocksArr.push(raceRow.PL);
                }
              });
            }
            tmpRacesOrderdList["A"] = tmpGrpARacesArr;
            tmpGrpBRaces.sort((b1, b2) => (b1.PL > b2.PL) ? 1 : -1);
            var tmpGrpBRacesArr = [];
            if(tmpGrpBRaces.length > 0){
              tmpGrpBRaces.forEach(function (raceRow, index, arr) {
                tmpGrpBRacesArr[raceRow.PL] = raceRow;
                if (tmpBGrpBlocksArr.indexOf(raceRow.PL) == -1) {
                  tmpBGrpBlocksArr.push(raceRow.PL);
                }
              });
            }
            tmpRacesOrderdList["B"] = tmpGrpBRacesArr;
            tmpGrpCRaces.sort((c1, c2) => (c1.PL > c2.PL) ? 1 : -1);
            var tmpGrpCRacesArr = [];
            if(tmpGrpCRaces.length > 0){
              tmpGrpCRaces.forEach(function (raceRow, index, arr) {
                tmpGrpCRacesArr[raceRow.PL] = raceRow;
                if (tmpCGrpBlocksArr.indexOf(raceRow.PL) == -1) {
                  tmpCGrpBlocksArr.push(raceRow.PL);
                }
              });
            }
            tmpRacesOrderdList["C"] = tmpGrpCRacesArr;
            tmpRacesOrderdList["Date"] = tmpRacesList[raceid][race].Date;
            tmpRacesOrderdList["Track"] = tmpRacesList[raceid][race].Track;
            tmpRacesOrderdList["id"] = raceid;
            tmpRacesOrderdList["race"] = "Race "+raceid;
            racesOrderdList.push(tmpRacesOrderdList);
            if (tmpTracksArr.indexOf(tmpRacesList[raceid][race].Track) == -1) {
              tmpTracksArr.push(tmpRacesList[raceid][race].Track);
            }
          }
          tmpAGrpBlocksArr.sort((grpa1, grpa2) => (grpa1 > grpa2) ? 1 : -1);
          tmpBGrpBlocksArr.sort((grpb1, grpb2) => (grpb1 > grpb2) ? 1 : -1);
          tmpCGrpBlocksArr.sort((grpc1, grpc2) => (grpc1 > grpc2) ? 1 : -1);
          await this.setState({
            typRankingsUploadDateTime: response.data.typ_rankings_upload_date_time, 
            racesFilteredList: racesOrderdList,
            allRacesList: response.data.races,
            dateFltr: response.data.today_date.toString(),
            tracksList: tmpTracksArr,
            dateList: response.data.dt_list,
            aGrpBlocksArr: tmpAGrpBlocksArr,
            bGrpBlocksArr: tmpBGrpBlocksArr,
            cGrpBlocksArr: tmpCGrpBlocksArr,
            submitAll: false,
            submitBet: false,
            betType: '',
            betAmount: ''
          });
        }else{
          //this.setState({success_msg: '', error_msg: response.data.message});
        }
      }).catch(error => this.setState({success_msg: '', error_msg: 'Something goes wrong, please try again later!'}));
    }
    this.setRacesData();
  }
  async handelRegisterBtnEvent(e) {
    await this.setState({hideShowLoginRegisterForm: 'register'});
    this.setRacesData();
  }
  async handelLoginBtnEvent(e) {
    await this.setState({hideShowLoginRegisterForm: 'login'});
    this.setRacesData();
  }
  async submitRegisterForm(event) {
    event.preventDefault();
    if (this.handleRegisterFrmValidation()) {
      const params = {
        userFirstName: this.state.userFirstName,
        userLastName: this.state.userLastName,
        userEmail: this.state.userEmail,
        userPassword: this.state.userPassword
      }
      axios({
        method: "post",
        url: apiConstants.USER_REGISTER_API,
        data: params
      }).then(async response => {
        if (response.data.status === 1) {
          registerErrorMsg: response.data.msg;
          localStorage.setItem('userInfo', JSON.stringify(response.data.userData));
          setUserSession(localStorage);
          await this.setState({ showLoginPopup: '' });
        } else {
          await this.setState({registerErrorMsg: response.data.msg});
        }
        this.setRacesData();
      }).catch(error => this.setState({success_msg: '', error_msg: 'Something goes wrong, please try again later!'}));
    }
    this.setRacesData();
  }
  handleRegisterFrmValidation() {
    this.registerForm.validateAll();
    const { userFirstName, userLastName, userEmail, userPassword, userConfirmPassword } = this.state;
    let formErrors = {};
    var isError = 0;
    if (userPassword != userConfirmPassword) {
      formErrors["userConfirmPasswordErr"] = "Password & confirm password not equal.";
      isError = 1;
    }
    this.setState({ formErrors: formErrors });
    if (userFirstName && userLastName && userEmail && userPassword && isError == 0) {
      return true;
    }
    return false;
  }
  render() {
    const { typRankingsUploadDateTime, racesFilteredList, dateFltr, betType, betAmount, tracksList, dateList, aGrpBlocksArr, bGrpBlocksArr, cGrpBlocksArr, slctedHorse, userBetRsltData, usrSlctedHorseArr, repeatRacesArr, userSecondRaceBetRsltData, usrSecondRaceSlctedHorseArr, usrThirdRaceSlctedHorseArr, usrFourthRaceSlctedHorseArr, userThirdRaceBetRsltData, userFourthRaceBetRsltData } = this.state;
    const { userConfirmPasswordErr } = this.state.formErrors;
    var totRacesCls = "saratoga-block-12";
    var grpATotRacesCls = "group-a-6";
    var grpBTotRacesCls = "group-b-6";
    var fullLineCls = "full-line-12";
    var grpALineCls = "grpA-line-6";
    var grpBLineCls = "grpB-line-6";
    var totRaces = 0;
    if(aGrpBlocksArr.length > 0){
      grpATotRacesCls = "group-a-"+(aGrpBlocksArr.length);
      grpALineCls = "grpA-line-"+(aGrpBlocksArr.length);
      totRaces = totRaces + (aGrpBlocksArr.length);
    }
    if(bGrpBlocksArr.length > 0){
      grpBTotRacesCls = "group-b-"+bGrpBlocksArr.length;
      grpBLineCls = "grpB-line-"+(bGrpBlocksArr.length);
      totRaces = totRaces + (bGrpBlocksArr.length);
    }
    if(cGrpBlocksArr.length > 0){
      totRaces = totRaces + (cGrpBlocksArr.length);
    }
    totRacesCls = "saratoga-block-"+totRaces;
    fullLineCls = "full-line-"+totRaces;
    //disable the list of custom dates
    const customDates = dateList;
    const disableCustomDt = current => {
      return customDates.includes(current.format('YYYYMMDD'));
    }
    var tmpSelectedRacesArr = [];
    for(var indx in userBetRsltData) {
      if(indx != '' && tmpSelectedRacesArr.indexOf(indx) == -1){
        tmpSelectedRacesArr.push(indx.split('_')[0]);
      }
    }
    var racesBlock = [];
    var tmpRacesTrackArr = [];
    var fieldsMaxValue = ['REC', 'AC', 'RC', 'EP', 'MP', 'LP', 'TP', 'SR', 'TR', 'AR', 'DLR', 'SPD_PWR', 'CLOS_PWR', 'X_PWR', 'SPD_LONE', 'SPD_ALT', 'CONF'];
    if(typeof racesFilteredList != "undefined" && racesFilteredList.length > 0){
      var grpARange = aGrpBlocksArr;
      var grpBRange = bGrpBlocksArr;
      var grpCRange = cGrpBlocksArr;
      for(var indx in racesFilteredList) {
        var race = racesFilteredList[indx];
        race.fieldsMaxValue = [];
        var tmpRECArr = [];
        var tmpACArr = [];
        var tmpRCArr = [];
        var tmpEPArr = [];
        var tmpMPArr = [];
        var tmpLPArr = [];
        var tmpTPArr = [];
        var tmpSRArr = [];
        var tmpTRArr = [];
        var tmpARArr = [];
        var tmpDLRArr = [];
        var tmpSPD_PWRArr = [];
        var tmpCLOS_PWRArr = [];
        var tmpX_PWRArr = [];
        var tmpSPD_LONEArr = [];
        var tmpSPD_ALTArr = [];
        var tmpCONFArr = [];
        /*var disClrPayout = false;
        if(race.id != '' && tmpSelectedRacesArr.indexOf(race.id) != -1){
          disClrPayout = true;
        }*/
        var disClrPayout = true;
        var raceid = (race.id).replace("2021", "");
        if(typeof race.A != 'undefined' && Object.entries(race.A).length > 0){
          var tmpGrpaHrsArr = [];
          var gaidx = aGrpBlocksArr[0];
          while (gaidx <= aGrpBlocksArr.[aGrpBlocksArr.length - 1]) {
            if(typeof race.A[gaidx] != 'undefined' && typeof race.A[gaidx].PL != 'undefined' && grpARange.includes(race.A[gaidx].PL)){
              tmpGrpaHrsArr.push(race.A[gaidx]);
              if(typeof race.A[gaidx].REC != "undefined" && race.A[gaidx].REC != null && race.A[gaidx].REC != NaN){
                tmpRECArr.push(parseFloat(race.A[gaidx].REC));
              }
              if(typeof race.A[gaidx].AC != "undefined" && race.A[gaidx].AC != null && race.A[gaidx].AC != NaN){
                tmpACArr.push(parseFloat(race.A[gaidx].AC));
              }
              if(typeof race.A[gaidx].RC != "undefined" && race.A[gaidx].RC != null && race.A[gaidx].RC != NaN){
                tmpRCArr.push(parseFloat(race.A[gaidx].RC));
              }
              if(typeof race.A[gaidx].EP != "undefined" && race.A[gaidx].EP != null && race.A[gaidx].EP != NaN){
                tmpEPArr.push(parseFloat(race.A[gaidx].EP));
              }
              if(typeof race.A[gaidx].MP != "undefined" && race.A[gaidx].MP != null && race.A[gaidx].MP != NaN){
                tmpMPArr.push(parseFloat(race.A[gaidx].MP));
              }
              if(typeof race.A[gaidx].LP != "undefined" && race.A[gaidx].LP != null && race.A[gaidx].LP != NaN){
                tmpLPArr.push(parseFloat(race.A[gaidx].LP));
              }
              if(typeof race.A[gaidx].TP != "undefined" && race.A[gaidx].TP != null && race.A[gaidx].TP != NaN){
                tmpTPArr.push(parseFloat(race.A[gaidx].TP));
              }
              if(typeof race.A[gaidx].SR != "undefined" && race.A[gaidx].SR != null && race.A[gaidx].SR != NaN){
                tmpSRArr.push(parseFloat(race.A[gaidx].SR));
              }
              if(typeof race.A[gaidx].TR != "undefined" && race.A[gaidx].TR != null && race.A[gaidx].TR != NaN){
                tmpTRArr.push(parseFloat(race.A[gaidx].TR));
              }
              if(typeof race.A[gaidx].AR != "undefined" && race.A[gaidx].AR != null && race.A[gaidx].AR != NaN){
                tmpARArr.push(parseFloat(race.A[gaidx].AR));
              }
              if(typeof race.A[gaidx].DLR != "undefined" && race.A[gaidx].DLR != null && race.A[gaidx].DLR != NaN){
                tmpDLRArr.push(parseFloat(race.A[gaidx].DLR));
              }
              if(typeof race.A[gaidx].SPD_PWR != "undefined" && race.A[gaidx].SPD_PWR != null && race.A[gaidx].SPD_PWR != NaN){
                tmpSPD_PWRArr.push(parseFloat(race.A[gaidx].SPD_PWR));
              }
              if(typeof race.A[gaidx].CLOS_PWR != "undefined" && race.A[gaidx].CLOS_PWR != null && race.A[gaidx].CLOS_PWR != NaN){
                tmpCLOS_PWRArr.push(parseFloat(race.A[gaidx].CLOS_PWR));
              }
              if(typeof race.A[gaidx].X_PWR != "undefined" && race.A[gaidx].X_PWR != null && race.A[gaidx].X_PWR != NaN){
                tmpX_PWRArr.push(parseFloat(race.A[gaidx].X_PWR));
              }
              if(typeof race.A[gaidx].SPD_LONE != "undefined" && race.A[gaidx].SPD_LONE != null && race.A[gaidx].SPD_LONE != NaN){
                tmpSPD_LONEArr.push(parseFloat(race.A[gaidx].SPD_LONE));
              }
              if(typeof race.A[gaidx].SPD_ALT != "undefined" && race.A[gaidx].SPD_ALT != null && race.A[gaidx].SPD_ALT != NaN){
                tmpSPD_ALTArr.push(parseFloat(race.A[gaidx].SPD_ALT));
              }
              if(typeof race.A[gaidx].CONF != "undefined" && race.A[gaidx].CONF != null && race.A[gaidx].CONF != NaN){
                tmpCONFArr.push(parseFloat(race.A[gaidx].CONF));
              }
            }else{
              tmpGrpaHrsArr.push({});
            }
            var aGrpBlckArrIndx = aGrpBlocksArr.indexOf(gaidx);
            gaidx = aGrpBlocksArr[aGrpBlckArrIndx+1];
          }
          race.A = tmpGrpaHrsArr;
        }
        if(typeof race.B != 'undefined' && Object.entries(race.B).length > 0){
          var tmpGrpbHrsArr = [];
          var gbidx = bGrpBlocksArr[0];;
          while (gbidx <= bGrpBlocksArr.[bGrpBlocksArr.length - 1]){
            if(typeof race.B[gbidx] != 'undefined' && typeof race.B[gbidx].PL != 'undefined' && grpBRange.includes(race.B[gbidx].PL)){
              tmpGrpbHrsArr.push(race.B[gbidx]);
              if(typeof race.B[gbidx].REC != "undefined" && race.B[gbidx].REC != null && race.B[gbidx].REC != NaN){
                tmpRECArr.push(parseFloat(race.B[gbidx].REC));
              }
              if(typeof race.B[gbidx].AC != "undefined" && race.B[gbidx].AC != null && race.B[gbidx].AC != NaN){
                tmpACArr.push(parseFloat(race.B[gbidx].AC));
              }
              if(typeof race.B[gbidx].RC != "undefined" && race.B[gbidx].RC != null && race.B[gbidx].RC != NaN){
                tmpRCArr.push(parseFloat(race.B[gbidx].RC));
              }
              if(typeof race.B[gbidx].EP != "undefined" && race.B[gbidx].EP != null && race.B[gbidx].EP != NaN){
                tmpEPArr.push(parseFloat(race.B[gbidx].EP));
              }
              if(typeof race.B[gbidx].EP != "undefined" && race.B[gbidx].MP != null && race.B[gbidx].MP != NaN){
                tmpMPArr.push(parseFloat(race.B[gbidx].MP));
              }
              if(typeof race.B[gbidx].LP != "undefined" && race.B[gbidx].LP != null && race.B[gbidx].LP != NaN){
                tmpLPArr.push(parseFloat(race.B[gbidx].LP));
              }
              if(typeof race.B[gbidx].TP != "undefined" && race.B[gbidx].TP != null && race.B[gbidx].TP != NaN){
                tmpTPArr.push(parseFloat(race.B[gbidx].TP));
              }
              if(typeof race.B[gbidx].SR != "undefined" && race.B[gbidx].SR != null && race.B[gbidx].SR != NaN){
                tmpSRArr.push(parseFloat(race.B[gbidx].SR));
              }
              if(typeof race.B[gbidx].TR != "undefined" && race.B[gbidx].TR != null && race.B[gbidx].TR != NaN){
                tmpTRArr.push(parseFloat(race.B[gbidx].TR));
              }
              if(typeof race.B[gbidx].AR != "undefined" && race.B[gbidx].AR != null && race.B[gbidx].AR != NaN){
                tmpARArr.push(parseFloat(race.B[gbidx].AR));
              }
              if(typeof race.B[gbidx].DLR != "undefined" && race.B[gbidx].DLR != null && race.B[gbidx].DLR != NaN){
                tmpDLRArr.push(parseFloat(race.B[gbidx].DLR));
              }
              if(typeof race.B[gbidx].SPD_PWR != "undefined" && race.B[gbidx].SPD_PWR != null && race.B[gbidx].SPD_PWR != NaN){
                tmpSPD_PWRArr.push(parseFloat(race.B[gbidx].SPD_PWR));
              }
              if(typeof race.B[gbidx].CLOS_PWR != "undefined" && race.B[gbidx].CLOS_PWR != null && race.B[gbidx].CLOS_PWR != NaN){
                tmpCLOS_PWRArr.push(parseFloat(race.B[gbidx].CLOS_PWR));
              }
              if(typeof race.B[gbidx].X_PWR != "undefined" && race.B[gbidx].X_PWR != null && race.B[gbidx].X_PWR != NaN){
                tmpX_PWRArr.push(parseFloat(race.B[gbidx].X_PWR));
              }
              if(typeof race.B[gbidx].SPD_LONE != "undefined" && race.B[gbidx].SPD_LONE != null && race.B[gbidx].SPD_LONE != NaN){
                tmpSPD_LONEArr.push(parseFloat(race.B[gbidx].SPD_LONE));
              }
              if(typeof race.B[gbidx].SPD_ALT != "undefined" && race.B[gbidx].SPD_ALT != null && race.B[gbidx].SPD_ALT != NaN){
                tmpSPD_ALTArr.push(parseFloat(race.B[gbidx].SPD_ALT));
              }
              if(typeof race.B[gbidx].CONF != "undefined" && race.B[gbidx].CONF != null && race.B[gbidx].CONF != NaN){
                tmpCONFArr.push(parseFloat(race.B[gbidx].CONF));
              }
            }else{
              tmpGrpbHrsArr.push({});
            }
            var bGrpBlckArrIndx = bGrpBlocksArr.indexOf(gbidx);
            gbidx = bGrpBlocksArr[bGrpBlckArrIndx+1];
          }
          race.B = tmpGrpbHrsArr;
        }
        if(typeof race.C != 'undefined' && Object.entries(race.C).length > 0){
          var tmpGrpcHrsArr = [];
          var gcidx = cGrpBlocksArr[0];
          while (gcidx <= cGrpBlocksArr.[cGrpBlocksArr.length - 1]) {
            if(typeof race.C[gcidx] != 'undefined' && typeof race.C[gcidx].PL != 'undefined' && grpCRange.includes(race.C[gcidx].PL)){
              tmpGrpcHrsArr.push(race.C[gcidx]);
              if(typeof race.C[gcidx].REC != "undefined" && race.C[gcidx].REC != null && race.C[gcidx].REC != NaN){
                tmpRECArr.push(parseFloat(race.C[gcidx].REC));
              }
              if(typeof race.C[gcidx].AC != "undefined" && race.C[gcidx].AC != null && race.C[gcidx].AC != NaN){
                tmpACArr.push(parseFloat(race.C[gcidx].AC));
              }
              if(typeof race.C[gcidx].RC != "undefined" && race.C[gcidx].RC != null && race.C[gcidx].RC != NaN){
                tmpRCArr.push(parseFloat(race.C[gcidx].RC));
              }
              if(typeof race.C[gcidx].EP != "undefined" && race.C[gcidx].EP != null && race.C[gcidx].EP != NaN){
                tmpEPArr.push(parseFloat(race.C[gcidx].EP));
              }
              if(typeof race.C[gcidx].MP != "undefined" && race.C[gcidx].MP != null && race.C[gcidx].MP != NaN){
                tmpMPArr.push(parseFloat(race.C[gcidx].MP));
              }
              if(typeof race.C[gcidx].LP != "undefined" && race.C[gcidx].LP != null && race.C[gcidx].LP != NaN){
                tmpLPArr.push(parseFloat(race.C[gcidx].LP));
              }
              if(typeof race.C[gcidx].TP != "undefined" && race.C[gcidx].TP != null && race.C[gcidx].TP != NaN){
                tmpTPArr.push(parseFloat(race.C[gcidx].TP));
              }
              if(typeof race.C[gcidx].SR != "undefined" && race.C[gcidx].SR != null && race.C[gcidx].SR != NaN){
                tmpSRArr.push(parseFloat(race.C[gcidx].SR));
              }
              if(typeof race.C[gcidx].TR != "undefined" && race.C[gcidx].TR != null && race.C[gcidx].TR != NaN){
                tmpTRArr.push(parseFloat(race.C[gcidx].TR));
              }
              if(typeof race.C[gcidx].AR != "undefined" && race.C[gcidx].AR != null && race.C[gcidx].AR != NaN){
                tmpARArr.push(parseFloat(race.C[gcidx].AR));
              }
              if(typeof race.C[gcidx].DLR != "undefined" && race.C[gcidx].DLR != null && race.C[gcidx].DLR != NaN){
                tmpDLRArr.push(parseFloat(race.C[gcidx].DLR));
              }
              if(typeof race.C[gcidx].SPD_PWR != "undefined" && race.C[gcidx].SPD_PWR != null && race.C[gcidx].SPD_PWR != NaN){
                tmpSPD_PWRArr.push(parseFloat(race.C[gcidx].SPD_PWR));
              }
              if(typeof race.C[gcidx].CLOS_PWR != "undefined" && race.C[gcidx].CLOS_PWR != null && race.C[gcidx].CLOS_PWR != NaN){
                tmpCLOS_PWRArr.push(parseFloat(race.C[gcidx].CLOS_PWR));
              }
              if(typeof race.C[gcidx].X_PWR != "undefined" && race.C[gcidx].X_PWR != null && race.C[gcidx].X_PWR != NaN){
                tmpX_PWRArr.push(parseFloat(race.C[gcidx].X_PWR));
              }
              if(typeof race.C[gcidx].SPD_LONE != "undefined" && race.C[gcidx].SPD_LONE != null && race.C[gcidx].SPD_LONE != NaN){
                tmpSPD_LONEArr.push(parseFloat(race.C[gcidx].SPD_LONE));
              }
              if(typeof race.C[gcidx].SPD_ALT != "undefined" && race.C[gcidx].SPD_ALT != null && race.C[gcidx].SPD_ALT != NaN){
                tmpSPD_ALTArr.push(parseFloat(race.C[gcidx].SPD_ALT));
              }
              if(typeof race.C[gcidx].CONF != "undefined" && race.C[gcidx].CONF != null && race.C[gcidx].CONF != NaN){
                tmpCONFArr.push(parseFloat(race.C[gcidx].CONF));
              }
            }else{
              tmpGrpcHrsArr.push({});
            }
            var cGrpBlckArrIndx = cGrpBlocksArr.indexOf(gcidx);
            gcidx = cGrpBlocksArr[cGrpBlckArrIndx+1];
          }
          race.C = tmpGrpcHrsArr;
        }
        race.fieldsMaxValue['REC'] = Math.max.apply(Math, tmpRECArr);
        race.fieldsMaxValue['AC'] = Math.max.apply(Math, tmpACArr);
        race.fieldsMaxValue['RC'] = Math.max.apply(Math, tmpRCArr);
        race.fieldsMaxValue['EP'] = Math.max.apply(Math, tmpEPArr);
        race.fieldsMaxValue['MP'] = Math.max.apply(Math, tmpMPArr);
        race.fieldsMaxValue['LP'] = Math.max.apply(Math, tmpLPArr);
        race.fieldsMaxValue['TP'] = Math.max.apply(Math, tmpTPArr);
        race.fieldsMaxValue['SR'] = Math.max.apply(Math, tmpSRArr);
        race.fieldsMaxValue['TR'] = Math.max.apply(Math, tmpTRArr);
        race.fieldsMaxValue['AR'] = Math.max.apply(Math, tmpARArr);
        race.fieldsMaxValue['DLR'] = Math.max.apply(Math, tmpDLRArr);
        race.fieldsMaxValue['SPD_PWR'] = Math.max.apply(Math, tmpSPD_PWRArr);
        race.fieldsMaxValue['CLOS_PWR'] = Math.max.apply(Math, tmpCLOS_PWRArr);
        race.fieldsMaxValue['X_PWR'] = Math.max.apply(Math, tmpX_PWRArr);
        race.fieldsMaxValue['SPD_LONE'] = Math.max.apply(Math, tmpSPD_LONEArr);
        race.fieldsMaxValue['SPD_ALT'] = Math.max.apply(Math, tmpSPD_ALTArr);
        race.fieldsMaxValue['CONF'] = Math.max.apply(Math, tmpCONFArr);
        if (tmpRacesTrackArr.indexOf(race.Track) == -1) { 
          tmpRacesTrackArr.push(race.Track);
          racesBlock.push(
            <div className="racetrack" key={indx}>
              <div className="inner-box">{(typeof race.Track != "undefined")?race.Track:""}</div>
              <span>{(typeof race.Date != "undefined")?race.Date:""}</span> 
            </div>
          );
        }
        racesBlock.push(
          <div className={(typeof race.id != "undefined" && typeof repeatRacesArr != "undefined" && repeatRacesArr.indexOf(race.id) != -1 && ["exacta","trifecta", "superfecta"].indexOf(this.state.betType) != -1)?"sortable-row":(repeatRacesArr.length == 0)?"sortable-row":(["exacta","trifecta", "superfecta"].indexOf(this.state.betType) != -1)?"sortable-row first less-opacity":"sortable-row first"}>
            <div className="sortable-inner-row">
              <div className="left-btn-block">
                <div className="label-a cursor-pointer" data-raceid={race.id} onClick={() => this.handelRepeatRaceEvent()}>{raceid}</div>
                <a href={void(0)} className="collapsed" onClick={this.showHideRacesPayout.bind(this)}>
                  {this.state.collapseExpandRaceId == raceid+"first" ?
                    <span className="expand-exacta-payout-calc" data-raceid={raceid} data-raceno="first" data-colexp="collapse">-</span>
                  :
                    <span className="expand-exacta-payout-calc" data-raceid={raceid} data-raceno="first" data-colexp="expand">+</span>
                  }
                </a>
              </div>
              <div className="scaller-a" id="grid-container">
                <div className="scaller-a-inner">
                  <div className="grp-boxes">
                    {(Object.entries(race.A).length > 0) ?
                      Object.entries(race.A).map((grpAHrsVal, aidx) => {
                        var grpahorseno = (typeof grpAHrsVal[1].val !== "undefined")?grpAHrsVal[1].val:0;
                        var grpamlval = (typeof grpAHrsVal[1].ML !== "undefined")?grpAHrsVal[1].ML:0;
                        var grpaplval = (typeof grpAHrsVal[1].PL !== "undefined")?grpAHrsVal[1].PL:0;
                        var grpabxclr = '';
                        if(typeof grpAHrsVal[1].Clr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpabxclr = this.groupBoxColor(grpAHrsVal[1].Clr);
                        }
                        var grpabxoutrbrdrclr = "";
                        if(typeof grpAHrsVal[1].OuterBorderClr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpabxoutrbrdrclr = this.groupOuterBoxColor(grpAHrsVal[1].OuterBorderClr)
                        }
                        var grpAHorseBoxClrOnClick = "";
                        //if(typeof usrSlctedHorseArr != "undefined" && usrSlctedHorseArr.length > 0 && usrSlctedHorseArr.indexOf(grpAHrsVal[1].RaceID+"_"+grpAHrsVal[1].val) !== -1 && this.state.submitAll === false && this.state.results === false && this.state.betType == usrSlctedHorseArr[grpAHrsVal[1].RaceID+"_"+grpAHrsVal[1].val]){
                        if(typeof usrSlctedHorseArr != "undefined" && usrSlctedHorseArr.length > 0 && usrSlctedHorseArr.indexOf(grpAHrsVal[1].RaceID+"_"+grpAHrsVal[1].val+"_"+betType) !== -1 && this.state.submitAll === false && this.state.results === false){
                          switch(usrSlctedHorseArr[grpAHrsVal[1].RaceID+"_"+grpAHrsVal[1].val+"_"+betType]){
                            case "win":
                              grpAHorseBoxClrOnClick = "sky-blue-box";
                            break;
                            case "show":
                              grpAHorseBoxClrOnClick = "cream-box";
                            break;
                            case "place":
                              grpAHorseBoxClrOnClick = "pink-box";
                            break;
                            default:
                              grpAHorseBoxClrOnClick = "light-purple-border-box";
                            break;
                          }
                        }
                        return (                          
                          <div className={"item itm-outr-bordr grpA "+grpAHorseBoxClrOnClick+" "+grpabxclr+" "+grpabxoutrbrdrclr} key={aidx}>
                            {(grpahorseno != 0)?
                              <div className="item-inner" onClick={() => this.handelHorseBoxClickEvent(grpAHrsVal[1])}>
                                <div className="hrs-dtil-box">
                                  <div className="horse-number">{grpahorseno}</div>
                                  <div className="horse-mlpl">ML:{grpamlval}</div>
                                  <div className="horse-mlpl">PL:{grpaplval}</div>
                                </div>
                              </div>
                            :"" }
                          </div>
                        )
                      })
                      : ""
                    }
                    {(Object.entries(race.B).length > 0) ?
                      Object.entries(race.B).map((grpBHrsVal, bidx) => {
                        var grpbhorseno = (typeof grpBHrsVal[1].val !== "undefined")?grpBHrsVal[1].val:0;
                        var grpbmlval = (typeof grpBHrsVal[1].ML !== "undefined")?grpBHrsVal[1].ML:0;
                        var grpbplval = (typeof grpBHrsVal[1].PL !== "undefined")?grpBHrsVal[1].PL:0;
                        var grpbbxclr = "";
                        if(typeof grpBHrsVal[1].Clr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpbbxclr = this.groupBoxColor(grpBHrsVal[1].Clr);
                        }
                        var grpbbxoutrbrdrclr = "";
                        if(typeof grpBHrsVal[1].OuterBorderClr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpbbxoutrbrdrclr = this.groupOuterBoxColor(grpBHrsVal[1].OuterBorderClr);
                        }
                        var grpBHorseBoxClrOnClick = "";
                        //if(typeof usrSlctedHorseArr != "undefined" && usrSlctedHorseArr.length > 0 && usrSlctedHorseArr.indexOf(grpBHrsVal[1].RaceID+"_"+grpBHrsVal[1].val) !== -1 && this.state.submitAll === false && this.state.results === false && this.state.betType == usrSlctedHorseArr[grpBHrsVal[1].RaceID+"_"+grpBHrsVal[1].val]){
                        if(typeof usrSlctedHorseArr != "undefined" && usrSlctedHorseArr.length > 0 && usrSlctedHorseArr.indexOf(grpBHrsVal[1].RaceID+"_"+grpBHrsVal[1].val+"_"+betType) !== -1 && this.state.submitAll === false && this.state.results === false){
                          switch(usrSlctedHorseArr[grpBHrsVal[1].RaceID+"_"+grpBHrsVal[1].val+"_"+betType]){
                            case "win":
                              grpBHorseBoxClrOnClick = "sky-blue-box";
                            break;
                            case "show":
                              grpBHorseBoxClrOnClick = "cream-box";
                            break;
                            case "place":
                              grpBHorseBoxClrOnClick = "pink-box";
                            break;
                            default:
                              grpBHorseBoxClrOnClick = "light-purple-border-box";
                            break;
                          }
                        }
                        return (
                          <div className={"item itm-outr-bordr grpB "+grpBHorseBoxClrOnClick+" "+grpbbxclr+" "+grpbbxoutrbrdrclr} key={bidx}>
                            {(grpbhorseno != 0)?
                              <div className="item-inner" onClick={() => this.handelHorseBoxClickEvent(grpBHrsVal[1])}>
                                <div className="hrs-dtil-box">
                                  <div className="horse-number">{grpbhorseno}</div>
                                  <div className="horse-mlpl">ML:{grpbmlval}</div>
                                  <div className="horse-mlpl">PL:{grpbplval}</div>
                                </div>
                              </div>
                            :""}
                          </div>
                        )
                      })
                      : ""
                    }
                    {(Object.entries(race.C).length > 0) ?
                      Object.entries(race.C).map((grpCHrsVal, cind) => {
                        var grpchorseno = (typeof grpCHrsVal[1].val !== "undefined")?grpCHrsVal[1].val:0;
                        var grpcmlval = (typeof grpCHrsVal[1].ML !== "undefined")?grpCHrsVal[1].ML:0;
                        var grpcplval = (typeof grpCHrsVal[1].PL !== "undefined")?grpCHrsVal[1].PL:0;
                        var grpcbxclr = "";
                        if(typeof grpCHrsVal[1].Clr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpcbxclr = this.groupBoxColor(grpCHrsVal[1].Clr);

                        }
                        var grpcbxoutrbrdrclr = "";
                        if(typeof grpCHrsVal[1].OuterBorderClr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpcbxoutrbrdrclr = this.groupOuterBoxColor(grpCHrsVal[1].OuterBorderClr);
                        }
                        var grpCHorseBoxClrOnClick = "";
                        //if(typeof usrSlctedHorseArr != "undefined" && usrSlctedHorseArr.length > 0 && usrSlctedHorseArr.indexOf(grpCHrsVal[1].RaceID+"_"+grpCHrsVal[1].val) !== -1 && this.state.submitAll === false && this.state.results === false && this.state.betType == usrSlctedHorseArr[grpCHrsVal[1].RaceID+"_"+grpCHrsVal[1].val]){
                        if(typeof usrSlctedHorseArr != "undefined" && usrSlctedHorseArr.length > 0 && usrSlctedHorseArr.indexOf(grpCHrsVal[1].RaceID+"_"+grpCHrsVal[1].val+"_"+betType) !== -1 && this.state.submitAll === false && this.state.results === false){
                          switch(usrSlctedHorseArr[grpCHrsVal[1].RaceID+"_"+grpCHrsVal[1].val+"_"+betType]){
                            case "win":
                              grpCHorseBoxClrOnClick = "sky-blue-box";
                            break;
                            case "show":
                              grpCHorseBoxClrOnClick = "cream-box";
                            break;
                            case "place":
                              grpCHorseBoxClrOnClick = "pink-box";
                            break;
                            default:
                              grpCHorseBoxClrOnClick = "light-purple-border-box";
                            break;
                          }
                        }
                        return (
                          <div className={"item itm-outr-bordr grpC "+grpCHorseBoxClrOnClick+" "+grpcbxclr+" "+grpcbxoutrbrdrclr} key={cind}>
                            {(grpchorseno != 0)?
                              <div className="item-inner" onClick={() => this.handelHorseBoxClickEvent(grpCHrsVal[1])}>
                                <div className="hrs-dtil-box">
                                  <div className="horse-number">{grpchorseno}</div>
                                  <div className="horse-mlpl">ML:{grpcmlval}</div>
                                  <div className="horse-mlpl">PL:{grpcplval}</div>
                                </div>
                              </div>
                            :""}
                          </div>
                        )
                      })
                      : ""
                    }
                  </div>
                  <div className={"scaller-a-inner-plank full-line "+fullLineCls}>
                    <div className={"scaller-a-inner-plank grpA-line "+grpALineCls}></div>
                    <div className={"scaller-a-inner-plank grpB-line "+grpBLineCls}></div>
                  </div>
                </div>
              </div>
              {/*
                (typeof repeatRacesArr != "undefined" && repeatRacesArr.length > 0 && repeatRacesArr.indexOf(race.id) !== -1 && typeof userSecondRaceBetRsltData != "undefined" && Object.entries(userSecondRaceBetRsltData).length > 0 && (typeof userSecondRaceBetRsltData[race.id+"_exacta"] != "undefined" && Object.entries(userSecondRaceBetRsltData[race.id+"_exacta"]).length > 0 || typeof userSecondRaceBetRsltData[race.id+"_trifecta"] != "undefined" && Object.entries(userSecondRaceBetRsltData[race.id+"_trifecta"]).length > 0)) ?
                <button type="button" className="btn btn-primary" data-sbmitbtnraceid={race.id} onClick={this.submitSecondRaceBetEvent.bind(this)}>Submit</button>
                :""
              */}
              <div className={(this.state.collapseExpandRaceId == raceid+"first") ? "sec-exacta-payout-calc collapse in" : "sec-exacta-payout-calc collapse"}>
                {(this.state.submitAll === true && disClrPayout === true) ?
                  <table className="payouttbl" width="50%" border="1">
                    <tbody>
                      <tr>
                        <td align="center" width="10%"><div>Win</div></td>
                        <td align="center" width="10%"><div>Place</div></td>
                        <td align="center" width="10%"><div>Sho</div></td>
                        <td align="center" width="10%"><div>Exacta</div></td>
                        <td align="center" width="10%"><div>Tri</div></td>
                        <td align="center" width="10%"><div>Super</div></td>
                        <td align="center" width="8%"><div>DD</div></td>
                        <td align="center" width="8%"><div>Pk3</div></td>
                        <td align="center" width="8%"><div>Pk4</div></td>
                        <td align="center" width="8%"><div>Pk5</div></td>
                        <td align="center" width="8%"><div>Pk6</div></td>
                      </tr>
                      {(Object.entries(race.payouts).length > 0) ?
                        Object.entries(race.payouts).map((racePayoutVal, poidx) => {
                          return (
                            <tr key={poidx}>
                              <td align="center">{(typeof racePayoutVal[1].Win != "undefined")?racePayoutVal[1].Win:0}</td>
                              <td align="center">{(typeof racePayoutVal[1].Place != "undefined")?racePayoutVal[1].Place:0}</td>
                              <td align="center">{(typeof racePayoutVal[1].Sho != "undefined")?racePayoutVal[1].Sho:0}</td>
                              <td align="center">{(typeof racePayoutVal[1].Exacta != "undefined" && racePayoutVal[1].Exacta != 0)?racePayoutVal[1].Exacta:""}</td>
                              <td align="center">{(typeof racePayoutVal[1].Trifecta != "undefined" && racePayoutVal[1].Trifecta != 0)?racePayoutVal[1].Trifecta:""}</td>
                              <td align="center">{(typeof racePayoutVal[1].Superfecta != "undefined" && racePayoutVal[1].Superfecta != 0)?racePayoutVal[1].Superfecta:""}</td>
                              <td align="center">{(typeof racePayoutVal[1].DD != "undefined" && racePayoutVal[1].DD != 0)?racePayoutVal[1].DD:""}</td>
                              <td align="center">{(typeof racePayoutVal[1].Pk3 != "undefined" && racePayoutVal[1].Pk3 != 0)?racePayoutVal[1].Pk3:""}</td>
                              <td align="center">{(typeof racePayoutVal[1].Pk4 != "undefined" && racePayoutVal[1].Pk4 != 0)?racePayoutVal[1].Pk4:""}</td>
                              <td align="center">{(typeof racePayoutVal[1].Pk5 != "undefined" && racePayoutVal[1].Pk5 != 0)?racePayoutVal[1].Pk5:""}</td>
                              <td align="center">{(typeof racePayoutVal[1].Pk6 != "undefined" && racePayoutVal[1].Pk6 != 0)?racePayoutVal[1].Pk6:""}</td>
                            </tr>
                          )
                        })
                        : ""
                      }
                      </tbody>
                  </table>
                :
                  <table className="payouttbl" width="100%" border="1">
                    <tbody>
                      <NoResultsTableColumns />
                      {(Object.entries(race.A).length > 0) ?
                        Object.entries(race.A).map((grpAHorseRankVal, arankidx) => {
                          if(typeof grpAHorseRankVal[1].RaceNumber != "undefined" && grpAHorseRankVal[1].RaceNumber != null && grpAHorseRankVal[1].RaceNumber > 0){
                            return (
                              <GroupAHorseRankValues grpAHorseRankVal={grpAHorseRankVal} race={race} arankidx={arankidx}/>
                            )
                          }
                        })
                        : ""
                      }
                      {(Object.entries(race.B).length > 0) ?
                        Object.entries(race.B).map((grpBHorseRankVal, brankidx) => {
                          if(typeof grpBHorseRankVal[1].RaceNumber != "undefined" && grpBHorseRankVal[1].RaceNumber != null && grpBHorseRankVal[1].RaceNumber > 0){
                            return (
                              <GroupBHorseRankValues grpBHorseRankVal={grpBHorseRankVal} race={race} brankidx={brankidx} />
                            )
                          }
                        })
                        : ""
                      }
                      {(Object.entries(race.C).length > 0) ?
                        Object.entries(race.C).map((grpCHorseRankVal, crankidx) => {
                          if(typeof grpCHorseRankVal[1].RaceNumber != "undefined" && grpCHorseRankVal[1].RaceNumber != null && grpCHorseRankVal[1].RaceNumber > 0){
                            return (
                              <GroupCHorseRankValues grpCHorseRankVal={grpCHorseRankVal} crankidx={crankidx} race={race}/>
                            )
                          }
                        })
                        : ""
                      }
                      </tbody>
                  </table>
                }
              </div>
            </div>
          </div>
        );
        racesBlock.push(
          <div className={(typeof race.id != "undefined" && typeof repeatRacesArr != "undefined" && repeatRacesArr.indexOf(race.id) == -1)?"sortable-row second dnone":"sortable-row second"}>
            <div className="sortable-inner-row">
              <div className="left-btn-block">
                <div className="label-a">2nd</div>
              </div>
              <div className="scaller-a" id="grid-container">
                <div className="scaller-a-inner">
                  <div className="grp-boxes">
                    {(Object.entries(race.A).length > 0) ?
                      Object.entries(race.A).map((grpAHrsVal, aidx) => {
                        var grpahorseno = (typeof grpAHrsVal[1].val !== "undefined")?grpAHrsVal[1].val:0;
                        var grpamlval = (typeof grpAHrsVal[1].ML !== "undefined")?grpAHrsVal[1].ML:0;
                        var grpaplval = (typeof grpAHrsVal[1].PL !== "undefined")?grpAHrsVal[1].PL:0;
                        var grpabxclr = "";
                        if(typeof grpAHrsVal[1].Clr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpabxclr = this.groupBoxColor(grpAHrsVal[1].Clr);
                        }
                        var grpabxoutrbrdrclr = "";
                        if(typeof grpAHrsVal[1].OuterBorderClr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpabxoutrbrdrclr = this.groupOuterBoxColor(grpAHrsVal[1].OuterBorderClr)
                        }
                        var grpAHorseBoxClrOnClick = "";
                        if(typeof usrSecondRaceSlctedHorseArr != "undefined" && usrSecondRaceSlctedHorseArr.length > 0 && usrSecondRaceSlctedHorseArr.indexOf(grpAHrsVal[1].RaceID+"_"+grpAHrsVal[1].val+"_"+betType) !== -1 && ["exacta","trifecta", "superfecta"].indexOf(usrSecondRaceSlctedHorseArr[grpAHrsVal[1].RaceID+"_"+grpAHrsVal[1].val+"_"+betType]) != -1 && this.state.submitAll === false && this.state.results === false){
                          grpAHorseBoxClrOnClick = "pink-box";
                        }
                        return (                          
                          <div className={"item itm-outr-bordr grpA "+grpAHorseBoxClrOnClick+" "+grpabxclr+" "+grpabxoutrbrdrclr} key={aidx}>
                            {(grpahorseno != 0)?
                              <div className="item-inner" onClick={() => this.handelSecondRaceHorseBoxClickEvent(grpAHrsVal[1])}>
                                <div className="hrs-dtil-box">
                                  <div className="horse-number">{grpahorseno}</div>
                                  <div className="horse-mlpl">ML:{grpamlval}</div>
                                  <div className="horse-mlpl">PL:{grpaplval}</div>
                                </div>
                              </div>
                            :"" }
                          </div>
                        )
                      })
                      : ""
                    }
                    {(Object.entries(race.B).length > 0) ?
                      Object.entries(race.B).map((grpBHrsVal, bidx) => {
                        var grpbhorseno = (typeof grpBHrsVal[1].val !== "undefined")?grpBHrsVal[1].val:0;
                        var grpbmlval = (typeof grpBHrsVal[1].ML !== "undefined")?grpBHrsVal[1].ML:0;
                        var grpbplval = (typeof grpBHrsVal[1].PL !== "undefined")?grpBHrsVal[1].PL:0;
                        var grpbbxclr = "";
                        if(typeof grpBHrsVal[1].Clr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpbbxclr = this.groupBoxColor(grpBHrsVal[1].Clr);

                        }
                        var grpbbxoutrbrdrclr = "";
                        if(typeof grpBHrsVal[1].OuterBorderClr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpbbxoutrbrdrclr = this.groupOuterBoxColor(grpBHrsVal[1].OuterBorderClr);
                        }
                        var grpBHorseBoxClrOnClick = "";
                        if(typeof usrSecondRaceSlctedHorseArr != "undefined" && usrSecondRaceSlctedHorseArr.length > 0 && usrSecondRaceSlctedHorseArr.indexOf(grpBHrsVal[1].RaceID+"_"+grpBHrsVal[1].val+"_"+betType) !== -1 && ["exacta","trifecta", "superfecta"].indexOf(usrSecondRaceSlctedHorseArr[grpBHrsVal[1].RaceID+"_"+grpBHrsVal[1].val+"_"+betType]) != -1 && this.state.submitAll === false && this.state.results === false){
                          grpBHorseBoxClrOnClick = "pink-box";
                        }
                        return (
                          <div className={"item itm-outr-bordr grpB "+grpBHorseBoxClrOnClick+" "+grpbbxclr+" "+grpbbxoutrbrdrclr} key={bidx}>
                            {(grpbhorseno != 0)?
                              <div className="item-inner" onClick={() => this.handelSecondRaceHorseBoxClickEvent(grpBHrsVal[1])}>
                                <div className="hrs-dtil-box">
                                  <div className="horse-number">{grpbhorseno}</div>
                                  <div className="horse-mlpl">ML:{grpbmlval}</div>
                                  <div className="horse-mlpl">PL:{grpbplval}</div>
                                </div>
                              </div>
                            :""}
                          </div>
                        )
                      })
                      : ""
                    }
                    {(Object.entries(race.C).length > 0) ?
                      Object.entries(race.C).map((grpCHrsVal, cind) => {
                        var grpchorseno = (typeof grpCHrsVal[1].val !== "undefined")?grpCHrsVal[1].val:0;
                        var grpcmlval = (typeof grpCHrsVal[1].ML !== "undefined")?grpCHrsVal[1].ML:0;
                        var grpcplval = (typeof grpCHrsVal[1].PL !== "undefined")?grpCHrsVal[1].PL:0;
                        var grpcbxclr = "";
                        if(typeof grpCHrsVal[1].Clr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpcbxclr = this.groupBoxColor(grpCHrsVal[1].Clr);

                        }
                        var grpcbxoutrbrdrclr = "";
                        if(typeof grpCHrsVal[1].OuterBorderClr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpcbxoutrbrdrclr = this.groupOuterBoxColor(grpCHrsVal[1].OuterBorderClr);
                        }
                        var grpCHorseBoxClrOnClick = "";
                        if(typeof usrSecondRaceSlctedHorseArr != "undefined" && usrSecondRaceSlctedHorseArr.length > 0 && usrSecondRaceSlctedHorseArr.indexOf(grpCHrsVal[1].RaceID+"_"+grpCHrsVal[1].val+"_"+betType) !== -1 && ["exacta","trifecta", "superfecta"].indexOf(usrSecondRaceSlctedHorseArr[grpCHrsVal[1].RaceID+"_"+grpCHrsVal[1].val+"_"+betType]) != -1 && this.state.submitAll === false && this.state.results === false){
                          grpCHorseBoxClrOnClick = "pink-box";
                        }
                        return (
                          <div className={"item itm-outr-bordr grpC "+grpCHorseBoxClrOnClick+" "+grpcbxclr+" "+grpcbxoutrbrdrclr} key={cind}>
                            {(grpchorseno != 0)?
                              <div className="item-inner" onClick={() => this.handelSecondRaceHorseBoxClickEvent(grpCHrsVal[1])}>
                                <div className="hrs-dtil-box">
                                  <div className="horse-number">{grpchorseno}</div>
                                  <div className="horse-mlpl">ML:{grpcmlval}</div>
                                  <div className="horse-mlpl">PL:{grpcplval}</div>
                                </div>
                              </div>
                            :""}
                          </div>
                        )
                      })
                      : ""
                    }
                  </div>
                  <div className={"scaller-a-inner-plank full-line "+fullLineCls}>
                    <div className={"scaller-a-inner-plank grpA-line "+grpALineCls}></div>
                    <div className={"scaller-a-inner-plank grpB-line "+grpBLineCls}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        racesBlock.push(
          <div className={(typeof race.id != "undefined" && typeof repeatRacesArr != "undefined" && repeatRacesArr.indexOf(race.id) == -1)?"sortable-row third dnone":(["trifecta", "superfecta"].indexOf(this.state.betType) == -1)?"sortable-row third dnone":"sortable-row third"}>
            <div className="sortable-inner-row">
              <div className="left-btn-block">
                <div className="label-a">3rd</div>
              </div>
              <div className="scaller-a" id="grid-container">
                <div className="scaller-a-inner">
                  <div className="grp-boxes">
                    {(Object.entries(race.A).length > 0) ?
                      Object.entries(race.A).map((grpAHrsVal, aidx) => {
                        var grpahorseno = (typeof grpAHrsVal[1].val !== "undefined")?grpAHrsVal[1].val:0;
                        var grpamlval = (typeof grpAHrsVal[1].ML !== "undefined")?grpAHrsVal[1].ML:0;
                        var grpaplval = (typeof grpAHrsVal[1].PL !== "undefined")?grpAHrsVal[1].PL:0;
                        var grpabxclr = "";
                        if(typeof grpAHrsVal[1].Clr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpabxclr = this.groupBoxColor(grpAHrsVal[1].Clr);
                        }
                        var grpabxoutrbrdrclr = "";
                        if(typeof grpAHrsVal[1].OuterBorderClr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpabxoutrbrdrclr = this.groupOuterBoxColor(grpAHrsVal[1].OuterBorderClr)
                        }
                        var grpAHorseBoxClrOnClick = "";
                        if(typeof usrThirdRaceSlctedHorseArr != "undefined" && usrThirdRaceSlctedHorseArr.length > 0 && usrThirdRaceSlctedHorseArr.indexOf(grpAHrsVal[1].RaceID+"_"+grpAHrsVal[1].val+"_"+betType) !== -1 && ["trifecta", "superfecta"].indexOf(usrThirdRaceSlctedHorseArr[grpAHrsVal[1].RaceID+"_"+grpAHrsVal[1].val+"_"+betType]) != -1 && this.state.submitAll === false && this.state.results === false){
                          grpAHorseBoxClrOnClick = "cream-box";
                        }
                        return (                          
                          <div className={"item itm-outr-bordr grpA "+grpAHorseBoxClrOnClick+" "+grpabxclr+" "+grpabxoutrbrdrclr} key={aidx}>
                            {(grpahorseno != 0)?
                              <div className="item-inner" onClick={() => this.handelThirdRaceHorseBoxClickEvent(grpAHrsVal[1])}>
                                <div className="hrs-dtil-box">
                                  <div className="horse-number">{grpahorseno}</div>
                                  <div className="horse-mlpl">ML:{grpamlval}</div>
                                  <div className="horse-mlpl">PL:{grpaplval}</div>
                                </div>
                              </div>
                            :"" }
                          </div>
                        )
                      })
                      : ""
                    }
                    {(Object.entries(race.B).length > 0) ?
                      Object.entries(race.B).map((grpBHrsVal, bidx) => {
                        var grpbhorseno = (typeof grpBHrsVal[1].val !== "undefined")?grpBHrsVal[1].val:0;
                        var grpbmlval = (typeof grpBHrsVal[1].ML !== "undefined")?grpBHrsVal[1].ML:0;
                        var grpbplval = (typeof grpBHrsVal[1].PL !== "undefined")?grpBHrsVal[1].PL:0;
                        var grpbbxclr = "";
                        if(typeof grpBHrsVal[1].Clr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpbbxclr = this.groupBoxColor(grpBHrsVal[1].Clr);
                        }
                        var grpbbxoutrbrdrclr = "";
                        if(typeof grpBHrsVal[1].OuterBorderClr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpbbxoutrbrdrclr = this.groupOuterBoxColor(grpBHrsVal[1].OuterBorderClr);
                        }
                        var grpBHorseBoxClrOnClick = "";
                        if(typeof usrThirdRaceSlctedHorseArr != "undefined" && usrThirdRaceSlctedHorseArr.length > 0 && usrThirdRaceSlctedHorseArr.indexOf(grpBHrsVal[1].RaceID+"_"+grpBHrsVal[1].val+"_"+betType) !== -1 && ["trifecta", "superfecta"].indexOf(usrThirdRaceSlctedHorseArr[grpBHrsVal[1].RaceID+"_"+grpBHrsVal[1].val+"_"+betType]) != -1 && this.state.submitAll === false && this.state.results === false){
                          grpBHorseBoxClrOnClick = "cream-box";
                        }
                        return (
                          <div className={"item itm-outr-bordr grpB "+grpBHorseBoxClrOnClick+" "+grpbbxclr+" "+grpbbxoutrbrdrclr} key={bidx}>
                            {(grpbhorseno != 0)?
                              <div className="item-inner" onClick={() => this.handelThirdRaceHorseBoxClickEvent(grpBHrsVal[1])}>
                                <div className="hrs-dtil-box">
                                  <div className="horse-number">{grpbhorseno}</div>
                                  <div className="horse-mlpl">ML:{grpbmlval}</div>
                                  <div className="horse-mlpl">PL:{grpbplval}</div>
                                </div>
                              </div>
                            :""}
                          </div>
                        )
                      })
                      : ""
                    }
                    {(Object.entries(race.C).length > 0) ?
                      Object.entries(race.C).map((grpCHrsVal, cind) => {
                        var grpchorseno = (typeof grpCHrsVal[1].val !== "undefined")?grpCHrsVal[1].val:0;
                        var grpcmlval = (typeof grpCHrsVal[1].ML !== "undefined")?grpCHrsVal[1].ML:0;
                        var grpcplval = (typeof grpCHrsVal[1].PL !== "undefined")?grpCHrsVal[1].PL:0;
                        var grpcbxclr = "";
                        if(typeof grpCHrsVal[1].Clr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpcbxclr = this.groupBoxColor(grpCHrsVal[1].Clr);
                        }
                        var grpcbxoutrbrdrclr = "";
                        if(typeof grpCHrsVal[1].OuterBorderClr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpcbxoutrbrdrclr = this.groupOuterBoxColor(grpCHrsVal[1].OuterBorderClr);
                        }
                        var grpCHorseBoxClrOnClick = "";
                        if(typeof usrThirdRaceSlctedHorseArr != "undefined" && usrThirdRaceSlctedHorseArr.length > 0 && usrThirdRaceSlctedHorseArr.indexOf(grpCHrsVal[1].RaceID+"_"+grpCHrsVal[1].val+"_"+betType) !== -1 && ["trifecta", "superfecta"].indexOf(usrThirdRaceSlctedHorseArr[grpCHrsVal[1].RaceID+"_"+grpCHrsVal[1].val+"_"+betType]) != -1 && this.state.submitAll === false && this.state.results === false){
                          grpCHorseBoxClrOnClick = "cream-box";
                        }
                        return (
                          <div className={"item itm-outr-bordr grpC "+grpCHorseBoxClrOnClick+" "+grpcbxclr+" "+grpcbxoutrbrdrclr} key={cind}>
                            {(grpchorseno != 0)?
                              <div className="item-inner" onClick={() => this.handelThirdRaceHorseBoxClickEvent(grpCHrsVal[1])}>
                                <div className="hrs-dtil-box">
                                  <div className="horse-number">{grpchorseno}</div>
                                  <div className="horse-mlpl">ML:{grpcmlval}</div>
                                  <div className="horse-mlpl">PL:{grpcplval}</div>
                                </div>
                              </div>
                            :""}
                          </div>
                        )
                      })
                      : ""
                    }
                  </div>
                  <div className={"scaller-a-inner-plank full-line "+fullLineCls}>
                    <div className={"scaller-a-inner-plank grpA-line "+grpALineCls}></div>
                    <div className={"scaller-a-inner-plank grpB-line "+grpBLineCls}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        racesBlock.push(
          <div className={(typeof race.id != "undefined" && typeof repeatRacesArr != "undefined" && repeatRacesArr.indexOf(race.id) == -1)?"sortable-row fourth dnone":(["superfecta"].indexOf(this.state.betType) == -1)?"sortable-row fourth dnone":"sortable-row fourth"}>
            <div className="sortable-inner-row">
              <div className="left-btn-block">
                <div className="label-a">4th</div>
              </div>
              <div className="scaller-a" id="grid-container">
                <div className="scaller-a-inner">
                  <div className="grp-boxes">
                    {(Object.entries(race.A).length > 0) ?
                      Object.entries(race.A).map((grpAHrsVal, aidx) => {
                        var grpahorseno = (typeof grpAHrsVal[1].val !== "undefined")?grpAHrsVal[1].val:0;
                        var grpamlval = (typeof grpAHrsVal[1].ML !== "undefined")?grpAHrsVal[1].ML:0;
                        var grpaplval = (typeof grpAHrsVal[1].PL !== "undefined")?grpAHrsVal[1].PL:0;
                        var grpabxclr = "";
                        if(typeof grpAHrsVal[1].Clr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpabxclr = this.groupBoxColor(grpAHrsVal[1].Clr);
                        }
                        var grpabxoutrbrdrclr = "";
                        if(typeof grpAHrsVal[1].OuterBorderClr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpabxoutrbrdrclr = this.groupOuterBoxColor(grpAHrsVal[1].OuterBorderClr)
                        }
                        var grpAHorseBoxClrOnClick = "";
                        if(typeof usrFourthRaceSlctedHorseArr != "undefined" && usrFourthRaceSlctedHorseArr.length > 0 && usrFourthRaceSlctedHorseArr.indexOf(grpAHrsVal[1].RaceID+"_"+grpAHrsVal[1].val+"_"+betType) !== -1 && ["superfecta"].indexOf(usrFourthRaceSlctedHorseArr[grpAHrsVal[1].RaceID+"_"+grpAHrsVal[1].val+"_"+betType]) != -1 && this.state.submitAll === false && this.state.results === false){
                          grpAHorseBoxClrOnClick = "gray-box";
                        }
                        return (                          
                          <div className={"item itm-outr-bordr grpA "+grpAHorseBoxClrOnClick+" "+grpabxclr+" "+grpabxoutrbrdrclr} key={aidx}>
                            {(grpahorseno != 0)?
                              <div className="item-inner" onClick={() => this.handelFourthRaceHorseBoxClickEvent(grpAHrsVal[1])}>
                                <div className="hrs-dtil-box">
                                  <div className="horse-number">{grpahorseno}</div>
                                  <div className="horse-mlpl">ML:{grpamlval}</div>
                                  <div className="horse-mlpl">PL:{grpaplval}</div>
                                </div>
                              </div>
                            :"" }
                          </div>
                        )
                      })
                      : ""
                    }
                    {(Object.entries(race.B).length > 0) ?
                      Object.entries(race.B).map((grpBHrsVal, bidx) => {
                        var grpbhorseno = (typeof grpBHrsVal[1].val !== "undefined")?grpBHrsVal[1].val:0;
                        var grpbmlval = (typeof grpBHrsVal[1].ML !== "undefined")?grpBHrsVal[1].ML:0;
                        var grpbplval = (typeof grpBHrsVal[1].PL !== "undefined")?grpBHrsVal[1].PL:0;
                        var grpbbxclr = "";
                        if(typeof grpBHrsVal[1].Clr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpbbxclr = this.groupBoxColor(grpBHrsVal[1].Clr);
                        }
                        var grpbbxoutrbrdrclr = "";
                        if(typeof grpBHrsVal[1].OuterBorderClr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpbbxoutrbrdrclr = this.groupOuterBoxColor(grpBHrsVal[1].OuterBorderClr);
                        }
                        var grpBHorseBoxClrOnClick = "";
                        if(typeof usrFourthRaceSlctedHorseArr != "undefined" && usrFourthRaceSlctedHorseArr.length > 0 && usrFourthRaceSlctedHorseArr.indexOf(grpBHrsVal[1].RaceID+"_"+grpBHrsVal[1].val+"_"+betType) !== -1 && ["superfecta"].indexOf(usrFourthRaceSlctedHorseArr[grpBHrsVal[1].RaceID+"_"+grpBHrsVal[1].val+"_"+betType]) != -1 && this.state.submitAll === false && this.state.results === false){
                          grpBHorseBoxClrOnClick = "gray-box";
                        }
                        return (
                          <div className={"item itm-outr-bordr grpB "+grpBHorseBoxClrOnClick+" "+grpbbxclr+" "+grpbbxoutrbrdrclr} key={bidx}>
                            {(grpbhorseno != 0)?
                              <div className="item-inner" onClick={() => this.handelFourthRaceHorseBoxClickEvent(grpBHrsVal[1])}>
                                <div className="hrs-dtil-box">
                                  <div className="horse-number">{grpbhorseno}</div>
                                  <div className="horse-mlpl">ML:{grpbmlval}</div>
                                  <div className="horse-mlpl">PL:{grpbplval}</div>
                                </div>
                              </div>
                            :""}
                          </div>
                        )
                      })
                      : ""
                    }
                    {(Object.entries(race.C).length > 0) ?
                      Object.entries(race.C).map((grpCHrsVal, cind) => {
                        var grpchorseno = (typeof grpCHrsVal[1].val !== "undefined")?grpCHrsVal[1].val:0;
                        var grpcmlval = (typeof grpCHrsVal[1].ML !== "undefined")?grpCHrsVal[1].ML:0;
                        var grpcplval = (typeof grpCHrsVal[1].PL !== "undefined")?grpCHrsVal[1].PL:0;
                        var grpcbxclr = "";
                        if(typeof grpCHrsVal[1].Clr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpcbxclr = this.groupBoxColor(grpCHrsVal[1].Clr);
                        }
                        var grpcbxoutrbrdrclr = "";
                        if(typeof grpCHrsVal[1].OuterBorderClr !== "undefined" && this.state.results === true && disClrPayout == true){
                          grpcbxoutrbrdrclr = this.groupOuterBoxColor(grpCHrsVal[1].OuterBorderClr);

                        }
                        var grpCHorseBoxClrOnClick = "";
                        if(typeof usrFourthRaceSlctedHorseArr != "undefined" && usrFourthRaceSlctedHorseArr.length > 0 && usrFourthRaceSlctedHorseArr.indexOf(grpCHrsVal[1].RaceID+"_"+grpCHrsVal[1].val+"_"+betType) !== -1 && ["superfecta"].indexOf(usrFourthRaceSlctedHorseArr[grpCHrsVal[1].RaceID+"_"+grpCHrsVal[1].val+"_"+betType]) != -1 && this.state.submitAll === false && this.state.results === false){
                          grpCHorseBoxClrOnClick = "gray-box";
                        }
                        return (
                          <div className={"item itm-outr-bordr grpC "+grpCHorseBoxClrOnClick+" "+grpcbxclr+" "+grpcbxoutrbrdrclr} key={cind}>
                            {(grpchorseno != 0)?
                              <div className="item-inner" onClick={() => this.handelFourthRaceHorseBoxClickEvent(grpCHrsVal[1])}>
                                <div className="hrs-dtil-box">
                                  <div className="horse-number">{grpchorseno}</div>
                                  <div className="horse-mlpl">ML:{grpcmlval}</div>
                                  <div className="horse-mlpl">PL:{grpcplval}</div>
                                </div>
                              </div>
                            :""}
                          </div>
                        )
                      })
                      : ""
                    }
                  </div>
                  <div className={"scaller-a-inner-plank full-line "+fullLineCls}>
                    <div className={"scaller-a-inner-plank grpA-line "+grpALineCls}></div>
                    <div className={"scaller-a-inner-plank grpB-line "+grpBLineCls}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    var tracks = [];
    for(var trkIndx in tracksList) {
      tracks.push(
        <option value={tracksList[trkIndx]} key={trkIndx}>{tracksList[trkIndx]}</option>
      );
    }
    let totalBetAmt = 0;
    let totalProfitLossAmt = 0;
    let totPatoutAmt = 0;
    let totProfitLossAmt = 0;
    return (
      <>
        <Layout title="Betacus Game Application" description="Betacus Game Application" keywords="" canonical="https://betacus.com/">
          <div className="content">
            <div className="top-content-box">
              <div className="left-content-box">
                <div className="fltr-box">
                  <div className="srch-box">
                    <div className="slct-box">
                      <select name="tracks" id="tracks" className="slct-fld fltr-sec" defaultValue={this.state.trackFltr} value={this.state.trackFltr} onClick={this.handleTrackFilter.bind(this)} data-imagepath="">
                        <option value="all">All Tracks</option>
                        {tracks}
                      </select>
                    </div>
                    <DatePicker
                      value={dateFltr}
                      dateFormat="YYYYMMDD"
                      timeFormat={false}
                      isValidDate={disableCustomDt}
                      closeOnSelect={true}
                      onChange={this.handleDateChangeEvent.bind(this)}
                    />
                  </div>
                  <div className="instructions-ranking-pdfs">
                    <div className="instructions-pdf" style={{"width":"100%"}}>
                      <label>Instructions</label>
                      <a href={PUBLIC_URL+"assets/pdf/Betacus_Instructions.pdf"} target="_blank"><img alt="Instructions" src={PUBLIC_IMAGES_URL + 'pdf.jpeg'} title="Instructions" /></a>
                    </div>
                    {/*<div className="ranking-pdf">
                      <label>Rankings</label>
                      <a href={PUBLIC_URL+"assets/pdf/TYP_Rankings.pdf"} target="_blank"><img alt="Rankings" src={PUBLIC_IMAGES_URL + 'pdf.jpeg'} title="Rankings" /></a>
                    </div>*/}
                  </div>
                  {/*<div className="typ-rankings-upload-date-time">
                    <label>Upload Date/Time (EST)</label>
                    <div className='input-group date datetimepicker1'>
                      <input type='text' className="form-control" defaultValue={typRankingsUploadDateTime} />
                      <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                      </span>
                    </div>
                  </div>*/}
                </div>
                <InstructionBox />
              </div>
              <div className="right-content-box pending-tbl">
                {(typeof userBetRsltData != "undefined" && Object.entries(userBetRsltData).length > 0) ?
                <>
                  <div className="result-box ml10">
                    <table className="payouttbl" width="20%" border="1">
                      <tbody>
                        <tr>
                          <td align="center" width="18%">Race</td>
                          <td align="center" width="10%">BetType</td>
                          <td align="center" width="32%">Runners</td>
                          <td align="center" width="10%">Cost</td>
                          <td align="center" width="15%">Payout</td>
                          <td align="center" width="15%">Profit/Loss</td>
                        </tr>
                        {Object.entries(userBetRsltData).sort((a, b) => a > b ? 1:-1).map((usrBet, ubidx) => {
                          let bet_type = '';
                          let bet_amt = 0;
                          let runners = [];
                          let betIndex = 0;
                          let race_id = (typeof usrBet[0] != "undefined")?usrBet[0]:"";
                          let raceBetType = (typeof usrBet[0] != "undefined")?usrBet[0].split('_')[1]:"";
                          let totalAmtPerRace = 0;
                          var totalAmtEarnLoss = 0;
                          var totAmtEarn = 0;
                          var totAmtLoss = 0;
                          var cnt = 1;
                          var perRaceAmt = 0;
                          var firstRaces = [];
                          var scndRaces = [];
                          var thrdRaces = [];
                          var perRaceTrifectaTotEarn = 0;
                          usrBet[1].forEach(function (betrsltrow, index, arr) {
                            bet_type = (typeof betrsltrow.betType != "undefined")?capitalizeFirstLetter(betrsltrow.betType):"";
                            bet_amt = parseFloat(betrsltrow.betAmount);
                            runners += (cnt == 1)?betrsltrow.selectedHorse.val:","+betrsltrow.selectedHorse.val;
                            race_id = (typeof betrsltrow.selectedHorse != "undefined" && typeof betrsltrow.selectedHorse.RaceID != "undefined")?betrsltrow.selectedHorse.RaceID:"";
                            if(typeof betrsltrow.betType != "undefined"){
                              switch(betrsltrow.betType){
                                case "win":
                                  if(typeof betrsltrow.selectedHorse.FinishPosition != "undefined" && betrsltrow.selectedHorse.FinishPosition != null && betrsltrow.selectedHorse.FinishPosition == 1){
                                    totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) + parseFloat(betrsltrow.selectedHorse.Win);  
                                    totAmtEarn = parseFloat(totAmtEarn) + parseFloat(betrsltrow.selectedHorse.Win);  
                                  }else{
                                    totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) - parseFloat(bet_amt);
                                    totAmtLoss = parseFloat(totAmtLoss) + parseFloat(bet_amt);
                                  }
                                  perRaceAmt = parseFloat(perRaceAmt) + bet_amt;
                                  totalBetAmt = parseFloat(totalBetAmt) + parseFloat(bet_amt);
                                break;
                                case "place":
                                  if(typeof betrsltrow.selectedHorse.FinishPosition != "undefined" && betrsltrow.selectedHorse.FinishPosition != null && (betrsltrow.selectedHorse.FinishPosition == 1 || betrsltrow.selectedHorse.FinishPosition == 2)){
                                    totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) + parseFloat(betrsltrow.selectedHorse.Place);  
                                    totAmtEarn = parseFloat(totAmtEarn) + parseFloat(betrsltrow.selectedHorse.Place);  
                                  }else{
                                    totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) - parseFloat(bet_amt);
                                    totAmtLoss = parseFloat(totAmtLoss) + parseFloat(bet_amt);
                                  }
                                  perRaceAmt = parseFloat(perRaceAmt) + bet_amt;
                                  totalBetAmt = parseFloat(totalBetAmt) + parseFloat(bet_amt);
                                break;
                                case "show":
                                  if(typeof betrsltrow.selectedHorse.FinishPosition != "undefined" && betrsltrow.selectedHorse.FinishPosition != null && (betrsltrow.selectedHorse.FinishPosition == 1 || betrsltrow.selectedHorse.FinishPosition == 2 || betrsltrow.selectedHorse.FinishPosition == 3)){
                                    totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) + parseFloat(betrsltrow.selectedHorse.Sho);  
                                    totAmtEarn = parseFloat(totAmtEarn) + parseFloat(betrsltrow.selectedHorse.Sho);  
                                  }else{
                                    totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) - parseFloat(bet_amt);
                                    totAmtLoss = parseFloat(totAmtLoss) + parseFloat(bet_amt);
                                  }
                                  perRaceAmt = parseFloat(perRaceAmt) + bet_amt;
                                  totalBetAmt = parseFloat(totalBetAmt) + parseFloat(bet_amt);
                                break;
                                case "WP":
                                  if(typeof betrsltrow.selectedHorse.FinishPosition != "undefined" && betrsltrow.selectedHorse.FinishPosition != null && (betrsltrow.selectedHorse.FinishPosition == 1 || betrsltrow.selectedHorse.FinishPosition == 2)){
                                    if(typeof betrsltrow.selectedHorse.Win != "undefined" && betrsltrow.selectedHorse.Win != null && betrsltrow.selectedHorse.Win > 0 && betrsltrow.selectedHorse.Win != NaN){
                                      totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) + parseFloat(betrsltrow.selectedHorse.Win);  
                                      totAmtEarn = parseFloat(totAmtEarn) + parseFloat(betrsltrow.selectedHorse.Win);
                                    }
                                    if(typeof betrsltrow.selectedHorse.Place != "undefined" && betrsltrow.selectedHorse.Place != null && betrsltrow.selectedHorse.Place > 0 && betrsltrow.selectedHorse.Place != NaN){
                                      totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) + parseFloat(betrsltrow.selectedHorse.Place);  
                                      totAmtEarn = parseFloat(totAmtEarn) + parseFloat(betrsltrow.selectedHorse.Place);
                                    }
                                  }else{
                                    totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) - parseFloat(parseFloat(bet_amt) * 2);
                                    totAmtLoss = parseFloat(totAmtLoss) + parseFloat(parseFloat(bet_amt) * 2);
                                  }
                                  perRaceAmt = parseFloat(perRaceAmt) + parseFloat(parseFloat(bet_amt) * 2);
                                  totalBetAmt = parseFloat(totalBetAmt) + parseFloat(parseFloat(bet_amt) * 2);
                                break;
                                case "WPS":
                                  if(typeof betrsltrow.selectedHorse.FinishPosition != "undefined" && betrsltrow.selectedHorse.FinishPosition != null && (betrsltrow.selectedHorse.FinishPosition == 1 || betrsltrow.selectedHorse.FinishPosition == 2 || betrsltrow.selectedHorse.FinishPosition == 3)){
                                    if(typeof betrsltrow.selectedHorse.Win != "undefined" && betrsltrow.selectedHorse.Win != null && betrsltrow.selectedHorse.Win > 0 && betrsltrow.selectedHorse.Win != NaN){
                                      totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) + parseFloat(betrsltrow.selectedHorse.Win);  
                                      totAmtEarn = parseFloat(totAmtEarn) + parseFloat(betrsltrow.selectedHorse.Win);
                                    }
                                    if(typeof betrsltrow.selectedHorse.Place != "undefined" && betrsltrow.selectedHorse.Place != null && betrsltrow.selectedHorse.Place > 0 && betrsltrow.selectedHorse.Place != NaN){
                                      totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) + parseFloat(betrsltrow.selectedHorse.Place);  
                                      totAmtEarn = parseFloat(totAmtEarn) + parseFloat(betrsltrow.selectedHorse.Place);
                                    }
                                    if(typeof betrsltrow.selectedHorse.Sho != "undefined" && betrsltrow.selectedHorse.Sho != null && betrsltrow.selectedHorse.Sho > 0 && betrsltrow.selectedHorse.Sho != NaN){
                                      totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) + parseFloat(betrsltrow.selectedHorse.Sho);  
                                      totAmtEarn = parseFloat(totAmtEarn) + parseFloat(betrsltrow.selectedHorse.Sho);  
                                    }
                                  }else{
                                    totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) - parseFloat(parseFloat(bet_amt) * 3);
                                    totAmtLoss = parseFloat(totAmtLoss) + parseFloat(parseFloat(bet_amt) * 3);
                                  }
                                  perRaceAmt = parseFloat(perRaceAmt) + parseFloat(parseFloat(bet_amt) * 3);
                                  totalBetAmt = parseFloat(totalBetAmt) + parseFloat(parseFloat(bet_amt) * 3);
                                break;
                                case "exacta":
                                  var scndRaceTotHrs = 0;
                                  if(typeof userSecondRaceBetRsltData != "undefined" && Object.entries(userSecondRaceBetRsltData).length > 0 && typeof userSecondRaceBetRsltData[race_id+"_"+betrsltrow.betType] != "undefined" && Object.entries(userSecondRaceBetRsltData[race_id+"_"+betrsltrow.betType]).length > 0){
                                    Object.entries(userSecondRaceBetRsltData[race_id+"_"+betrsltrow.betType]).map((usrScndBetRow, usbidx) => {
                                      usrScndBetRow.forEach(function (scndbetrow, index, arr) {
                                        if(typeof scndbetrow != "undefined" && typeof scndbetrow.selectedHorse != "undefined" && typeof scndbetrow.selectedHorse.val != "undefined" && scndbetrow.selectedHorse.val != null && parseInt(scndbetrow.selectedHorse.val) != parseInt(betrsltrow.selectedHorse.val)){
                                          scndRaceTotHrs++;
                                        }
                                      });
                                    });
                                  }
                                  if(typeof betrsltrow.selectedHorse.FinishPosition != "undefined" && betrsltrow.selectedHorse.FinishPosition != null && betrsltrow.selectedHorse.FinishPosition == 1){
                                    totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) + parseFloat(betrsltrow.selectedHorse.Win);  
                                    totAmtEarn = parseFloat(totAmtEarn) + parseFloat(betrsltrow.selectedHorse.Win);  
                                    if(typeof userSecondRaceBetRsltData != "undefined" && Object.entries(userSecondRaceBetRsltData).length > 0 && typeof userSecondRaceBetRsltData[race_id+"_"+betrsltrow.betType] != "undefined" && Object.entries(userSecondRaceBetRsltData[race_id+"_"+betrsltrow.betType]).length > 0){
                                      Object.entries(userSecondRaceBetRsltData[race_id+"_"+betrsltrow.betType]).map((usrScndBet, usbidx) => {
                                        usrScndBet.forEach(function (scndbetrsltrow, index, arr) {
                                          if(typeof scndbetrsltrow != "undefined" && typeof scndbetrsltrow.selectedHorse != "undefined" && typeof scndbetrsltrow.selectedHorse.val != "undefined" && scndbetrsltrow.selectedHorse.val != null && scndbetrsltrow.selectedHorse.val != betrsltrow.selectedHorse.val){
                                            if(typeof scndbetrsltrow != "undefined" && typeof scndbetrsltrow.selectedHorse != "undefined" && typeof scndbetrsltrow.selectedHorse.FinishPosition != "undefined" && scndbetrsltrow.selectedHorse.FinishPosition != null && scndbetrsltrow.selectedHorse.FinishPosition == 2){
                                              totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) + parseFloat(scndbetrsltrow.selectedHorse.Place);  
                                              totAmtEarn = parseFloat(totAmtEarn) + parseFloat(scndbetrsltrow.selectedHorse.Place);  
                                            }else{
                                              totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) - parseFloat(bet_amt);
                                              totAmtLoss = parseFloat(totAmtLoss) + parseFloat(bet_amt);
                                            }
                                          }
                                        });
                                      });
                                    }
                                  }else{
                                    totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) - (parseFloat(parseFloat(bet_amt) * scndRaceTotHrs));
                                    totAmtLoss = parseFloat(totAmtLoss) + (parseFloat(parseFloat(bet_amt) * scndRaceTotHrs));
                                  }
                                  perRaceAmt = parseFloat(perRaceAmt) + (parseFloat(parseFloat(bet_amt) * scndRaceTotHrs));
                                  totalBetAmt = parseFloat(totalBetAmt) + (parseFloat(parseFloat(bet_amt) * scndRaceTotHrs));
                                break;
                                case "trifecta":
                                  firstRaces.push(parseInt(betrsltrow.selectedHorse.val));
                                  if(typeof betrsltrow.selectedHorse.FinishPosition != "undefined" && betrsltrow.selectedHorse.FinishPosition != null && betrsltrow.selectedHorse.FinishPosition == 1){
                                    perRaceTrifectaTotEarn = parseFloat(perRaceTrifectaTotEarn) + parseFloat(betrsltrow.selectedHorse.Win);
                                  }else{
                                    //nothing to do
                                  }
                                break;
                                default:
                                  perRaceAmt = parseFloat(perRaceAmt) + bet_amt;
                                  totalAmtEarnLoss = parseFloat(totalAmtEarnLoss) - parseFloat(bet_amt);
                                  totAmtLoss = parseFloat(totAmtLoss) + parseFloat(bet_amt);
                                  totalBetAmt = parseFloat(totalBetAmt) + parseFloat(bet_amt);
                                break;
                              }
                            }
                            totalAmtPerRace = parseFloat(totAmtEarn) - parseFloat(totAmtLoss);
                            cnt++;
                          });
                          totalProfitLossAmt = parseFloat(totalProfitLossAmt) + parseFloat(totalAmtEarnLoss);
                          if(this.state.submitBet == false || usrBet[1][0].newBet == 0){
                            totPatoutAmt = parseFloat(totPatoutAmt) + parseFloat(totalAmtEarnLoss);
                          }
                          var scndRaceRunners = "";
                          var fsCommonHrs = 0;
                          var slctedBetType = (raceBetType != '')?raceBetType:this.state.betType;
                          if(["exacta","trifecta","superfecta"].indexOf(slctedBetType) != -1){
                            var scndRaceCnt = 1;
                            let scnd_race_id = (typeof usrBet[0] != "undefined")?usrBet[0]:"";
                            if(typeof userSecondRaceBetRsltData != "undefined" && Object.entries(userSecondRaceBetRsltData).length > 0 && typeof userSecondRaceBetRsltData[scnd_race_id] != "undefined" && Object.entries(userSecondRaceBetRsltData[scnd_race_id]).length > 0){
                              Object.entries(userSecondRaceBetRsltData[scnd_race_id]).map((usrScndBetRow, usbidx) => {
                                usrScndBetRow.forEach(function (scndbetrow, index, arr) {
                                  if(typeof scndbetrow.selectedHorse != "undefined" && typeof scndbetrow.selectedHorse.val != "undefined"){
                                    scndRaceRunners += (scndRaceCnt == 1)?" w/ "+scndbetrow.selectedHorse.val:","+scndbetrow.selectedHorse.val;
                                    if(["trifecta"].indexOf(scndbetrow.betType) != -1){
                                      scndRaces.push(parseInt(scndbetrow.selectedHorse.val));
                                      if(typeof firstRaces != "undefined" && firstRaces.indexOf(parseInt(scndbetrow.selectedHorse.val)) != -1){
                                        fsCommonHrs++;
                                      }
                                      if(typeof scndbetrow.selectedHorse.FinishPosition != "undefined" && scndbetrow.selectedHorse.FinishPosition != null && scndbetrow.selectedHorse.FinishPosition == 2){
                                        perRaceTrifectaTotEarn = parseFloat(perRaceTrifectaTotEarn) + parseFloat(scndbetrow.selectedHorse.Place);
                                      }
                                    }
                                    scndRaceCnt++;
                                  }
                                });
                              });
                            }
                          }
                          var thrdRaceRunners = "";
                          var ftCommonHrs = 0;
                          var stCommonHrs = 0;
                          var fstCommonHrs = 0;
                          if(["exacta","trifecta","superfecta"].indexOf(slctedBetType) != -1){
                            var thirdRaceCnt = 1;
                            let third_race_id = (typeof usrBet[0] != "undefined")?usrBet[0]:"";
                            if(typeof userThirdRaceBetRsltData != "undefined" && Object.entries(userThirdRaceBetRsltData).length > 0 && typeof userThirdRaceBetRsltData[third_race_id] != "undefined" && Object.entries(userThirdRaceBetRsltData[third_race_id]).length > 0){
                              Object.entries(userThirdRaceBetRsltData[third_race_id]).map((usrThrdBetRow, usbidx) => {
                                usrThrdBetRow.forEach(function (thrdbetrow, index, arr) {
                                  if(typeof thrdbetrow.selectedHorse != "undefined" && typeof thrdbetrow.selectedHorse.val != "undefined"){
                                    thrdRaceRunners += (thirdRaceCnt == 1)?" w/ "+thrdbetrow.selectedHorse.val:","+thrdbetrow.selectedHorse.val;
                                    if(["trifecta"].indexOf(thrdbetrow.betType) != -1){
                                      thrdRaces.push(parseInt(thrdbetrow.selectedHorse.val));
                                      if(typeof firstRaces != "undefined" && firstRaces.indexOf(parseInt(thrdbetrow.selectedHorse.val)) != -1){
                                        ftCommonHrs++;
                                      }
                                      if(typeof scndRaces != "undefined" && scndRaces.indexOf(parseInt(thrdbetrow.selectedHorse.val)) != -1){
                                        stCommonHrs++;
                                      }
                                      if(typeof firstRaces != "undefined" && firstRaces.indexOf(parseInt(thrdbetrow.selectedHorse.val)) != -1 && typeof scndRaces != "undefined" && scndRaces.indexOf(parseInt(thrdbetrow.selectedHorse.val)) != -1){
                                        fstCommonHrs++;
                                      }
                                      if(typeof thrdbetrow.selectedHorse.FinishPosition != "undefined" && thrdbetrow.selectedHorse.FinishPosition != null && thrdbetrow.selectedHorse.FinishPosition == 3){
                                        perRaceTrifectaTotEarn = parseFloat(perRaceTrifectaTotEarn) + parseFloat(thrdbetrow.selectedHorse.Place);
                                      }
                                    }
                                    thirdRaceCnt++;
                                  }
                                });
                              });
                            }
                          }
                          var perRaceTrifectaTotEarnLoss = 0;
                          if(["trifecta"].indexOf(slctedBetType) != -1){
                            perRaceAmt = (parseInt(firstRaces.length) * parseInt(scndRaces.length) * parseInt(thrdRaces.length)) 
                            - (fsCommonHrs * parseInt(thrdRaces.length)) 
                            - (ftCommonHrs * parseInt(scndRaces.length)) 
                            - (stCommonHrs * parseInt(firstRaces.length)) 
                            + (2 * parseInt(fstCommonHrs));
                            perRaceAmt = perRaceAmt * bet_amt;
                            perRaceTrifectaTotEarnLoss = perRaceTrifectaTotEarn - perRaceAmt;
                            totalBetAmt = totalBetAmt + perRaceAmt;
                            totalProfitLossAmt = totalProfitLossAmt + perRaceTrifectaTotEarnLoss;
                            if(this.state.submitBet == false || usrBet[1][0].newBet == 0){
                              totPatoutAmt = totPatoutAmt + perRaceTrifectaTotEarnLoss;
                              if(perRaceTrifectaTotEarnLoss > 0){
                                totProfitLossAmt = totProfitLossAmt + (perRaceTrifectaTotEarnLoss - perRaceAmt);
                              }else{
                                totProfitLossAmt = totProfitLossAmt + perRaceTrifectaTotEarnLoss;
                              }
                            }
                          }else{
                            if(this.state.submitBet == false || usrBet[1][0].newBet == 0){
                              if(totalAmtEarnLoss > 0){
                                totProfitLossAmt = totProfitLossAmt + (totalAmtEarnLoss - perRaceAmt);
                              }else{
                                totProfitLossAmt = totProfitLossAmt + totalAmtPerRace;
                              }
                            }
                          }
                          return (
                            <tr key={ubidx}>
                              <td align="center">{race_id}</td>
                              <td align="center">{bet_type}</td>
                              <td align="center">{runners+scndRaceRunners+thrdRaceRunners}</td>
                              <td align="center">{"$"+perRaceAmt.toFixed(2)}</td>
                              {(["trifecta"].indexOf(slctedBetType) != -1)?
                                <>
                                  <td align="center"><span className={(this.state.submitBet == false || usrBet[1][0].newBet == 1) ? "dnone": ""}>{(perRaceTrifectaTotEarnLoss > 0)?"+ $"+perRaceTrifectaTotEarnLoss.toFixed(2):"- $"+perRaceTrifectaTotEarnLoss.toFixed(2).slice(1)}</span></td>
                                  <td align="center"><span className={(this.state.submitBet == false || usrBet[1][0].newBet == 1) ? "dnone": ""}>{(perRaceTrifectaTotEarnLoss > 0)?"+ $"+(perRaceTrifectaTotEarnLoss-perRaceAmt).toFixed(2):"- $"+perRaceTrifectaTotEarnLoss.toFixed(2).slice(1)}</span></td>
                                </>
                                :
                                <>
                                  <td align="center"><span className={(this.state.submitBet == false || usrBet[1][0].newBet == 1) ? "dnone": ""}>{(totalAmtEarnLoss > 0)?"+ $"+totalAmtEarnLoss.toFixed(2):"- $"+totalAmtPerRace.toFixed(2).slice(1)}</span></td>
                                  <td align="center"><span className={(this.state.submitBet == false || usrBet[1][0].newBet == 1) ? "dnone": ""}>{(totalAmtEarnLoss > 0)?"+ $"+(totalAmtEarnLoss-perRaceAmt).toFixed(2):"- $"+totalAmtPerRace.toFixed(2).slice(1)}</span></td>
                                </>
                              }
                            </tr>
                          )
                        })
                      }
                      <tr>
                        <td colSpan="3"></td>
                        <td align="center">{"$"+totalBetAmt.toFixed(2)}</td>
                        <td align="center"><span className={this.state.submitBet == false ? "dnone": ""}>{(totPatoutAmt > 0)?"+ $"+totPatoutAmt.toFixed(2):"- $"+totPatoutAmt.toFixed(2).slice(1)}</span></td>
                        <td align="center"><span className={this.state.submitBet == false ? "dnone": ""}>{(totProfitLossAmt > 0)?"+ $"+totProfitLossAmt.toFixed(2):"- $"+totProfitLossAmt.toFixed(2).slice(1)}</span></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="user-bets-result">
                    <button type="button" className="btn btn-primary" onClick={this.submitAllEvent.bind(this)}>Submit</button>
                    <button type="button" className="btn btn-primary" onClick={this.showAllResults.bind(this)}>Results</button>
                  </div>
                </>
              :""}
              </div>
            </div>
            <div className="main-table-wrapper">
              <div className="table-wrapper">
                <FilterBox 
                  betType={betType}
                  betAmount={betAmount}
                  handleBetTypeSelectEvent={this.handleBetTypeSelectEvent} 
                  handleBetAmtSelectEvent={this.handleBetAmtSelectEvent}  
                />
                {(this.state.errMsg != "")?
                  <div className="validate-error" style={{"padding": "0px 0px 15px 30px", fontWeight: "bold"}}>{this.state.errMsg}</div>
                :""}
                {/* remove later
                <div style={{"padding": "10px 10px 10px 3vw", "display": "inline"}}> 
                  <button style={{"color": "black"}} onClick={() => calculateAnyType()}>Calculate Wage</button>
                  {"    "}
                  <div style={{"display": "inline", "fontWeight": "bold", "color":"red"}}>
                    Bet Cost: $<div style={{"display": "inline", "fontWeight": "bold", "color":"red"}} id="resultCalc">0</div>.00
                  </div>
                </div>
                */}
                <div className={"saratoga-block "+totRacesCls}>
                  <div className="group-head-block">
                    <div className="labels grp-hd">
                      <div className={"group-name group-a "+grpATotRacesCls}>Group A</div>
                      <div className={"group-name group-b "+grpBTotRacesCls}>Group B</div>
                    </div>
                    <div className="pivot-tbl">
                      {(Object.entries(aGrpBlocksArr).length > 0) ?
                        Object.entries(aGrpBlocksArr).map((aGrpBlock, agidx) => {
                          return (
                            <span className="child-pivot grp_a" key={agidx}>{(typeof aGrpBlock[1] != "undefined")?aGrpBlock[1]:''}</span>
                          )
                        })
                        : ""
                      }
                      {(Object.entries(bGrpBlocksArr).length > 0) ?
                        Object.entries(bGrpBlocksArr).map((bGrpBlock, bgidx) => {
                          return (
                            <span className="child-pivot grp_b" key={bgidx}>{(typeof bGrpBlock[1] != "undefined")?bGrpBlock[1]:''}</span>
                          )
                        })
                        : ""
                      }
                      {(Object.entries(cGrpBlocksArr).length > 0) ?
                        Object.entries(cGrpBlocksArr).map((cGrpBlock, cgidx) => {
                          return (
                            <span className="child-pivot" key={cgidx}>{(typeof cGrpBlock[1] != "undefined")?cGrpBlock[1]:''}</span>
                          )
                        })
                        : ""
                      }
                    </div>
                  </div>
                  { racesBlock }
                </div>
              </div>
            </div>
            <div className="next-day-button-box">
              <button type="button" className="btn btn-primary" onClick={this.handelNextDayBtnEvent.bind(this)}>Next Day</button>
            </div>
          </div>
          <div id="login-modal" className={"modal "+this.state.showLoginPopup} role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" onClick={this.closeLoginPopup.bind(this)}>&times;</button>
                  <h4 className="modal-title">{(this.state.hideShowLoginRegisterForm == "login")?"Login":"Register"}</h4>
                </div>
                <div className="modal-body">
                {(this.state.hideShowLoginRegisterForm == "login")?
                  <Form ref={c => { this.loginForm = c }} id="loginForm" onSubmit={this.submitLoginForm.bind(this)}>
                    <div className="form-group">
                      <label htmlFor="userName">Username</label>
                      &nbsp;<i className="fa fa-key"></i>
                      <TextField
                        className="form-control"
                        type="text"
                        name="userName"
                        id="userName"
                        value={this.state.userName}
                        placeholder="Enter username or email"
                        validations={[required]}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="userPassword">Password</label>
                      &nbsp;<i className="fa fa-lock"></i>
                      <PasswordField
                        className="form-control"
                        name="userPassword"
                        id="userPassword"
                        value={this.state.userPassword}
                        placeholder="Enter password"
                        validations={[required]}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn btn-danger">Login</button>
                      <div className="validate-error mt10">{this.state.loginErrorMsg}</div>
                    </div>
                  </Form>
                  :
                  <Form ref={c => { this.registerForm = c }} id="registerForm" onSubmit={this.submitRegisterForm.bind(this)}
                        >
                    <div className="form-group">
                      <label htmlFor="userFirstName">First Name</label>
                      <TextField
                        className="form-control"
                        type="text"
                        name="userFirstName"
                        id="userFirstName"
                        value={this.state.userFirstName}
                        placeholder="Enter first name"
                        validations={[required]}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="userLastName">Last Name</label>
                      <TextField
                        className="form-control"
                        type="text"
                        name="userLastName"
                        id="userLastName"
                        value={this.state.userLastName}
                        placeholder="Enter last name"
                        validations={[required]}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="userEmail">Email</label>
                      <EmailField
                        className="form-control"
                        type="email"
                        name="userEmail"
                        id="userEmail"
                        value={this.state.userEmail}
                        placeholder="Enter email"
                        validations={[required, email]}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="userPassword">Password</label>
                      <PasswordField
                        className="form-control"
                        name="userPassword"
                        id="userPassword"
                        value={this.state.userPassword}
                        placeholder="Enter password"
                        validations={[required]}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="userConfirmPassword">Confirm Password</label>
                      <PasswordField
                        className="form-control"
                        name="userConfirmPassword"
                        id="userConfirmPassword"
                        value={this.state.userConfirmPassword}
                        placeholder="Re-enter password"
                        validations={[required]}
                        onChange={this.handleChange.bind(this)}
                      />
                      {userConfirmPasswordErr && <div className="validate-error">{userConfirmPasswordErr}</div>}
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn btn-danger">Register</button>
                      <div className="validate-error mt10">{this.state.registerErrorMsg}</div>
                    </div>
                  </Form>
                }
                </div>
                <div className="modal-footer">
                  {(this.state.hideShowLoginRegisterForm == "login")?<div>Don’t have an account? <a onClick={this.handelRegisterBtnEvent.bind(this)}>Register</a></div>:<div><a onClick={this.handelLoginBtnEvent.bind(this)}>Login</a></div>}
                </div>
              </div>
            </div>
          </div>
          {/*<div id="betresults-modal" className={"modal "+this.state.showBetResultsPopup} role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" onClick={this.closeBetResultsPopup.bind(this)}>&times;</button>
                  <h4 className="modal-title">Bet Results</h4>
                </div>
                <div className="modal-body">
                  <table className="payouttbl" width="100%" border="1">
                    <tbody>
                      <tr>
                        <td align="center" width="11%">Race</td>
                        <td align="center" width="12%">RunnerID</td>
                        <td align="center" width="7%">Win</td>
                        <td align="center" width="7%">Place</td>
                        <td align="center" width="7%">Show</td>
                        <td align="center" width="7%">Exacta</td>
                        <td align="center" width="7%">Trifecta</td>
                        <td align="center" width="7%">Super</td>
                        <td align="center" width="7%">Double</td>
                        <td align="center" width="7%">Pk3</td>
                        <td align="center" width="7%">Pk4</td>
                        <td align="center" width="7%">Pk5</td>
                        <td align="center" width="7%">Pk6</td>
                      </tr>
                      {typeof userBetRsltData != "undefined"?
                        Object.entries(userBetRsltData).sort((a, b) => a > b ? 1:-1).map((betRsltRow, i) => {
                          let race_id = (typeof betRsltRow[0] != "undefined")?betRsltRow[0]:"";
                          return (
                            Object.entries(betRsltRow[1]).map((betrsltrow, idx) => {
                              race_id = (typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.RaceID != "undefined")?betrsltrow[1].selectedHorse.RaceID:"";
                              if(typeof betrsltrow[1].selectedHorse.FinishPosition != "undefined" && betrsltrow[1].selectedHorse.FinishPosition != null && (betrsltrow[1].selectedHorse.FinishPosition == 1 || betrsltrow[1].selectedHorse.FinishPosition == 2 || betrsltrow[1].selectedHorse.FinishPosition == 3)){
                                return (
                                  <tr key={i+"-"+idx}>
                                    <td align="center">{race_id}</td>
                                    <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.val != "undefined")?betrsltrow[1].selectedHorse.val:""}</td>
                                    <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Win != "undefined")?betrsltrow[1].selectedHorse.Win:""}</td>
                                    <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Place != "undefined")?betrsltrow[1].selectedHorse.Place:""}</td>
                                    <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Sho != "undefined")?betrsltrow[1].selectedHorse.Sho:""}</td>
                                    <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Exacta != "undefined")?betrsltrow[1].selectedHorse.Exacta:""}</td>
                                    <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Trifecta != "undefined")?betrsltrow[1].selectedHorse.Trifecta:""}</td>
                                    <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Superfecta != "undefined")?betrsltrow[1].selectedHorse.Superfecta:""}</td>
                                    <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.DD != "undefined")?betrsltrow[1].selectedHorse.DD:""}</td>
                                    <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Pk3 != "undefined")?betrsltrow[1].selectedHorse.Pk3:""}</td>
                                    <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Pk4 != "undefined")?betrsltrow[1].selectedHorse.Pk4:""}</td>
                                    <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Pk5 != "undefined")?betrsltrow[1].selectedHorse.Pk5:""}</td>
                                    <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Pk6 != "undefined")?betrsltrow[1].selectedHorse.Pk6:""}</td>
                                  </tr>
                                )
                              }
                            })
                          )
                        })
                      :""
                    }
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>
          <div id="allresults-modal" className={"modal "+this.state.showAllResultsPopup} role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" onClick={this.closeAllResultsPopup.bind(this)}>&times;</button>
                  <h4 className="modal-title">All Results</h4>
                </div>
                <div className="modal-body">
                  <table className="payouttbl" width="100%" border="1">
                    <tbody>
                      <tr>
                        <td align="center" width="11%">Race</td>
                        <td align="center" width="12%">RunnerID</td>
                        <td align="center" width="7%">Win</td>
                        <td align="center" width="7%">Place</td>
                        <td align="center" width="7%">Show</td>
                        <td align="center" width="7%">Exacta</td>
                        <td align="center" width="7%">Trifecta</td>
                        <td align="center" width="7%">Super</td>
                        <td align="center" width="7%">Double</td>
                        <td align="center" width="7%">Pk3</td>
                        <td align="center" width="7%">Pk4</td>
                        <td align="center" width="7%">Pk5</td>
                        <td align="center" width="7%">Pk6</td>
                      </tr>
                      {typeof userBetRsltData != "undefined"?
                        Object.entries(userBetRsltData).sort((a, b) => a > b ? 1:-1).map((betRsltRow, i) => {
                          let race_id = (typeof betRsltRow[0] != "undefined")?betRsltRow[0]:"";
                          return (
                            Object.entries(betRsltRow[1]).map((betrsltrow, idx) => {
                              race_id = (typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.RaceID != "undefined")?betrsltrow[1].selectedHorse.RaceID:"";
                              return (
                                <tr key={i+"-"+idx}>
                                  <td align="center">{race_id}</td>
                                  <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.val != "undefined")?betrsltrow[1].selectedHorse.val:""}</td>
                                  <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Win != "undefined")?betrsltrow[1].selectedHorse.Win:""}</td>
                                  <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Place != "undefined")?betrsltrow[1].selectedHorse.Place:""}</td>
                                  <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Sho != "undefined")?betrsltrow[1].selectedHorse.Sho:""}</td>
                                  <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Exacta != "undefined")?betrsltrow[1].selectedHorse.Exacta:""}</td>
                                  <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Trifecta != "undefined")?betrsltrow[1].selectedHorse.Trifecta:""}</td>
                                  <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Superfecta != "undefined")?betrsltrow[1].selectedHorse.Superfecta:""}</td>
                                  <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.DD != "undefined")?betrsltrow[1].selectedHorse.DD:""}</td>
                                  <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Pk3 != "undefined")?betrsltrow[1].selectedHorse.Pk3:""}</td>
                                  <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Pk4 != "undefined")?betrsltrow[1].selectedHorse.Pk4:""}</td>
                                  <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Pk5 != "undefined")?betrsltrow[1].selectedHorse.Pk5:""}</td>
                                  <td align="center">{(typeof betrsltrow[1].selectedHorse != "undefined" && typeof betrsltrow[1].selectedHorse.Pk6 != "undefined")?betrsltrow[1].selectedHorse.Pk6:""}</td>
                                </tr>
                              )
                            })
                          )
                        })
                      :""
                    }
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>*/ }
        </Layout>
      </>
    );
  }
}
export default Home;