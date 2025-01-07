import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {getLocalStorage} from './../service/Storage'

export default function Header() {

    const [user,setUser]=useState();

    useEffect(()=>{
        GetUserDetail();
    },[])
    const GetUserDetail=async()=>{
        const userInfo=await getLocalStorage('userDetail');
        console.log(userInfo);
        setUser(userInfo);
    }
  return (
    <View>
      <Text style={{
        fontSize:25,
        fontFamily:'outfit-Bold'
      }}>Hello {user?.displayName}</Text>
    </View>
  )
}