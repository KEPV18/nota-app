import { StyleSheet } from 'react-native';

// الألوان الرئيسية للتطبيق
export const colors = {
  primary: '#3498db',     // أزرق
  secondary: '#2c3e50',   // أزرق داكن
  accent: '#e74c3c',      // أحمر
  background: '#f5f5f5',  // رمادي فاتح
  card: '#ffffff',        // أبيض
  text: '#2c3e50',        // أزرق داكن للنصوص
  textSecondary: '#7f8c8d', // رمادي للنصوص الثانوية
  border: '#dcdde1',      // رمادي للحدود
  success: '#2ecc71',     // أخضر للنجاح
  warning: '#f39c12',     // برتقالي للتحذير
  error: '#e74c3c',       // أحمر للخطأ
};

// الأنماط العامة المستخدمة في التطبيق
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  textSecondary: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
});