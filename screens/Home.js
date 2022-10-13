import React, {useState, useEffect} from 'react'
import {Appbar, Title, TextInput, Button, Card} from 'react-native-paper'
import {View, Text, FlatList, Image} from 'react-native'
import Header from './Header'

const Home = props => {
   const [info, setInfo] = useState({
      name: 'loading',
      temp: 'loading',
      humdidity: 'loading',
      desc: 'loading',
      icon: 'loading',
   })

   useEffect(() => {
      getWeather()
   }, [])

   const getWeather = () => {
      let mycity;
      const {city} = props.route.params;
      mycity = city;
      fetch(
         `https://api.openweathermap.org/data/2.5/weather?q=${mycity}&appid=2f307f361343f471569db6cada2071fe`,
      )
         .then(data => data.json())
         .then(results => {
            setInfo({
               name: results.name,
               temp: results.main.temp,
               humdidity: results.main.humidity,
               desc: results.weather[0].description,
               icon: results.weather[0].icon,
            })
         })
   }

   if(props.route.params.city !== "indore"){
      getWeather()
   }

   return (
      <>
         <View style={{flex: 1}}>
            <Header />
            <View style={{alignItems: 'center'}}>
               <Title style={{color: '#00aaff', marginTop: 30, fontSize: 30}}>
                  {info.name}
               </Title>
               <Image
                  style={{
                     width: 120,
                     height: 120,
                  }}
                  source={{
                     uri:
                        'https://openweathermap.org/img/w/' +
                        info.icon +
                        '.png',
                  }}
               />
            </View>

            <Card style={{margin: 5, padding: 12}}>
               <Title style={{color: '#00aaff'}}>
                  Temperature : {info.temp}
               </Title>
            </Card>
            <Card style={{margin: 5, padding: 12}}>
               <Title style={{color: '#00aaff'}}>
                  Humidity : {info.humdidity}
               </Title>
            </Card>
            <Card style={{margin: 5, padding: 12}}>
               <Title style={{color: '#00aaff'}}>
                  Description : {info.desc}
               </Title>
            </Card>
         </View>
      </>
   )
}

export default Home
