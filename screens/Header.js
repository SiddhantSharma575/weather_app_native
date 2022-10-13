import * as React from 'react';
import {Appbar, Title} from 'react-native-paper';
import {View, Text} from 'react-native';

const Header = () => {
  return (
    <Appbar.Header
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: '#00aaff',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      {/* // eslint-disable-next-line react-native/no-inline-styles */}
      <Title style={{color: 'white'}}>Weather App</Title>
    </Appbar.Header>
  );
};

export default Header;
