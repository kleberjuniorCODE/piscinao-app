import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { Ticket } from 'lucide-react';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

const LinearGradient = ExpoLinearGradient as any;

interface ProgressCardProps {
  currentCoupons: number;
  targetCoupons: number;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ currentCoupons, targetCoupons }) => {
  const progress = Math.min((currentCoupons / targetCoupons) * 100, 100);
  const remaining = Math.max(targetCoupons - currentCoupons, 0);

  return (
    <LinearGradient
      colors={[colors.white, colors.cream]}
      style={styles.card}
    >
      <View style={styles.header}>
        <Ticket color={colors.primary} size={24} />
        <Text style={styles.title}>Seus Cupons</Text>
      </View>
      
      <View style={styles.countContainer}>
        <Text style={styles.count}>{currentCoupons}</Text>
        <Text style={styles.target}>/{targetCoupons}</Text>
      </View>
      
      <View style={styles.barContainer}>
        <View style={[styles.barFill, { width: `${progress}%` }]} />
      </View>
      
      <Text style={styles.hint}>
        {remaining > 0 
          ? `Faltam ${remaining} cupons para o próximo prêmio!` 
          : 'Parabéns! Você alcançou o prêmio!'}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  count: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.primary,
  },
  target: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textMuted,
    marginLeft: spacing.xs,
  },
  barContainer: {
    height: 12,
    backgroundColor: colors.gray200,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginVertical: spacing.md,
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  hint: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  }
});
