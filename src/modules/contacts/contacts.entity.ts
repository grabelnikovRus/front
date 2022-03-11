import { Contacts } from '@/api'
import { removeUndefined } from '@/lib/object'

import { contactsApi } from './contacts.api'

export type ContactsEntity = Contacts

export const enhanceContacts = (contacts: Contacts): ContactsEntity => removeUndefined(contacts)

export const getContacts = async (): Promise<ContactsEntity> => {
  const { response } = await contactsApi.getContacts()
  return enhanceContacts(response.body)
}
