import { useSelector } from 'react-redux';

import { Header } from "../../components/header";
import { WeAccept } from "./WeAccept";
import { Card } from './Card';

import style from "./Style.module.scss"
import arrCard from "./data/cards.json";


const ResumeNow = () => {
    const {
        theme: {
            currentResolution
        }
    } = useSelector((state) => state);

    return (
        <>
            {
                ['md', 'sm', 'xs'].includes(currentResolution) && (
                    <Header />
                )
            }

            <div className={`${style.wr}`}>
                <h2 className={`${style.title}`}>Download Your Attention-Grabbing Resume Now!</h2>
                <p className={`${style.sub_title}`}>To download your resume simply sign up for your Premium Membership. As an added bonus,
                    you’ll gain instant full access to our suite of expertly crafted career services.</p>
                <div className={`${style.items_grid}`}>
                    {
                        arrCard.map((itemCard, index) => (
                            <Card
                                key={index}
                                itemCard={itemCard}
                                index={index}
                            />
                        ))
                    }
                </div>
                <WeAccept />
            </div>
        </>
    )
}

export default ResumeNow;