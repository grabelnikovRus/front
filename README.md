Сайт pik-broker.ru
==================

Веб-приложение, являющееся русским сайтом компании «ПИК-Брокер».
Продакшн версия расположена на домене [pik-broker.ru](https://pik-broker.ru/).

API
---

Основной используемый API — бэкенд сайта, код которого расположен в репозитории [newmainsite/new-mainsite-back](https://git.structure.pik-broker.ru/newmainsite/new-mainsite-back).

Так же используем Suggest API Яндекса для подсказки в полях ввода адреса.

Dependencies
------------

В основе приложения лежит React Framework [Next.js](https://nextjs.org).
Соответственно, для работы и сборки необходимы [React](https://reactjs.org) и [Node.js](https://nodejs.org/en/).
Так же для написания кода мы используем [TypeScript](https://www.typescriptlang.org).
Используем [Yarn](https://yarnpkg.com) package manager для установки зависимостей.

Другие важные зависимости в проекте:

* [Storybook](https://storybook.js.org)
* Для генерации API-клиента [OpenAPI Generator](https://openapi-generator.tech/)
* Для форм [React Final Form](https://final-form.org/react)
* Для галерей изображений [React Fullscreen Lightbox Pro](https://fslightbox.com/react/pro) (купленная pro-версия, обновление которой можно запросить у техдиректора)
* Кеширование бекенда [React Query](https://react-query.tanstack.com/)
* Интерфейс PDF [React PDF Viewer](https://react-pdf-viewer.dev/)
* Рендеринг PDF [PDF.js](https://mozilla.github.io/pdf.js/)
* Для запуска линтеров и др. инструментов проверки по git-хукам [Lefthook](https://github.com/evilmartians/lefthook)

Важно упомянуть устаревшие зависимости, находящиеся на этапе вывода из эксплуатации:

- @material-ui/core &#8594; самописные компоненты
- @material-ui/core/Fade &#8594; @headlessui/react/Transition
- fslightbox-react &#8594; react-slick

Проксирование
-------------

В дев-режиме проксирование данных с бэкенда осуществляется при помощи встроенных средств в NextJS ([`next.config.js`](./next.config.js)).
В прод-режиме — при помощи nginx ([`deployment/docker/nginx/default.conf.template`](./deployment/docker/nginx/default.conf.template)).

Проксируются следующие ресурсы:

| Ресурс           | Описание                            |
|------------------|-------------------------------------|
| /lead/create     |                                     |
| /api-react/      | основное апи бекенда                |
| /api/            |                                     |
| /widgets/images/ |                                     |
| /upload/menu/    |                                     |
| /upload/images/  |                                     |
| /iframe/         |                                     |
| /bundle/         | контент для виджетов                |
| /sitemap.*\.xml  | карта сайта, генерирумая на бекенде |

Запуск приложения локально
--------------------------

Скопируй содержимое файла `.env.example` в `.env.local` (второй не должен попасть в git) и настрой в нём переменные для своего окружения.

Генерация компонентов
---------------------

Для генерации компонентов используется [Hygen](https://www.hygen.io/).

Так генерируется новый компонент для `uikit`:
```shell
yarn hygen uikit new --name <component-name>
```
Где `component-name` это имя нового компонента, и оно должно быть в kebab-case.
Генератор создаст файлы для компонента, стилей, тестов и сторибука,
а также добавит новый компонент в файл `src/uikit/index.ts`

Contribution
------------

См. [CONTRIBUTING.md](./CONTRIBUTING.md)
