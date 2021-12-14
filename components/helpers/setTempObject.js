async function setTempObject(tempRacesList) {
  const TempObj = await {
    Win: tempRacesList[raceid][race].Win,
    Place: tempRacesList[raceid][race].Place,
    Sho: tempRacesList[raceid][race].Sho,
    Exacta: tempRacesList[raceid][race].Exacta,
    Trifecta: tempRacesList[raceid][race].Trifecta,
    Superfecta: tempRacesList[raceid][race].Superfecta,
    DD: tempRacesList[raceid][race].DD,
    Pk3: tempRacesList[raceid][race].Pk3,
    Pk4: tempRacesList[raceid][race].Pk4,
    Pk5: tempRacesList[raceid][race].Pk5,
    Pk6: tempRacesList[raceid][race].Pk6,
  };

  return TempObj;
}

export default setTempObject;
