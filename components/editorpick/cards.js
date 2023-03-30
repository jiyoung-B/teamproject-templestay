import React, { useState } from 'react'

import cardsStyle from '../../styles/main/cards.module.css'
import Card from './card'
import { useAppSelector } from '@/redux/hook'

const Cards = () => {

    const select = useAppSelector((state) => state.getDummyData.data)
    // console.log('select', select)

    return (
        <div className={cardsStyle.cards}>
            <main className={cardsStyle.cards_main}>
                <div className={cardsStyle.cards_wrap}>
                    {select.map((item,idx)=>{
                        return(
                            <Card item={item} key={idx}/>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}

export default Cards