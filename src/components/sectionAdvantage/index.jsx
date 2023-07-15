import { AdvantagesItem } from '../advantagesItem';

export const SectionOfferAdvantage = ({ advantages }) => {
    return (
        <section className="offer-sec mt-180">
            <div className="containers">
                <div className="promo-offe">
                    <h2 className="h2 font-600">
                        Craft your career narrative swiftly with our advanced Cover Letter Creator!
                    </h2>

                    <ul className="advantage-list">
                        {
                            advantages.map(({ image, title, text }, index) => (
                                <AdvantagesItem key={`advantage-${index}`} image={image} title={title} text={text} />
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}