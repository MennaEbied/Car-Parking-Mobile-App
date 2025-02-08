import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground} from 'react-native';
import { router } from "expo-router";

const HomePage: React.FC = () => {
  return (
    <ImageBackground
    source={require("../../assets/home-img.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
          />
        </View>
        <Text style={styles.text}>Hello, ....</Text>
         <Pressable onPress={()=> router.push("pages/slots")} >
                    <Text style={styles.buttonText}>Plan parking now</Text>
            </Pressable>
            <View/>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    width:300,
    marginTop:50,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    paddingLeft:15,
    backgroundColor:"white",
  },
  text: {
    fontSize: 25,
    marginBottom:400,
    marginRight:120
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    marginLeft:120,
    marginTop:60
  },
});
export default HomePage;