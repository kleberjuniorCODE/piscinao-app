import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface TreasureChestProps {
  isUnlocked: boolean;
}

export const TreasureChest: React.FC<TreasureChestProps> = ({ isUnlocked }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.glow, !isUnlocked && styles.glowLocked]} />
      <View style={styles.chestContainer}>
        <Text style={styles.chestIcon}>🏆</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: 120,
  },
  chestContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.white,
    borderWidth: 4,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 10,
  },
  chestIcon: {
    fontSize: 48,
  },
  glow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.gold,
    opacity: 0.5,
  },
  glowLocked: {
    backgroundColor: colors.gray300,
    opacity: 0.2,
  }
});
