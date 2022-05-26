import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Image, ScrollView } from 'react-native';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import teams, { getTeamId } from "@nhl-api/teams";

export default function Home(){
  const restLink = new RestLink({ uri: "https://statsapi.web.nhl.com/api/v1/" });
  const [data, setData] = useState(0)
  const [loading, setLoading] = useState(true)

  const client = new ApolloClient({//this is where we query from. Kind of like a pool from pg-promise.
    cache: new InMemoryCache(),
    link: restLink
  });

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
  `
  useEffect(() => {
    async function getData(){
      client.query({ query: dataQuery }).then(response=> {
        console.log(response.data.standings.records[0].teamRecords)
        setData(response.data.standings)
        setLoading(false)
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
    return(
      null
    )
  }
}
