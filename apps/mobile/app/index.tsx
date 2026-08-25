import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAuthStore } from '../src/store/authStore';
import { useAppStore } from '../src/store/appStore';
import { colors, spacing } from '../src/theme';
import { ProgressCard } from '../src/components/home/ProgressCard';
import { RecommendationCard } from '../src/components/home/RecommendationCard';
import { PromotionCard } from '../src/components/home/PromotionCard';
import { TrailMap } from '../src/components/trail/TrailMap';

const TRAIL_STEPS = [
  { id: '1', icon: '🏠', couponsRequired: 10 },
  { id: '2', icon: '🌴', couponsRequired: 20 },
  { id: '3', icon: '⭐', couponsRequired: 30 },
  { id: '4', icon: '🏊', couponsRequired: 40 },
  { id: '5', icon: '💎', couponsRequired: 50 },
];

export default function IndexScreen() {
  const user = useAuthStore(state => state.user);
  const fetchData = useAppStore(state => state.fetchData);
  const products = useAppStore(state => state.products);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePromotionPress = () => {};

  const userCoupons = (user as any)?.coupons || 27;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {user?.name ? user.name.split(' ')[0] : 'João'}! 👋</Text>
      </View>
      
      <ProgressCard currentCoupons={userCoupons} targetCoupons={50} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Seu Progresso na Trilha</Text>
        <TrailMap steps={TRAIL_STEPS} currentCoupons={userCoupons} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 Promoções Especiais</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          <PromotionCard 
            title="Kit Verão Limpo" 
            description="Compre 2 cloros e ganhe 1 algicida" 
            discount="30% OFF" 
            onPress={handlePromotionPress} 
          />
          <PromotionCard 
            title="Boias e Lazer" 
            description="Toda a linha de infláveis com desconto" 
            discount="20% OFF" 
            onPress={handlePromotionPress} 
          />
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛍️ Recomendado para Você</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {products.map(product => (
            <RecommendationCard key={product.id} product={product} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sand,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.primary,
    paddingTop: spacing.xl,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  section: {
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  horizontalScroll: {
    paddingHorizontal: spacing.md,
  }
});
