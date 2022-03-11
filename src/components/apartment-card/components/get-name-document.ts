import { ApartmentAmoHistoryAmoHistory } from '@/api'

const nameDocument = {
  dduLink: 'Договор долевого участия',
  duptPbLink: 'Договор уступки права требования ПИК-Брокер',
  avzPbLink: 'Акт взаиморасчетов ПИК-Брокер',
  ppLink: 'Платежное поручение ПИК-Брокер об оплате объекта',
  escrowLink: 'Договор счета эскроу',
  ppOdsLink: 'Платежное поручение о зачислении на эскроу',
  creditLink: 'Справка о погашении кредита бывшим собственником',
  egrnLink: 'Выписка из ЕГРН / Свидетельство о праве собственности бывшего собственника',
  titleDocumentLink: 'Правоустанавливающий документ',
  egrnPbLink: 'Выписка из ЕГРН ПИК-Брокер',
  dkpPbLink: 'Договор купли продажи ПИК-Брокер',
  appPbLink: 'Акт приема-передачи ПИК-Брокер',
  vdkLink: 'Выписка из домовой книги',
  agreementLink: 'Имущественные отношения собственника и супруга',
}

export const getNameDocument = (
  link: string,
  amoHistory: ApartmentAmoHistoryAmoHistory,
): string | null => {
  const name = Object.entries(amoHistory).find(([key, value]) => value === link)
  return name ? nameDocument[name[0] as keyof typeof nameDocument] : null
}
