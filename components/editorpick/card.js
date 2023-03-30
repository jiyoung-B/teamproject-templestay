import React from 'react'
import Link from 'next/link'

import cardStyle from '../../styles/main/card.module.css'
import iconImage from '@/assets/images/icon'
import Image from 'next/image'
import { StateType } from '@/redux/slice/dummySlice'

interface IPROPS{
    item: StateType
}

const Card:React.FC<IPROPS> = ({item}) => {

    const url = `/@${item.nickname}/${item.title}`

    // console.log('url',url)

    const changeUrl = url.replace(/\s/g, '-')
    // console.log('changeUrl', changeUrl)

    return (
        <div className={cardStyle.card}>
            <Link href={changeUrl}>
                <div className={cardStyle.card_img}>
                    <Image src={item.cardImg} alt='cardImg' />
                </div>
            </Link>

            <div className={cardStyle.card_text_wrap}>
                <Link href={changeUrl}>
                    <h4>{item.title}</h4>
                    <div className={cardStyle.card_text}>
                        <p>{item.text}</p>
                    </div>
                </Link>
                <div className={cardStyle.card_sub_info}>
                    <span>{item.writeDate}</span>
                    <span className={cardStyle.separator}>·</span>
                    <span>{item.numberOfComments}개의 댓글</span>
                </div>
            </div>
            <div className={cardStyle.card_user_info}>
                <a href=''>
                    <Image src={item.cardImg} alt='' />
                    <span>by <b>{item.nickname}</b></span>
                </a>
                <div className={cardStyle.card_likes}>
                    <iconImage.like alt="like" width={24} height={24} className={cardStyle.like_icon} />
                    {item.numberOfLike}
                </div>
            </div>
        </div>
    )
}

export default Card