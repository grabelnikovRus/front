import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import { useState } from 'react'

import { SvgSuggestAddress, SvgSuggestMetro, SvgSuggestOther } from '@/uikit'

import { Suggest, SuggestProps } from './suggest'
import styles from './suggest.module.scss'

export default {
  title: 'uikit/Suggest',
  component: Suggest,
} as Meta

const Template: Story<SuggestProps<string>> = (args) => {
  const [items, setItems] = useState(args.items)
  const handleSuggestInput = (inputValue?: string) => {
    setItems(
      args.items.map((item) => ({
        ...item,
        items: item.items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() ?? ''),
        ),
      })),
    )
  }
  return (
    <div style={{ width: 272 }}>
      <Suggest<string>
        {...args}
        items={items}
        onSelect={action('select')}
        onInput={handleSuggestInput}
      />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'Введите адрес:',
  placeholder: 'Район, метро или МЦД...',
  items: [{ title: '', items: ['Пушкина, 18', 'Маяковского, 35', 'Гоголя, 17'] }],
}

export const Loading = Template.bind({})
Loading.args = {
  label: 'Введите адрес:',
  placeholder: 'Район, метро или МЦД...',
  items: [{ title: '', items: ['Пушкина, 18', 'Маяковского, 35', 'Гоголя, 17'] }],
  isLoading: true,
}

const renderSectionTitle: SuggestProps<string>['renderSectionTitle'] = (section) => {
  let svg
  switch (section.title) {
    case 'Адрес':
      svg = <SvgSuggestAddress />
      break
    case 'Метро':
      svg = <SvgSuggestMetro />
      break
    default:
      svg = <SvgSuggestOther />
  }
  return (
    <div className={styles.suggest_title}>
      <div style={{ width: 12, height: 12, marginRight: 4 }}>{svg}</div>
      {section.title}
    </div>
  )
}

export const Sections = Template.bind({})
Sections.args = {
  label: 'Введите адрес:',
  placeholder: 'Район, метро или МЦД...',
  renderSectionTitle,
  items: [
    { title: 'Адрес', items: ['Пушкина, 18', 'Маяковского, 35', 'Гоголя, 17'] },
    { title: 'Метро', items: ['Пушкинская', 'Маяковская', 'Тургеневская'] },
    { title: 'Прочее', items: ['Тимирязевский район'] },
  ],
}
