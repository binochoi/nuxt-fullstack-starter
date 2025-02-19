import { type AlertOptions, alertController } from '@ionic/vue';

export const showConfirm = (message: string, options?: AlertOptions) => new Promise(async (resolve, reject) => {
  const alert = await alertController.create({
    ...options,
    message,
    buttons: [
      {
        text: '취소',
        handler: () => reject(),
      },
      {
        text: '확인',
        handler: () => resolve(true),
      },
    ],
  });
  await alert.present();
});
