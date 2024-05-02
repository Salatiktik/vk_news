import classes from './commentTree.module.css';
import { FC, useState, useEffect, ReactNode } from 'react';
import { Group, ContentCard , Spinner} from '@vkontakte/vkui'

import { getItem } from '../../hackerNewsAPI';
import { Comment } from '../../types';

export const CommentTree: FC<{id:number, isOpen: boolean, level: number}> = ({id, isOpen, level}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);  
    const [comment, setComment] = useState<Comment | undefined>();
    const [popout, setPopout] = useState<ReactNode | null>(<Spinner size="small" />);  
    const [replies, setReplies] = useState<number>(0)

    useEffect(()=>{
        console.log(id, isOpen)
        async function fetchData() {
            let tempComment = await getItem(id);
            setComment(tempComment)
            if(tempComment.kids)
                setReplies(tempComment.kids.length)
            setPopout(null)
          }
          if(isOpen){
              fetchData();
          }
          else{
            setIsExpanded(false)
          }
    },[isOpen])

    return (
        <>
        {
            popout?
                popout
            :
            <>
                {
                    comment && replies>0 && !comment.deleted?
                        <>
                            <ContentCard
                                key = {id}
                                caption={`${replies} ответов. ${isExpanded? 'Свернуть' : 'Развернуть'}`}
                                text={comment&&comment.text}
                                subtitle={comment&&comment.by}
                                style={{'marginTop':`${level==0?20:10}px`,'width':`100%`}}
                                onClick={()=>setIsExpanded(!isExpanded)}
                                hidden = {!isOpen}
                            />
                            {
                                isExpanded ?
                                    <Group mode='plain' style={{'borderLeft':'1px solid #999999','width':`calc(100% - 10px)`, 'paddingLeft':'10px','paddingTop':'0px' ,}}>
                                        {comment.kids.map(( com : number)=>
                                                <CommentTree id={com} isOpen={isExpanded} level={level+1}/>
                                            )}
                                    </Group>
                                    :
                                    null
                            }
                        </>
                    : !comment.deleted?
                    <ContentCard
                        key = {id}
                        caption={`0 ответов.`}
                        text={comment&&comment.text}
                        subtitle={comment&&comment.by}
                        style={{'marginTop':`${level==0?20:10}px`,'width':`100%`}}
                        hidden = {!isOpen}
                    />
                    : level!=0?
                    <ContentCard
                        key = {id}
                        subtitle='Комментарий удален'
                        style={{'marginTop':`${level==0?20:10}px`,'width':`calc(96vw - ${(2*level)}vw + ${10*(level+1)}px)`}}
                        hidden = {!isOpen}
                    />
                    :
                    null
                }
            </>
        }
        </>
    );
}