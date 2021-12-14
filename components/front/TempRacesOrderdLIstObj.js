const TempRacesOrderedListObject = (props) => {
  return {
    Win: props.tmpRacesList[raceid][race].Win,
    Place: props.tmpRacesList[raceid][race].Place,
    Sho: props.tmpRacesList[raceid][race].Sho,
    Exacta: props.tmpRacesList[raceid][race].Exacta,
    Trifecta: props.tmpRacesList[raceid][race].Trifecta,
    Superfecta: props.tmpRacesList[raceid][race].Superfecta,
    DD: props.tmpRacesList[raceid][race].DD,
    Pk3: props.tmpRacesList[raceid][race].Pk3,
    Pk4: props.tmpRacesList[raceid][race].Pk4,
    Pk5: props.tmpRacesList[raceid][race].Pk5,
    Pk6: props.tmpRacesList[raceid][race].Pk6,
  };
};

export default TempRacesOrderedListObject;