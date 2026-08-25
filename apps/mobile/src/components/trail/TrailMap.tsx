import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TrailNode } from './TrailNode';
import { TreasureChest } from './TreasureChest';
import { colors } from '../../theme';

interface TrailStep {
  id: string;
  icon: string;
  couponsRequired: number;
}

interface TrailMapProps {
  steps: TrailStep[];
  currentCoupons: number;
}

export const TrailMap: React.FC<TrailMapProps> = ({ steps, currentCoupons }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isCompleted = currentCoupons >= step.couponsRequired;
        const isCurrent = currentCoupons < step.couponsRequired && 
                          (index === 0 || currentCoupons >= steps[index - 1].couponsRequired);
        
        let state: 'completed' | 'current' | 'locked' = 'locked';
        if (isCompleted) state = 'completed';
        else if (isCurrent) state = 'current';

        const position = index % 2 === 0 ? 'left' : 'right';

        return (
          <View key={step.id} style={styles.nodeContainer}>
            {/* Draw Path Segment linking to next node */}
            {index < steps.length - 1 && (
              <View style={[
                styles.pathSegment,
                index % 2 === 0 ? styles.pathRight : styles.pathLeft,
                currentCoupons >= steps[index + 1]?.couponsRequired ? styles.pathCompleted : styles.pathLocked
              ]} />
            )}

            <TrailNode 
              id={step.id} 
              icon={step.icon} 
              state={state} 
              position={position} 
            />
          </View>
        );
      })}
      
      {/* Final line to chest */}
      <View style={[
        styles.finalPath,
        currentCoupons >= steps[steps.length - 1].couponsRequired ? styles.pathCompleted : styles.pathLocked
      ]} />
      
      <TreasureChest isUnlocked={currentCoupons >= steps[steps.length - 1].couponsRequired} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    width: '100%',
  },
  nodeContainer: {
    width: '100%',
    height: 100, // Fixed height to space out nodes
    justifyContent: 'center',
  },
  pathSegment: {
    position: 'absolute',
    width: 60,
    height: 100,
    top: 50, // start from middle of current node
    borderBottomWidth: 6,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    zIndex: 1,
  },
  pathRight: {
    borderRightWidth: 6,
    borderBottomRightRadius: 30,
    right: '35%',
  },
  pathLeft: {
    borderLeftWidth: 6,
    borderBottomLeftRadius: 30,
    left: '35%',
  },
  pathCompleted: {
    borderColor: colors.primary,
  },
  pathLocked: {
    borderColor: colors.gray200,
  },
  finalPath: {
    width: 6,
    height: 40,
    backgroundColor: colors.gray200,
    marginTop: -20,
    zIndex: 1,
  }
});
