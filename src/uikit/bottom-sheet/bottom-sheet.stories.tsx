import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'

import { BottomSheet } from './bottom-sheet'
import { BottomSheetContainerProps } from './bottom-sheet-content'

export default {
  title: 'uikit/BottomSheet',
  component: BottomSheet,
} as Meta

const Template: Story<BottomSheetContainerProps> = (args) => (
  <div>
    <BottomSheet {...args}>
      <BottomSheet.Container {...args}>{args.children}</BottomSheet.Container>
    </BottomSheet>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  className: 'classname',
  isOpen: true,
  onClose: action('close'),
  children: 'children',
}

export const LongContent = Template.bind({})
LongContent.args = {
  className: 'classname',
  isOpen: true,
  onClose: action('close'),
  children: (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda beatae, iste
      iusto, laboriosam necessitatibus nesciunt nobis perferendis quasi quis quos sint sit vel?
      Dolorem doloremque, doloribus earum eum nihil sed sunt voluptas. Asperiores aut consectetur
      eaque esse, facere hic in maxime molestiae, mollitia nihil nulla odit quam quidem, rerum
      voluptas? Blanditiis culpa cum dignissimos doloremque ducimus et exercitationem expedita
      fuga fugit hic ipsam laboriosam nemo neque nihil numquam officia, pariatur perspiciatis
      placeat porro provident quia, repellat reprehenderit saepe suscipit tempora tenetur ut.
      Asperiores at cupiditate harum laudantium quas recusandae rem, sit. Consequuntur doloremque
      doloribus magni maiores nesciunt provident tempore unde vero. Aperiam ipsa laborum quasi
      voluptas! Beatae blanditiis, dicta doloremque est facilis inventore molestias nam odit omnis
      porro recusandae sit? Accusamus adipisci animi, architecto debitis deleniti distinctio,
      dolorum ea eligendi iusto libero magnam nesciunt nihil, sed soluta tempore?
    </div>
  ),
}
