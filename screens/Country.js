import React, { useState, useEffect } from 'react'
import { Appbar, Title, TextInput, Button, Card } from 'react-native-paper'
import { View, Text, FlatList, Image } from 'react-native'
import Header from './Header'

const Country = ({ navigation }) => {
    const [countryName, setCountryName] = useState('')
    const [countryData, setCountryData] = useState(null)
    const [capitalName, setCapitalName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const btnClick = () => {
        setLoading(true)
        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
            .then(item => item.json())
            .then(cData => {
                if (cData.status === 404 || cData.message === "Not Found") {
                    setError('404! Not Found')
                    setLoading(false)
                    return;
                }
                setCountryData(cData)
                setCapitalName(cData[0].capital[0])
                setLoading(false)
                setError('')
            })
            .catch(err => {
                setCountryData(null)
                setLoading(false)
                setError('Country Not Found')
            })
    }

    const handleCapWeather = () => {
        navigation.navigate('home', {
            city: capitalName,
        })
    }
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <TextInput
                label="Enter Country Name"
                style={{ color: '#00aaff' }}
                value={countryName}
                onChangeText={text => {
                    setCountryName(text);
                    setLoading(false);
                    setCountryData(null);
                    setError("")
                }}
            />
            <Button
                mode="contained"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ backgroundColor: '#00aaff', margin: 20 }}
                onPress={() => btnClick()}>
                Search
            </Button>

            {loading && <Text>Loading...</Text>}
            {error !== '' && <Text>{error}</Text>}

            {countryData !== null && (
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={{
                            width: 120,
                            height: 120,
                        }}
                        source={{
                            uri: countryData[0]?.flags?.png,
                        }}
                    />
                    <Title>Name : {countryData[0].name.common}</Title>
                    <Title>Capital : {countryData[0].capital[0]}</Title>
                    <Title>Pop : {countryData[0].population}</Title>
                    <Title>
                        Lat/Lang : {countryData[0].latlng[0]} ,
                        {countryData[0].latlng[1]}
                    </Title>
                    <Button
                        mode="contained"
                        style={{ backgroundColor: '#00aaff', margin: 20 }}
                        onPress={() => handleCapWeather()}>
                        Get Capital Weather
                    </Button>
                </View>
            )}
        </View>
    )
}

export default Country
