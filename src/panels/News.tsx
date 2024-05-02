import { useState, useEffect, ReactNode , FC} from 'react';
import {
  Panel,
  PanelHeader,
  Button,
  List,
  NavIdProps,
  ScreenSpinner,
  SplitLayout,
  IconButton
} from '@vkontakte/vkui';
import { Icon24Switch } from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { ArticleShort } from '../types';
import { ArticleRow } from '../components';

import { getNews } from '../hackerNewsAPI';


export const News : FC<NavIdProps> = ({ id }) => {
  const [fetchedNews, setFetchedNews] = useState<ArticleShort[] | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);

  async function fetchData() {
    let tempNews = await getNews();
    setFetchedNews(tempNews);
    setPopout(null);
  }

  useEffect(() => {
    fetchData();
    setInterval(()=>fetchData(),60000);
  }, []);

  function forceReload(){
    setPopout(<ScreenSpinner size="large" />);
    fetchData();
  }

  return (
    <Panel nav={id}>
      <PanelHeader before={<IconButton onClick={forceReload} title='Обновить'><Icon24Switch /></IconButton>}> Новости </PanelHeader>
      <SplitLayout popout={popout}>
        <List style={{'width':'100%'}}>
          {
            fetchedNews && fetchedNews.map((article : number )=>
              <ArticleRow key={article} id = {article}/>
            )
          }
        </List>
      </SplitLayout>
    </Panel>
  );
};
