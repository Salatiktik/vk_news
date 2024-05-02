import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { News, Article } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.NEWS } = useActiveVkuiLocation();

  return (
    <View activePanel={activePanel}>
      <News id="news"/>
      <Article id="article/:articleId" />
    </View>
  );
};
