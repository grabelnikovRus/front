import { Apartment } from '@/api'

export const getStaticMapImageUrl = (
  point: Apartment['address']['point'],
  size: { width: number; height: number },
): string =>
  `https://static-maps.yandex.ru/1.x/?l=map&ll=${point.latitude},${point.longitude}&,org&size=${size.width},${size.height}&z=14`
