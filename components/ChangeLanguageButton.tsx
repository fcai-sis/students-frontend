'use client'

import { LanguageIcon } from './icons';
import { useChangeLocale, useCurrentLocale } from '../locales/client';

export default function ChangeLanguageButton() {
  const changeLocale = useChangeLocale()
  const locale = useCurrentLocale()

  const to = locale === 'ar' ? 'en' : 'ar';
  const position = locale === 'ar' ? 'left-6 bottom-6' : 'right-6 bottom-6';

  return (
    <button
      onClick={() => changeLocale(to)}
      className={`flex items-center gap-2 fixed ${position} p-4 rounded-lg bg-slate-50 text-slate-400 shadow-md hover:shadow-lg active:shadow-none active:bg-slate-200 outline-none`}
    >
      {locale === 'ar' ? 'English' : 'العربية'}
      <LanguageIcon className='stroke-slate-400' />
    </button>
  )
}
