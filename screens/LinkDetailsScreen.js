import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Share,
  Alert,
} from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { globalStyles, colors } from '../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';

const LinkDetailsScreen = ({ route, navigation }) => {
  const { link } = route.params;

  const handleOpenLink = async () => {
    try {
      const supported = await Linking.canOpenURL(link.url);
      if (supported) {
        await Linking.openURL(link.url);
      } else {
        Alert.alert('خطأ', 'لا يمكن فتح هذا الرابط');
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء فتح الرابط');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${link.title}\n${link.url}\n\n${link.description || ''}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'حذف الرابط',
      'هل أنت متأكد من حذف هذا الرابط؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'links', link.id));
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting link:', error);
              Alert.alert('خطأ', 'حدث خطأ أثناء حذف الرابط');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.card, styles.card]}>
        <View style={styles.header}>
          <Image
            source={{ uri: link.favicon }}
            style={styles.favicon}
          />
          <Text style={[globalStyles.title, styles.title]}>{link.title}</Text>
        </View>

        <Text style={[globalStyles.text, styles.description]}>
          {link.description}
        </Text>

        <Text style={[globalStyles.textSecondary, styles.url]} numberOfLines={1}>
          {link.url}
        </Text>

        <View style={styles.platformContainer}>
          <MaterialIcons
            name={getPlatformIcon(link.platform)}
            size={24}
            color={colors.primary}
          />
          <Text style={[globalStyles.text, styles.platform]}>
            {getPlatformName(link.platform)}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[globalStyles.button, styles.actionButton]}
          onPress={handleOpenLink}
        >
          <MaterialIcons name="open-in-new" size={24} color="white" />
          <Text style={globalStyles.buttonText}>فتح الرابط</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.button, styles.actionButton, styles.shareButton]}
          onPress={handleShare}
        >
          <MaterialIcons name="share" size={24} color="white" />
          <Text style={globalStyles.buttonText}>مشاركة</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.button, styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <MaterialIcons name="delete" size={24} color="white" />
          <Text style={globalStyles.buttonText}>حذف</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getPlatformIcon = (platform) => {
  switch (platform) {
    case 'youtube':
      return 'youtube';
    case 'twitter':
      return 'twitter';
    case 'facebook':
      return 'facebook';
    case 'instagram':
      return 'instagram';
    case 'linkedin':
      return 'linkedin';
    default:
      return 'link';
  }
};

const getPlatformName = (platform) => {
  switch (platform) {
    case 'youtube':
      return 'يوتيوب';
    case 'twitter':
      return 'تويتر';
    case 'facebook':
      return 'فيسبوك';
    case 'instagram':
      return 'إنستغرام';
    case 'linkedin':
      return 'لينكد إن';
    default:
      return 'موقع إلكتروني';
  }
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  favicon: {
    width: 32,
    height: 32,
    marginRight: 12,
    borderRadius: 4,
  },
  title: {
    flex: 1,
  },
  description: {
    marginBottom: 16,
  },
  url: {
    marginBottom: 16,
  },
  platformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platform: {
    marginLeft: 8,
  },
  actions: {
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  shareButton: {
    backgroundColor: colors.secondary,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
});

export default LinkDetailsScreen;