import { GetServerSideProps } from 'next'
import { VFC } from 'react'

import { Layout, Meta, NotFound } from '@/components'
import { config } from '@/config'
import { getAliasBatch } from '@/modules/batch'
import { ContactsEntity } from '@/modules/contacts'
import { MenuEntity } from '@/modules/menu'
import { notFoundPage, PageEntity, PagesEntity } from '@/modules/pages'

interface NotFoundPageProps {
  contacts: ContactsEntity
  menus: MenuEntity
  page: PageEntity
  pages: PagesEntity
}

const NotFoundPage: VFC<NotFoundPageProps> = ({ page, contacts, menus, pages }) => {
  const { pageInfo } = page

  return (
    <>
      <Meta
        title={pageInfo.metaTitle}
        origin={`${config.siteOrigin}/404`}
        description={pageInfo.metaDescription}
        openGraph={{
          title: pageInfo.ogTitle,
          description: pageInfo.ogDescription,
        }}
      />
      <Layout contacts={contacts} menus={menus} pageSlug="404" pages={pages} widgets={[]}>
        <NotFound />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<NotFoundPageProps> = async () => {
  const [contacts, menus, pages] = await getAliasBatch()
  return {
    props: {
      contacts,
      menus,
      page: JSON.parse(JSON.stringify(notFoundPage)),
      pages,
    },
  }
}

export default NotFoundPage
