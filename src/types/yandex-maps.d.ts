import {
  IBaseGeometry,
  ICollection,
  ICustomizable,
  IEventManager,
  IIterator,
  option,
} from '@types/yandex-maps'

declare module '@types/yandex-maps' {
  declare namespace ymaps {
    interface IClusterGeometry extends IBaseGeometry {
      coordinates: number[]
    }

    interface Cluster {
      geometry: IClusterGeometry
    }

    namespace objectManager {
      interface IObject {
        geometry: { coordinates: number[] }
        properties: unknown
      }

      class ObjectCollection implements ICollection, ICustomizable {
        options: option.Manager

        events: IEventManager

        add(object: IObject): this

        getById(id: string | null | undefined): IObject | null

        getIterator(): IIterator

        remove(object: IObject): this

        setObjectOptions(objectId: string, options: IObject): ObjectCollection
      }
    }
  }
  export = ymaps
  export as namespace ymaps
}
