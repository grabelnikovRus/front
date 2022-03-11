import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createLead, verifyLead } from '@/modules/lead'

import { ApartmentCardStory } from './lead-apartment.stories'

const leadApi = { createLead, verifyLead } as {
  createLead: jest.Mock<ReturnType<typeof createLead>, Parameters<typeof createLead>>
  verifyLead: jest.Mock<ReturnType<typeof verifyLead>, Parameters<typeof verifyLead>>
}

const element = <ApartmentCardStory {...(ApartmentCardStory.args as any)} />

jest.mock('@/modules/lead', () => ({
  createLead: jest.fn(async () => ({
    body: { id: 1, result: true, uuid: '1', message: 'Success' },
    errors: [],
  })),
  verifyLead: jest.fn(async () => ({ body: {}, errors: [] })),
}))

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))

jest.useFakeTimers()

const fillAndSubmitLeadForm = () => {
  render(element)

  screen.getByLabelText('Ваше имя').focus()
  userEvent.keyboard('Афанасий')

  screen.getByLabelText('Телефон').focus()
  userEvent.keyboard('+79991111111')

  fireEvent.click(screen.getByText('Записаться на просмотр'))
}

describe('InputCode', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should call "createLead()" on submit', async () => {
    fillAndSubmitLeadForm()

    expect(leadApi.createLead).toHaveBeenCalledWith({
      apartmentId: '153868',
      formType: 'apartment_review',
      gaId: null,
      name: 'Афанасий',
      phone: '79991111111',
      source: 'pik-broker.ru',
    })

    await waitFor(() => screen.getByText('Введите код из СМС'))

    expect(screen.getByText('+7 (999) 111-11-11')).toBeVisible()
  })

  it('should call "verifyLead()" on submit', async () => {
    fillAndSubmitLeadForm()

    await waitFor(() => screen.getByText('Введите код из СМС'))
    userEvent.keyboard('1234')

    expect(leadApi.verifyLead).toHaveBeenCalledWith({
      id: 1,
      smsCode: '1234',
    })

    await waitFor(() => screen.getByText('Готово'))
    fireEvent.click(screen.getByText('Хорошо'))
  })

  it('should call "createLead()" again if "resend" button pressed', async () => {
    fillAndSubmitLeadForm()

    await waitFor(() => screen.getByText('Введите код из СМС'))
    expect(screen.getByText('Повторная отправка через 120 сек.')).toBeVisible()

    act(() => {
      jest.advanceTimersByTime(121000)
    })

    fireEvent.click(screen.getByText('Отправить код ещё раз'))

    expect(leadApi.createLead).toHaveBeenNthCalledWith(2, {
      apartmentId: '153868',
      formType: 'apartment_review',
      gaId: null,
      name: 'Афанасий',
      phone: '79991111111',
      source: 'pik-broker.ru',
    })

    await waitFor(() => screen.getByText('Введите код из СМС'))

    expect(screen.getByText('+7 (999) 111-11-11')).toBeVisible()
  })

  it('should show validation error for incorrect sms code', async () => {
    leadApi.verifyLead.mockImplementation(async () => ({
      body: null,
      errors: [{ code: 0, message: 'Введён неверный код', field: 'sms_code' }],
    }))

    fillAndSubmitLeadForm()

    await waitFor(() => screen.getByText('Введите код из СМС'))
    userEvent.keyboard('1234')

    expect(leadApi.verifyLead).toHaveBeenCalledWith({
      id: 1,
      smsCode: '1234',
    })

    await waitFor(() => screen.getByText('Введён неверный код'))
  })

  it('should show error if missing required field', async () => {
    leadApi.createLead.mockImplementation(async () => ({
      body: null,
      errors: [
        {
          message: 'Отсутствует обязательный параметр phone',
          field: null,
        },
      ],
    }))

    fillAndSubmitLeadForm()

    await waitFor(() => screen.getByText('Отсутствует обязательный параметр phone'))
  })
})
