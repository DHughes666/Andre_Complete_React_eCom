import { useNavigate } from "react-router-dom";

import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
    const {imageUrl, title, route} = category;
    const navigator = useNavigate()

    const onNavigateHandler  = () => navigator(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage style={{
                backgroundImage: `url(${imageUrl})`
            }}
            />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        
        </DirectoryItemContainer>
    )
};

export default DirectoryItem;