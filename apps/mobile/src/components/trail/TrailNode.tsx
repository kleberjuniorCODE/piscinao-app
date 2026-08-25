import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react';
import { colors } from '../../theme';

interface TrailNodeProps {
  id: string | number;
  icon: string;
  state: 'completed' | 'current' | 'locked';
  position: 'left' | 'right' | 'center';
}

export const TrailNode: React.FC<TrailNodeProps> = ({ icon, state, position }) => {
  const getContainerStyle = () => {
    switch (state) {
      case 'completed':
        return styles.completed;
      case 'current':
        return styles.current;
      case 'locked':
      default:
        return styles.locked;
    }
  };

  const getPositionStyle = () => {
    switch (position) {
      case 'left': return { alignSelf: 'flex-start', marginLeft: 40 } as const;
      case 'right': return { alignSelf: 'flex-end', marginRight: 40 } as const;
      case 'center':
      default:
        return { alignSelf: 'center' } as const;
    }
  };

  return (
    <View style={[styles.wrapper, getPositionStyle()]}>
      {state === 'current' && <View style={styles.pulse} />}
      <View style={[styles.node, getContainerStyle()]}>
        {state === 'completed' ? (
          <Check color={colors.white} size={28} />
        ) : (
          <Text style={styles.icon}>{icon}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    marginVertical: 15,
  },
  pulse: {
    position: 'absolute',
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.goldLight,
    borderWidth: 2,
    borderColor: colors.gold,
    opacity: 0.6,
  },
  node: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  completed: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  current: {
    backgroundColor: colors.white,
    borderColor: colors.gold,
  },
  locked: {
    backgroundColor: colors.gray200,
    borderColor: colors.gray300,
  },
  icon: {
    fontSize: 24,
  }
});
