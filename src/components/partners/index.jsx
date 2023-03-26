import classnames from 'classnames';

// Component
import { ImageSprite } from '../../components/imageSprite';

// Styles
import style from './Style.module.scss';

export const Partners = ({isGray = true}) => {
  return (
    <section className={classnames(style.partners, 'partners')}>
        <div className="containers">
              <div className={classnames(style.partnersWrapper, { [style.greyFilter]: isGray })}>
                <ImageSprite iconName={'forbes'} width={'140px'} height={'37px'} />
                <ImageSprite iconName={'mashable'} width={'229px'} height={'37px'} />
                <ImageSprite iconName={'cnn'} width={'78px'} height={'37px'} />
                <ImageSprite iconName={'cbc'} width={'145px'} height={'37px'} />
                <ImageSprite iconName={'tnw'} width={'155px'} height={'37px'} />
                <ImageSprite iconName={'wsj'} width={'75px'} height={'37px'} />
            </div>
        </div>
    </section>
    )
}