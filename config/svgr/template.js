/**
 * @returns string
 */
module.exports = ({ template }, opts, { componentName, jsx }) => {
  const plugins = ['jsx', 'typescript']

  const typeScriptTpl = template.smart({ plugins })
  return typeScriptTpl.ast`import { ReactElement, SVGProps } from 'react'

export const ${componentName} = (props: SVGProps<SVGSVGElement>): ReactElement => ${jsx}
`
}
