import { type AlertOptions, alertController } from '@ionic/vue';

export const showAlert = async (message: string, options?: AlertOptions) => {
  const alert = await alertController.create({
    ...options,
    message,
    buttons: ['확인'],
  });
  await alert.present();
  return alert.onDidDismiss();
};
