import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image} from 'react-native';
import teams, { getTeamId } from "@nhl-api/teams";
import tw from 'twrnc';




export default function TeamRows(){

  //use flatlist.
  return teams.map((team) => {
    if(team.isActive){
      return(
        <View key={team.id} style={tw`bg-[${team.colors[0]}] p-5 w-10`}>
          <Image/>
        </View>
      )
    }
  })
}
