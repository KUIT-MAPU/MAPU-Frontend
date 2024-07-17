import React from "react";
import useKeywordStore from "../../../stores/keywordStore";

const MapList:React.FC = () => {
  const keywordStore = useKeywordStore()
  const selectedList = keywordStore.selectedList;
  
  return <>map</>
}

export default MapList;