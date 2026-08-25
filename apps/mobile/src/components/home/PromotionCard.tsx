import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius } from '../../theme';
import { Tag } from 'lucide-react';

const LinearGradient = ExpoLinearGradient as any;

interface PromotionCardProps {
  title: string;
  description: string;
  discount: string;
  onPress: () => void;
}

export const PromotionCard: React.FC<PromotionCardProps> = ({ title, description, discount, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <LinearGradient
        colors={[colors.primaryLight, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.content}>
          <View style={styles.badge}>
            <Tag color={colors.primary} size={14} />
            <Text style={styles.badgeText}>{discount}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    borderRadius: borderRadius.lg,
    marginRight: spacing.md,
    overflow: 'hidden',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  content: {
    padding: spacing.lg,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  badgeText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.cream,
    fontSize: 14,
  }
});
