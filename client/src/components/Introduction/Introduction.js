import React, { useState, useEffect, useRef } from 'react';
import './Introduction.scss';
import Punk from '../Punk/Punk'; 

const Introduction = (props) => {
    const [introPosition, setIntroPosition] = useState(1);
    const bottomEl = useRef(null);

    useEffect(() => {
        bottomEl?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [introPosition]);

    const showNextIntroSeciton = () => {
        setIntroPosition(introPosition+1); 
    }

    const introData = [
        {
            punk:'/static/john.gif',
            text: 'So you decided to learn a language eh,'
        },
        {
            punk:'/static/john.gif',
            text: 'let me tell you, it aint easy,'
        },
        {
            punk:'/static/john.gif',
            text: 'Ask my buddy Marco,'
        },
        {
            punk:'/static/marco.png',
            text: '...'
        },
        {
            punk:'/static/marco.png',
            text: '* tosses dart *'
        },
        {
            punk:'/static/marco.gif',
            text: 'Thats better.'
        },
        {
            punk:'/static/marco.gif',
            text: 'Scribole really helps me focus my learning by playing games and memorizing useful words.'
        },
        {
            punk:'/static/silvia.gif',
            text: '* Enters Marcos girlfriend *.'
        },
        {
            punk:'/static/silvia.gif',
            text: 'There are many language apps but this one is tailored to really help you get to know vocabulary.'
        },
        {
            punk:'/static/silvia.gif',
            text: 'Take a look at the tab below'
        },
        {
            punk:'/static/silvia.gif',
            text: 'In this tab you will find games !'
        }, 
        {
            punk:'/static/silvia.gif',
            text: 'Checkout the next tab, these are categories!'
        }, 
        {
            punk:'/static/silvia.gif',
            text: 'In this tab you will find categories, categories consist of words you are trying to focus in on that day.'
        }, 
        {
            punk:'/static/marco.gif',
            text: 'Remember ! The categories you select, will be the words that show up in the games you play.'
        }, 
        {
            punk:'/static/mary.gif',
            text: 'LOOK. We even get experience every time we play games, which can be found in the Scores tab.'
        }, 
        {
            punk:'/static/mary.gif',
            text: 'I am excited to get started.'
        },
        {
            punk:'/static/mary.gif',
            text: 'Oh and this last tab is your account information.'
        },
        {
            punk:'/static/mary.gif',
            text: 'LETS GET GOING !'
        },
    ]

    const showFakeNavBar = () => {
        if (introPosition > 11) {
            return (
                <div className='fakeNavBar'>
                    {introPosition >= 11 ? <div className='fakeNavBarIcon fakeNavBarIcon1'></div>: ''}
                    {introPosition >= 13 ? <div className='fakeNavBarIcon fakeNavBarIcon2'></div>: ''}
                    {introPosition >= 16 ? <div className='fakeNavBarIcon fakeNavBarIcon3'></div>: ''}
                    {introPosition >= 18 ? <div className='fakeNavBarIcon fakeNavBarIcon4'></div>: ''}
                </div>
            )
        }
    }

    const showNeverShowText = () => {
        return (
            introPosition >= 19 ? 
                <div className='neverShowContainer'>
                    <div className='neverShowAgainText' onClick={()=>props.neverShowIntro()}>Never Show Again</div>
                    <div className='neverShowAgainText' onClick={()=>props.hideIntroForNow()}>Take me to games</div>
                </div>
            : ''
        )
    }

    return ( 
        <div className='introductionContainer' onClick={() => showNextIntroSeciton()}>
            {
                introData.map((introItem, i) => {
                    return (
                        introPosition >= i+1 ?
                            <div key={i} className='introPosition' ref={bottomEl}>
                                <Punk punk={introItem.punk} />
                                <div className='introText'>{introItem.text}</div>
                            </div>
                        : ''
                    )
                })
            }
            {showFakeNavBar()}
            {showNeverShowText()} 
        </div> 
    );
};

export default Introduction;
