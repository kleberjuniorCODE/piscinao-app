import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppStore } from '../../src/store/appStore';
import { colors, spacing, borderRadius } from '../../src/theme';
import { formatCurrency } from '../../src/utils/format';
import { openWhatsApp } from '../../src/utils/whatsapp';
import { ArrowLeft } from 'lucide-react';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = useAppStore(state => state.products.find(p => p.id === id));

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  const handleBuy = () => {
    const message = `Olá! Tenho interesse no produto ${product.name} no valor de ${formatCurrency(product.price)}.`;
    openWhatsApp('5518999999999', message);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft color={colors.white} size={24} />
      </TouchableOpacity>
      
      <View style={styles.imagePlaceholder} />
      
      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
          <Text style={styles.buyButtonText}>Comprar pelo WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sand,
  },
  backButton: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.md,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: spacing.xs,
    borderRadius: borderRadius.full,
  },
  imagePlaceholder: {
    height: 300,
    backgroundColor: colors.gray300,
  },
  content: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    marginTop: -spacing.lg,
  },
  category: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  price: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: spacing.xl,
  },
  descriptionContainer: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 16,
    color: colors.textMuted,
    lineHeight: 24,
  },
  buyButton: {
    backgroundColor: colors.success,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  buyButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  }
});
