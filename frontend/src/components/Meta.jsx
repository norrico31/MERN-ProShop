import { Helmet } from 'react-helmet'

const Meta = (props) => {
    return (
        <Helmet>
            <title>{props.title}</title>
            <meta name='description' content={props.description} />
            <meta name='keyword' content={props.keywords} />
        </Helmet>
    )
}
Meta.defaultProps = {
    title: 'Welcome To ProShop',
    keywords: 'electronics, buy electronics, cheap electronics',
    description: 'We sell the best products for cheap'
}

export default Meta