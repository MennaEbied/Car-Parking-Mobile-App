import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  // Dummy user data
  const user = {
    name: 'MME',
    email: 'mme@gmail.com',
    phone: '+20 123 456 7890',
    password: '********'
  };
  const profileSections = [
    { title: 'Name', value: user.name, icon: 'person' },
    { title: 'Email', value: user.email, icon: 'email' },
    { title: 'Phone Number', value: user.phone, icon: 'phone' },
    { title: 'Password', value: user.password, icon: 'lock' },
  ];
  const actionButtons = [
    { title: 'Change Password', icon: 'vpn-key' },
    { title: 'Privacy Policy', icon: 'policy' },
    { title: 'Log Out', icon: 'logout', color: 'red' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="account-circle" size={80} color="#4A90E2" />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.section}>
        {profileSections.map((item, index) => (
          <View key={index} style={styles.infoItem}>
            <Icon name={item.icon} size={24} color="#666" style={styles.icon} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>{item.title}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        {actionButtons.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.button}
            onPress={() => {/* Add navigation here */}}
          >
            <Icon 
              name={item.icon} 
              size={24} 
              color={item.color || '#666'} 
              style={styles.icon} 
            />
            <Text style={[styles.buttonText, { color: item.color || '#333' }]}>
              {item.title}
            </Text>
            <Icon name="chevron-right" size={24} color="#999" style={styles.arrow} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoText: {
    flex: 1,
    marginLeft: 15,
  },
  infoTitle: {
    color: '#999',
    fontSize: 14,
  },
  infoValue: {
    color: '#333',
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  icon: {
    width: 30,
  },
  arrow: {
    marginLeft: 'auto',
  },
});

export default ProfileScreen;