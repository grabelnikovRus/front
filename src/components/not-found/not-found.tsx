import Link from 'next/link'
import { VFC } from 'react'

import { Container } from '@/uikit'

import styles from './not-found.module.scss'

export const NotFound: VFC = () => (
  <div className={styles.not_found}>
    <Container>
      <div className={styles.not_found_inner}>
        <div className={styles.not_found_container}>
          <h1>Упс... пустая страничка</h1>
          <p>Может начнем все сначала?</p>
          <Link href="/">
            <a>На главную</a>
          </Link>
        </div>
      </div>
    </Container>
  </div>
)
