import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuthStore } from '../../src/store/authStore';
import { colors, spacing, borderRadius } from '../../src/theme';
import { User, LogOut } from 'lucide-react';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User color={colors.white} size={40} />
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Meus Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Sobre a Loja</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={logout}>
          <LogOut color={colors.error} size={20} style={{marginRight: 8}} />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    color: colors.gray200,
    fontSize: 16,
  },
  menu: {
    padding: spacing.md,
  },
  menuItem: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  logoutItem: {
    marginTop: spacing.xl,
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: colors.error,
    fontWeight: 'bold',
  }
});
