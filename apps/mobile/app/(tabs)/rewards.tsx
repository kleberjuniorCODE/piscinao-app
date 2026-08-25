import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppStore } from '../../src/store/appStore';
import { useAuthStore } from '../../src/store/authStore';
import { colors, spacing, borderRadius } from '../../src/theme';
import { Gift, CheckCircle } from 'lucide-react';

export default function RewardsScreen() {
  const rewards = useAppStore(state => state.rewards);
  const user = useAuthStore(state => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Gift color={colors.gold} size={48} />
        <Text style={styles.headerTitle}>Suas Recompensas</Text>
      </View>
      <FlatList
        data={rewards}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const canAfford = (user?.coupons || 0) >= item.cost;
          return (
            <View style={[styles.card, item.isClaimed && styles.cardClaimed]}>
              <View style={styles.cardInfo}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.cost}>{item.cost} Cupons</Text>
              </View>
              <View style={styles.status}>
                {item.isClaimed ? (
                  <CheckCircle color={colors.success} size={24} />
                ) : (
                  <View style={[styles.badge, canAfford && styles.badgeActive]}>
                    <Text style={styles.badgeText}>Resgatar</Text>
                  </View>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sand,
  },
  header: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: spacing.md,
  },
  list: {
    padding: spacing.md,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  cardClaimed: {
    opacity: 0.7,
  },
  cardInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    marginVertical: spacing.xs,
  },
  cost: {
    fontSize: 14,
    color: colors.gold,
    fontWeight: 'bold',
  },
  status: {
    marginLeft: spacing.md,
  },
  badge: {
    backgroundColor: colors.gray200,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  badgeActive: {
    backgroundColor: colors.primary,
  },
  badgeText: {
    color: colors.white,
    fontWeight: 'bold',
  }
});
