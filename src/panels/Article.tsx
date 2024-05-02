import { FC , ReactNode, useState, useEffect} from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack, SplitLayout , ScreenSpinner, Title, Group, Link, Caption, Spacing, Separator, IconButton, Div} from '@vkontakte/vkui';
import { useRouteNavigator, useParams } from '@vkontakte/vk-mini-apps-router';
import { ArticleFull , Comment} from '../types';
import { getItem } from '../hackerNewsAPI';
import {CommentTree} from '../components'
import {Icon24ExternalLinkOutline, Icon24Switch} from '@vkontakte/icons'

export const Article: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);
  const [article, setArticle] = useState <ArticleFull | undefined>()
  const {articleId} = useParams<'articleId'>()

  async function fetchData() {
      let tempArticle = await getItem(articleId);
      setArticle(tempArticle)
      setPopout(null)
    }
  useEffect(()=>{
      fetchData();
  },[])

  function forceReload(){
    setPopout(<ScreenSpinner size="large" />)
    fetchData()
  }


  return (
    <Panel nav={id} >
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Новость
      </PanelHeader>
      <SplitLayout popout={popout}>
        {
          popout?
            null
          :
          <Group mode='plain' style={{'width':'100%'}}>
            <Div style={{'padding':'20px'}}>
              <Caption>{new Date(article.time * 1000).toLocaleString('RU')}</Caption>
              <Title>{article && article.title}</Title>
              <Title>By {article && article.by}</Title>
              <Link href={article && article.url}>Статью вы можете прочитать здесь: {article && article.url} <Icon24ExternalLinkOutline width={16} height={16} /></Link>
            </Div>
            <Spacing size={16}>
              <Separator/>
            </Spacing>
            {
              article && article.kids && article.descendants?
                <>
                <Caption style={{'alignItems':'center','display':'flex','flexDirection':'row'}}> <IconButton onClick={forceReload} style={{'marginLeft':'20px'}} title='Обновить'><Icon24Switch /></IconButton> Общее число комментариев: {article.descendants}</Caption>
                <Group mode='plain' style={{'marginLeft':'10px','display':'flex','flexDirection':'column','alignItems':'flex-end'}}>
                  { article && article.kids && article.kids.map((comment : number)=>
                    <CommentTree id={comment} isOpen={true} level={0}/>
                  )}
                </Group>
                </>
                :
                <Caption style={{'alignItems':'center','display':'flex','flexDirection':'row'}}> <IconButton onClick={forceReload}  style={{'marginLeft':'20px'}} title='Обновить'><Icon24Switch /></IconButton> Нет комментариев</Caption>
            }
            
          </Group>
        }
      </SplitLayout>
    </Panel>
  );
};
