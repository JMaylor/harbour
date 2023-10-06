import type { Notification } from '@nuxt/ui/dist/runtime/types'

type ToastArgs = Partial<Omit<Notification, 'icon' | 'color'>>

export function useErrorToast(args: ToastArgs) {
  useToast().add({
    color: 'red',
    icon: 'i-heroicons-x-circle',
    ...args,
  })
}

export function useSuccessToast(args: ToastArgs) {
  useToast().add({
    color: 'green',
    icon: 'i-heroicons-check-circle',
    ...args,
  })
}
