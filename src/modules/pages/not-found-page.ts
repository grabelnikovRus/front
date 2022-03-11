import { PageEntity } from '@/modules/pages/page.entity'

export const notFoundPage: PageEntity = {
  pageInfo: {
    alias: 'notFound',
    slug: '404',
    displayName: '',
    metaDescription:
      'Продайте свою квартиру быстро и выгодно в Москве и области. Оценка, сопровождение документов и консультация специалистов!',
    metaTitle: 'Страница 404',
    ogDescription:
      'Продайте свою квартиру быстро и выгодно в Москве и области. Оценка, сопровождение документов и консультация специалистов!',
    ogTitle: 'Страница 404',
  },
  widgets: [
    {
      fields: {},
      name: 'wrong_link_v5__notfound',
    },
  ],
}
