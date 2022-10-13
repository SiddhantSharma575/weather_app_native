import React, {useState} from 'react';
import {Appbar, Title, TextInput, Button, Card} from 'react-native-paper';
import {View, Text, FlatList} from 'react-native';
import Header from './Header';

const Search = ({navigation}) => {
   const [city, setCity] = useState('');
   const [cities, setCities] = useState([]);
   const fetchCities = text => {
      console.log(text);
      setCity(text);
      fetch(
         'https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=' +
            text +
            '&locationType=city&format=json',
      )
         .then(item => item.json())
         .then(cityData => {
            setCities(cityData.location.address);
         })
         .catch(err => {
            console.log(err.message);
         });
   };

   const btnClick = () => {
      navigation.navigate("home", {
         city : city
      })
   }

   const listCheck = (cityname) => {
      setCity(cityname);
      navigation.navigate("home", {
         city : cityname
      })
   }
   return (
      <View style={{flex: 1}}>
         <Header />
         <TextInput
            label="City Name"
            style={{color: '#00aaff'}}
            value={city}
            onChangeText={text => {
               fetchCities(text);
            }}
         />
         <Button
            mode="contained"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{backgroundColor: '#00aaff', margin: 20}}
            onPress={() => btnClick()}>
            Search
         </Button>
         <FlatList
            data={cities}
            renderItem={({item}) => {
               return (
                  <Card style={{margin: 2, padding: 12}} onPress={() => listCheck(item)}>
                     <Text>{item}</Text>
                  </Card>
               );
            }}
            keyExtractor={item => item}
         />
      </View>
   );
};

export default Search;
