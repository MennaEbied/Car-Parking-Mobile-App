import React,{useState} from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground} from 'react-native';
import { router } from "expo-router";

const HomePage: React.FC = () => {
  const [, setSearchQuery] = useState('');
  return (
    <ImageBackground
    source={require("../../assets/home.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, User!</Text>
        <Text style={styles.subtitle}>Find your perfect parking spot</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search parking slot"
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <View >
        <Pressable 
        onPress={()=> router.push("pages/slots")}
        style ={styles.button}> 
        <Text style ={styles.buttontext}> Book now</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',
  },
  header: {
    padding: 35,
    marginBottom:400
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 30,
  },
  searchContainer: {
    width:300,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    fontSize: 16,
    color: '#2D3436',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
  marginLeft:160,
  },
  buttontext:{
    color:"white",
    fontSize:19,
  },
});
export default HomePage;