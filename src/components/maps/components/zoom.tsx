import { VFC, useMemo, RefObject } from 'react'
import { useWindowSize } from 'react-use'
import { YMapsApi, ZoomControl } from 'react-yandex-maps'

export interface ZoomProps {
  ymaps: YMapsApi | null
  mapRef: RefObject<ymaps.Map>
}

const ZOOM_STEP = 2
const ZOOM_CONTROL_HEIGHT = 62

export const Zoom: VFC<ZoomProps> = ({ ymaps, mapRef }) => {
  const { height: windowHeight } = useWindowSize()
  const ZoomLayout = useMemo(
    () =>
      ymaps?.templateLayoutFactory.createClass(
        "<div class='zoom'>" +
          "<div id='zoom-in' class='zoom_btn'></div>" +
          "<div id='zoom-out' class='zoom_btn'></div>" +
          '</div>',
        {
          build: function () {
            ZoomLayout.superclass.build.call(this)

            this.zoomInCallback = ymaps.util.bind(this.zoomIn, this)
            this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this)

            this.ZoomInElementRef = document.getElementById('zoom-in')
            this.ZoomOutElementRef = document.getElementById('zoom-out')

            this.ZoomInElementRefHandler = () => {
              this.zoomInCallback()
            }
            this.ZoomOutElementRefHandler = () => {
              this.zoomOutCallback()
            }

            this.ZoomInElementRef?.addEventListener('click', this.ZoomInElementRefHandler)
            this.ZoomOutElementRef?.addEventListener('click', this.ZoomOutElementRefHandler)
          },

          clear: function () {
            if (this.ZoomInElementRef?.removeEventLister) {
              this.ZoomInElementRef?.removeEventLister('click', this.ZoomInElementRefHandler)
            }
            if (this.ZoomOutElementRef?.removeEventLister) {
              this.ZoomOutElementRef?.removeEventLister('click', this.ZoomOutElementRefHandler)
            }

            ZoomLayout.superclass.clear.call(this)
          },

          zoomIn: function () {
            const map = this.getData().control.getMap()
            map.setZoom(map.getZoom() + ZOOM_STEP, { checkZoomRange: true })
          },

          zoomOut: function () {
            const map = this.getData().control.getMap()
            map.setZoom(map.getZoom() - ZOOM_STEP, { checkZoomRange: true })
          },
        },
      ),
    [ymaps],
  )

  const zoomControlTop = useMemo(
    () => (mapRef?.current?.container.getSize()[1] || windowHeight) / 2 - ZOOM_CONTROL_HEIGHT / 2,
    [windowHeight, mapRef],
  )

  return (
    <ZoomControl
      options={{
        layout: ZoomLayout,
        position: {
          top: zoomControlTop,
          right: 'var(--zoom-control-right-margin)',
        },
      }}
    />
  )
}
