import { Linking } from 'react-native';

export const openWhatsApp = (phone: string, message: string) => {
  const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        console.log('WhatsApp is not installed');
      }
    })
    .catch((err) => console.error('An error occurred', err));
};
