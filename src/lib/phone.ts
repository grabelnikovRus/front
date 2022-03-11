import { CityPhones } from 'api/models/CityPhones'
import { Contacts } from 'api/models/Contacts'

export const getInitialPhone = (contacts: Contacts): CityPhones | undefined => {
  const city = contacts?.cities?.find((city) => city.id === contacts.initialCityId)
  const office = city?.offices?.find((office) => office.id === city.initialOfficeId)
  return office?.phones?.find((phone) => phone.id === office.initialPhoneId)
}
