import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet} from 'react-native';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import tw from 'twrnc';
import TeamRows from './TeamRows.js'

export default function Home(){
  const restLink = new RestLink({ uri: "https://statsapi.web.nhl.com/api/v1/" }); //for graphql
  const [data, setData] = useState(0) //these two lines represent state of the component.
  const [loading, setLoading] = useState(true)

  const client = new ApolloClient({//this is where we query from. Kind of like a pool from pg-promise.
    cache: new InMemoryCache(),
    link: restLink
  });

  const scrollStyles = StyleSheet.create({
    container:{
      justifyContent: 'flex-start',
      flexDirection: 'column'
    }
  })

  const dataQuery = gql`
    query Data{
      standings @rest(type: "Data", path: "standings/"){
        records{
          teamRecords{
            team{
              name
              id
            }
            leagueRecord{
              wins
              losses
              ot
            }
            regulationWins
            goalsAgainst
            goalsScored
            points
          }
        }
      }
    }
  `//actual graphql query

  useEffect(() => {//this code runs one time once the component is mounted.
    async function getData(){
      client.query({ query: dataQuery }).then(response=> {
        //console.log(response.data.standings.records[0].teamRecords)
        setData(response.data.standings)
        setLoading(false)
        //console.log(teams)
      })
    }
    getData();
  },[])
  if(loading){
    return(
      <Text>
        Loading please wait
      </Text>
    )
  }else{
    return (
    <View >
      <View style={tw`p-10 android:pt-2 bg-neutral-300 flex-row border-solid border-b-2 border-neutral-500`}>
        <Text style={tw`text-lg tracking-wide absolute bottom-1 left-1`}>Hey there! Whos your team?</Text>
      </View>
    </View>
	);
  }

}
