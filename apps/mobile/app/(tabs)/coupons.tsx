import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAuthStore } from '../../src/store/authStore';
import { useAppStore } from '../../src/store/appStore';
import { colors, spacing, borderRadius } from '../../src/theme';
import { formatDate, formatCurrency } from '../../src/utils/format';
import { Ticket } from 'lucide-react';

export default function CouponsScreen() {
  const user = useAuthStore(state => state.user);
  const purchases = useAppStore(state => state.purchases);

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Ticket color={colors.white} size={32} />
        <Text style={styles.headerTitle}>Total de Cupons</Text>
        <Text style={styles.headerCount}>{user?.coupons || 0}</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Histórico de Compras</Text>
      <FlatList
        data={purchases}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.purchaseCard}>
            <View style={styles.purchaseInfo}>
              <Text style={styles.purchaseDate}>{formatDate(item.date)}</Text>
              <Text style={styles.purchaseItems}>{item.items.join(', ')}</Text>
              <Text style={styles.purchaseAmount}>{formatCurrency(item.amount)}</Text>
            </View>
            <View style={styles.couponEarned}>
              <Text style={styles.couponText}>+{item.couponsEarned}</Text>
              <Ticket color={colors.primary} size={16} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sand,
    padding: spacing.md,
  },
  headerCard: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    marginTop: spacing.sm,
  },
  headerCount: {
    color: colors.gold,
    fontSize: 48,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  purchaseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  purchaseInfo: {
    flex: 1,
  },
  purchaseDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  purchaseItems: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginVertical: spacing.xs,
  },
  purchaseAmount: {
    fontSize: 14,
    color: colors.primary,
  },
  couponEarned: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cream,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
  },
  couponText: {
    color: colors.primary,
    fontWeight: 'bold',
    marginRight: spacing.xs,
  }
});
