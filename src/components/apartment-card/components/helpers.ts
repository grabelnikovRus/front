import { ApartmentAmoHistoryAmoHistory } from '@/api'
import { listOfDocuments } from '@/config'

const {
  DKP,
  EXCHANGE,
  DDU_PRIMARY,
  DDU_SECONDARY,
  DUPT,
  JSK,
  RENT,
  DONATION,
  PRIVATIZATION,
  INHERITANCE,
  COURT_DECISION,
  MARRIAGE_CONTRACT,
  LOAN,
  MATERNAL_CAPITAL,
  MATERNAL_CAPITAL_DUPT_JSK,
  MINORS,
} = listOfDocuments

const getSeparated = (contract: string | null | undefined) => {
  let separated = ' '
  if (String(contract).indexOf('/')) separated = '/'
  if (String(contract).indexOf(',')) separated = ','
  return separated
}

export const setVisibleItem = (contract: string | null | undefined, list: string[]): boolean => {
  if (contract == null) return false
  return contract
    .split(getSeparated(contract))
    .some((el) => list.includes(el.trim().toLowerCase()))
}

export const getDocuments = (history: ApartmentAmoHistoryAmoHistory): string[] => {
  const {
    _764685: primary,
    _764683: secondary,
    _764687: loan,
    _764691: minors,
    _764689: capital,
  } = history

  let documents: string[] = []

  const separatePrimary = getSeparated(primary)
  const separateSecondary = getSeparated(secondary)

  primary?.split(separatePrimary).forEach((contract) => {
    switch (contract.trim().toLowerCase()) {
      case 'дду':
        return (documents = [...documents, ...DDU_PRIMARY])
      case 'дупт':
        return (documents = [...documents, ...DUPT])
      default:
        return documents
    }
  })

  secondary?.split(separateSecondary).forEach((contract) => {
    switch (contract.trim().toLowerCase()) {
      case 'дкп':
        return (documents = [...documents, ...DKP])
      case 'мена':
        return (documents = [...documents, ...EXCHANGE])
      case 'дду':
        return (documents = [...documents, ...DDU_SECONDARY])
      case 'жск':
        return (documents = [...documents, ...JSK])
      case 'рента':
        return (documents = [...documents, ...RENT])
      case 'дарение':
        return (documents = [...documents, ...DONATION])
      case 'приватизация':
        return (documents = [...documents, ...PRIVATIZATION])
      case 'наследство':
        return (documents = [...documents, ...INHERITANCE])
      case 'решение суда':
        return (documents = [...documents, ...COURT_DECISION])
      case 'брачный договор':
        return (documents = [...documents, ...MARRIAGE_CONTRACT])
      default:
        return documents
    }
  })

  if (loan?.toLowerCase() === 'ипотека активная') documents = [...documents, ...LOAN]

  if (
    capital?.toLowerCase() === 'да' &&
    (setVisibleItem(primary, ['дду']) ||
      setVisibleItem(secondary, ['дкп', 'мена', 'дду', 'решение']))
  ) {
    documents = [...documents, ...MATERNAL_CAPITAL]
  }

  if (
    capital?.toLowerCase() === 'да' &&
    (setVisibleItem(primary, ['дупт']) || setVisibleItem(secondary, ['жск']))
  ) {
    documents = [...documents, ...MATERNAL_CAPITAL_DUPT_JSK]
  }

  if (minors?.toLowerCase() === 'да') documents = [...documents, ...MINORS]

  return [...new Set(documents)]
}
