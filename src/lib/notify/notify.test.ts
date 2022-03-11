import { notify } from './notify'

describe('notify', () => {
  it('should subscribe, call listener and unsubscribe', () => {
    const listener = jest.fn()
    const id = notify.subscribe(listener)

    notify.success({ message: 'foo', description: 'bar' })
    expect(listener).toBeCalledWith({ message: 'foo', description: 'bar', type: 'SUCCESS' })

    notify.error({ message: 'foo', description: 'bar' })
    expect(listener).toBeCalledWith({ message: 'foo', description: 'bar', type: 'ERROR' })

    notify.unsubscribe(id)
    notify.success({ message: 'foo', description: 'bar' })
    expect(listener).toBeCalledTimes(2)
  })
})
