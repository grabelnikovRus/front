import { ValidationErrors } from 'final-form'

import { trackEvent, categoryForAnalytic } from '@/lib/tracking'

const funnelCategory = () => categoryForAnalytic(location.pathname, 'Funnel ')

export const analyticEvents = {
  address(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Change address',
      label: 'Address',
    })
  },
  objectType(value: string): void {
    trackEvent({
      category: funnelCategory(),
      name:
        value === 'apartment'
          ? 'Selected object type Apartments'
          : 'Selected object type Kvartira',
      label: value === 'apartment' ? 'Object type Apartments' : 'Object type Kvartira',
    })
  },
  roomType(value: string): void {
    trackEvent({
      category: funnelCategory(),
      name: `Chosed the Number of ${value === '0' ? 'Studio' : `Rooms ${value}`}`,
      label: `Number of Rooms ${value === '0' ? 'Studio' : value}`,
    })
  },
  area(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Indicated the Area of ​​​​the Apartment',
      label: 'Area of ​​​​the Apartment',
    })
  },
  floor(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Indicated the Number of Storeys',
      label: 'Number of Storeys',
    })
  },
  isInOperation(value: string): void {
    trackEvent({
      category: funnelCategory(),
      name: value === 'true' ? 'Is the House Rented out? Yes' : 'Is the House Rented out? No',
      label: value === 'true' ? 'House Rented out? Yes' : 'House Rented out? No',
    })
  },
  isOwnership(value: string): void {
    trackEvent({
      category: funnelCategory(),
      name: value === 'true' ? 'Chosed Ownership Yes' : 'Chosed Ownership No',
      label: value === 'true' ? 'Ownership Yes' : 'Ownership No',
    })
  },
  isTransferAcceptanceCertificate(value: string): void {
    trackEvent({
      category: funnelCategory(),
      name: value === 'true' ? 'Chosed Act signed Yes' : 'Chosed Act signed No',
      label: value === 'true' ? 'Act signed Yes' : 'Act signed No',
    })
  },
  price(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Filled in the Desired Price',
      label: 'Desired Price',
    })
  },
  renovationType(value: string): void {
    const label =
      value === 'none'
        ? 'No Repair'
        : value === 'cosmetic'
        ? 'Cosmetic renovation'
        : 'Fresh renovation'
    const name =
      value === 'none'
        ? 'Chosed No Repair'
        : value === 'cosmetic'
        ? 'Chosed Cosmetic renovation'
        : 'Chosed Fresh renovation'

    trackEvent({
      category: funnelCategory(),
      name,
      label,
    })
  },
  renovationYear(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Entered Year of Last Repair',
      label: 'Year of Last Repair',
    })
  },
  isMortgage(value: string): void {
    trackEvent({
      category: funnelCategory(),
      name:
        value === 'true'
          ? 'Indicated the Apartment in the Mortgage Yes'
          : 'Indicated the Apartment in the Mortgage No',
      label: value === 'true' ? 'Apartment in the Mortgage Yes' : 'Apartment in the Mortgage No',
    })
  },
  peculiarities(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Selected Peculiarities',
      label: 'Peculiarities',
    })
  },
  releaseYear(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Indicated the Year of Rented out',
      label: 'Year of Rented out',
    })
  },
  releaseQuarter(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Chosed the Rented out Quarter',
      label: 'Rented out Quarter',
    })
  },
  developer(value: string): void {
    trackEvent({
      category: funnelCategory(),
      name: `Selected by the Developer ${value}`,
      label: `Developer ${value}`,
    })
  },
  nextFirstStep(errors: ValidationErrors): void {
    const isHaveErrors = errors && Object.keys(errors).length > 0

    if (isHaveErrors) {
      trackEvent({
        category: funnelCategory(),
        name: 'Сlicked on the Next button and got an Error',
        label: 'Next button and got an Error',
      })

      return
    }

    trackEvent({
      category: funnelCategory(),
      name: 'Clicked on the Next button went to the screen Thats right',
      label: 'Next button went to the screen Thats right',
    })
  },
  nextSecondStep(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Clicked the All right button on the All right screen',
      label: 'All right button on the All right screen',
    })
  },
  backSecondStep(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Clicked on the Change data button on the Everything is correct screen',
      label: 'Change data button on the Everything is correct screen',
    })
  },
  name(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Filled in the Name on the Registration screen',
      label: 'Name on the Registration screen',
    })
  },
  phone(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Filled in Phone on the Registration screen',
      label: 'Phone on the Registration screen',
    })
  },
  nextThirdStep(errors: ValidationErrors): void {
    const isHaveErrors = errors && Object.keys(errors).length > 0

    if (isHaveErrors) {
      trackEvent({
        category: funnelCategory(),
        name: 'Got an Error on the Registration screen',
        label: 'Error on the Registration screen',
      })

      return
    }

    trackEvent({
      category: funnelCategory(),
      name: 'Clicked on the Next button on the Registration screen',
      label: 'Next button on the Registration screen',
    })
  },
  backThirdStep(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Clicked the Back button on the Registration screen',
      label: 'Back button on the Registration screen',
    })
  },
  sendSmsCode(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Entered the Code from SMS Conversions',
      label: 'Code from SMS Conversions',
    })
  },
  errorSmsCode(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Entered the wrong code from SMS',
      label: 'Wrong code from SMS  in Funnel Sale',
    })
  },
  repeatSmsCode(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Clicked the Send code button again',
      label: 'Send code button again',
    })
  },
  backSmsCode(): void {
    trackEvent({
      category: funnelCategory(),
      name: 'Clicked the Back button',
      label: 'Back button',
    })
  },
}
