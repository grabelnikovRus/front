import { VFC } from 'react'

import { config } from '@/config'

import preloader from './preloader.svg'

export interface PictureProps {
  url: string
  sizes: string | Record<string, string>
  alt: string
  title?: string
  className?: string
  resizingType?: 'fill' | 'fit' | 'force' | 'auto'
  lazy?: boolean
}

interface ImgSrcParams {
  url: string
  format: string
  size: string
  resizingType?: PictureProps['resizingType']
}

const IMAGE_FORMATS = {
  webp: 'image/webp',
  jpeg: '',
}

const IMAGE_DPR = [1, 2]

const getImgSrc = ({ url, format, size, resizingType = 'fill' }: ImgSrcParams) =>
  IMAGE_DPR.map((dpr) =>
    [
      config.imgProxyUrl,
      'insecure',
      `rs:${resizingType}:${size}`,
      `dpr:${dpr}`,
      `f:${format}`,
      'plain',
      `${url} ${dpr}x`,
    ].join('/'),
  ).join(', ')
1
export const Picture: VFC<PictureProps> = ({
  url,
  sizes,
  alt,
  title,
  className,
  resizingType,
  lazy = false,
}) => {
  const sizesObject = typeof sizes === 'string' ? { '': sizes } : sizes

  return (
    <picture>
      {Object.entries(sizesObject).map(([media, size]) =>
        Object.entries(IMAGE_FORMATS).map(([format, type]) => (
          <source
            key={`${media}-${format}`}
            srcSet={lazy ? preloader : getImgSrc({ url, format, size, resizingType })}
            data-srcset={lazy ? getImgSrc({ url, format, size, resizingType }) : undefined}
            media={media || undefined}
            type={type || undefined}
          />
        )),
      )}
      <img alt={alt} title={title} className={className} />
    </picture>
  )
}
