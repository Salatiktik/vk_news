import classes from './articleRow.module.css';
import { FC, useState, useEffect, ReactNode } from 'react';
import { NavIdProps } from '../../../node_modules/@vkontakte/vkui/dist/index';
import { ArticleShort } from '../../types';
import { Caption, ContentCard, Tappable , Spinner} from '@vkontakte/vkui'
import { Icon16Like } from '@vkontakte/icons'

import { getItem } from '../../hackerNewsAPI';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const ArticleRow: FC<{id:number}> = ({id}) => {
    const [article, setArticle] = useState<ArticleShort | undefined>();  
    const [popout, setPopout] = useState<ReactNode | null>(<Spinner size="small" />);  
    const routeNavigator = useRouteNavigator()

    useEffect(()=>{
        async function fetchData() {
            let tempArticle = await getItem(id);
            setArticle(tempArticle)
            setPopout(null)
          }
          fetchData();
    },[])

    return (
        <Tappable onClick={() => routeNavigator.push(`article/${id}`)}>
            {popout?
                popout
                :
                <>
                    <ContentCard 
                        subtitle = {new Date(article.time * 1000).toLocaleString('RU')}
                        header = {article.title}
                        caption = {`By ${article.by}`}
                        className={classes.card}
                        >
                        
                    </ContentCard>
                    <Caption className={classes.score}>{article.score}<Icon16Like/></Caption>
                </>
            }
        </Tappable>
    );
}