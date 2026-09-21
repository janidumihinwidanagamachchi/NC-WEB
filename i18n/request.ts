import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import * as rootParams from 'next/root-params'
import { routing } from './routing'

export default getRequestConfig(async ({ locale }) => {
  let resolved = locale
  if (!resolved) {
    const paramValue = await rootParams.locale()
    resolved = hasLocale(routing.locales, paramValue) ? paramValue : routing.defaultLocale
  }

  return {
    locale: resolved,
    messages: (await import(`../messages/${resolved}.json`)).default,
    timeZone: 'Asia/Colombo',
    now: new Date(),
  }
})
