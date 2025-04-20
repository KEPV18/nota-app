import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, colors } from '../styles/globalStyles';
import { getLinkPreview } from '../utils/linkUtils';

export default function AddLinkScreen() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  const handleAddLink = async () => {
    if (!url) {
      Alert.alert('خطأ', 'الرجاء إدخال الرابط');
      return;
    }

    setLoading(true);
    try {
      const preview = await getLinkPreview(url);
      const linkData = {
        url,
        title: title || preview.title,
        description: description || preview.description,
        favicon: preview.favicon,
        platform: preview.platform,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'links'), linkData);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding link:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء إضافة الرابط');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.form}>
        <Text style={globalStyles.inputLabel}>الرابط *</Text>
        <TextInput
          style={globalStyles.input}
          value={url}
          onChangeText={setUrl}
          placeholder="https://example.com"
          keyboardType="url"
          autoCapitalize="none"
        />

        <Text style={globalStyles.inputLabel}>العنوان</Text>
        <TextInput
          style={globalStyles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="عنوان الرابط (اختياري)"
        />

        <Text style={globalStyles.inputLabel}>الوصف</Text>
        <TextInput
          style={[globalStyles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="وصف الرابط (اختياري)"
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity
        style={[globalStyles.button, styles.button]}
        onPress={handleAddLink}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={globalStyles.buttonText}>إضافة الرابط</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    margin: 16,
  },
});
