import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ItemDetailsScreen({ route }) {
  const { item } = route.params;
  
  const handleOpen = async () => {
    if (item.type === 'phone') {
      await Linking.openURL(`tel:${item.content}`);
    } else {
      await Linking.openURL(item.content);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {item.type === 'link' && (
          <Image 
            source={{ uri: `https://logo.clearbit.com/${new URL(item.content).hostname}` }}
            style={styles.logo}
          />
        )}
        <Text style={styles.title}>{item.title}</Text>
      </View>
      
      <Text style={styles.description}>{item.description}</Text>
      
      <TouchableOpacity style={styles.openButton} onPress={handleOpen}>
        <MaterialIcons name={item.type === 'phone' ? 'phone' : 'open-in-new'} size={24} color="white" />
        <Text style={styles.buttonText}>
          {item.type === 'phone' ? 'اتصال' : 'فتح'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
  },
  openButton: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});