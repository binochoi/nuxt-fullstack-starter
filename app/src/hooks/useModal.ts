import { ComponentProps, useModal, UseModalOptions } from "vue-final-modal"

export default <T extends Component>(options: UseModalOptions<T>) => {
  const modal = useModal({
    ...options,
    attrs: {
      ...options.attrs,
      onClose: () => {
        options.attrs?.onClose?.();
        modal.close();
      }
    } as ComponentProps<T>,
  });
  return modal;
}