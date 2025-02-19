import { toastController, type ToastOptions } from '@ionic/vue';

export const showToast = async (message: string, options?: Omit<ToastOptions, 'message'>) => {
  const toast = await toastController.create({
    message,
    duration: 1500,
    position: 'bottom',
    ...options,
  });

  await toast.present();
  return toast.onDidDismiss();
};
