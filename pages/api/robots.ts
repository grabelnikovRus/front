import type { NextApiRequest, NextApiResponse } from 'next'

import { config } from '@/config'

const robotsTxt = `User-agent: *
Disallow: /spb/
Disallow: /p/*
Disallow: /f/*
Disallow: /r/*
Disallow: /*amp*
Disallow: /*id=*
Disallow: /*utm_placement=*
Disallow: /*utm_device=*
Disallow: /*mc_session_uuid=*
Disallow: /*calltouch_tm=*
Disallow: /*.html
Disallow: /*?*
Disallow: /*&*
Disallow: /*.pdf
Disallow: /cashbox
Disallow: /omni
Disallow: /contract-offer-subscription
Disallow: /main-buy
Disallow: /main-sale

Sitemap: https://${config.domain}/sitemap.xml
`

export default (req: NextApiRequest, res: NextApiResponse<typeof robotsTxt>): void => {
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8')
  res.status(200).send(robotsTxt)
}
