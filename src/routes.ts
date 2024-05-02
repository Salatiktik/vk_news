import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  NEWS: 'news',
  ARTICLE: 'article/:articleId',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.NEWS, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.ARTICLE, `/${DEFAULT_VIEW_PANELS.ARTICLE}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
