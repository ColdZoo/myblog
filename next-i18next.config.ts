import type { UserConfig } from 'next-i18next';

export const i18nConfig: UserConfig = {
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
};