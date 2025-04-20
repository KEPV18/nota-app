import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { globalStyles, colors } from '../styles/globalStyles';
import { getFavicon } from '../utils/linkUtils';

const HomeScreen = ({ navigation }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'links'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const linksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLinks(linksData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderLinkItem = ({ item }) => (
    <TouchableOpacity
      style={[globalStyles.card, styles.card]}
      onPress={() => navigation.navigate('LinkDetails', { link: item })}
    >
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: getFavicon(item.url) }}
          style={styles.favicon}
        />
        <Text style={[globalStyles.subtitle, styles.title]} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      <Text style={[globalStyles.text, styles.description]} numberOfLines={2}>
        {item.description}
      </Text>
      <Text style={[globalStyles.textSecondary, styles.url]} numberOfLines={1}>
        {item.url}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[globalStyles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      {links.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[globalStyles.title, styles.emptyTitle]}>
            لا توجد روابط محفوظة
          </Text>
          <Text style={[globalStyles.text, styles.emptyText]}>
            اضغط على زر الإضافة لحفظ رابط جديد
          </Text>
        </View>
      ) : (
        <FlatList
          data={links}
          renderItem={renderLinkItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  favicon: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 4,
  },
  title: {
    flex: 1,
  },
  description: {
    marginBottom: 8,
  },
  url: {
    fontSize: 12,
  },
});

export default HomeScreen;