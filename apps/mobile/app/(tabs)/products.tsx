import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../src/store/appStore';
import { colors, spacing, borderRadius } from '../../src/theme';
import { formatCurrency } from '../../src/utils/format';

export default function ProductsScreen() {
  const products = useAppStore(state => state.products);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push(`/product/${item.id}`)}
          >
            <View style={styles.imagePlaceholder} />
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.price}>{formatCurrency(item.price)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sand,
  },
  listContainer: {
    padding: spacing.sm,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    margin: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: colors.gray200,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  category: {
    fontSize: 12,
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  price: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  }
});
