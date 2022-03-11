import {
  GetWidgetsResponseResponseBody,
  Widget,
  WidgetFields as WidgetField,
  WidgetFieldStack,
  WidgetFieldText,
  WidgetFieldPdf,
} from '@/api'
import { removeUndefined } from '@/lib/object'

export type WidgetEntity = Widget
export type WidgetsEntity = Widget[]
export type WidgetFields = Widget['fields']

export const isTextField = (
  field?: WidgetField,
): field is { widgetType: 'text' } & WidgetFieldText =>
  field !== undefined && field.widgetType === 'text'

export const isStackField = (
  field?: WidgetField,
): field is { widgetType: 'stack' } & WidgetFieldStack =>
  field !== undefined && field.widgetType === 'stack'

export const isPdfField = (
  field?: WidgetField,
): field is { widgetType: 'pdf' } & WidgetFieldPdf =>
  field !== undefined && field.widgetType === 'pdf'

export const enhanceWidgets = (widgets: GetWidgetsResponseResponseBody): WidgetsEntity => {
  const enhancedWidgets = widgets.widgets ?? []
  return removeUndefined(enhancedWidgets)
}
