import { trackEvent } from '@/lib/tracking'

export const analyticEvents = {
  toggleTabs(): void {
    trackEvent({
      category: 'Funnel Apartments',
      name: 'Clicked My funds',
      label: 'My funds',
    })
  },
  contribution(): void {
    trackEvent({
      category: 'Funnel Apartments',
      name: 'Clicked Fill in the down payment',
      label: 'Fill in the down payment',
    })
  },
  contributionOnClickMinus(): void {
    trackEvent({
      category: 'Funnel Apartments',
      name: 'Clicked Down payment Minus',
      label: 'Down payment Minus',
    })
  },
  contributionOnClickPlus(): void {
    trackEvent({
      category: 'Funnel Apartments',
      name: 'Clicked Down Payment Plus',
      label: 'Down Payment Plus',
    })
  },
  time(): void {
    trackEvent({
      category: 'Funnel Apartments',
      name: 'Clicked Loan Term',
      label: 'Loan Term',
    })
  },
  timeOnClickMinus(): void {
    trackEvent({
      category: 'Funnel Apartments',
      name: 'Clicked Loan Term Minus',
      label: 'Loan Term Minus',
    })
  },
  timeOnClickPlus(): void {
    trackEvent({
      category: 'Funnel Apartments',
      name: 'Clicked Loan Term Plus',
      label: 'Loan Term Plus',
    })
  },
  paymentOnClickMinus(): void {
    trackEvent({
      category: 'Funnel Apartments',
      name: 'Clicked Monthly payment Minus',
      label: 'Monthly payment Minus',
    })
  },
  paymentOnClickPlus(): void {
    trackEvent({
      category: 'Funnel Apartments',
      name: 'Clicked Monthly Payment Plus',
      label: 'Monthly Payment Plus',
    })
  },
}
