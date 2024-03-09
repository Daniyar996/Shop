import React from 'react';
import "./Home.css"
const Home = () => {



    return (

        <div>
            <h1 style={{textAlign:"center",fontStyle:'italic'}}>Добро Пожаловать Ювелирный Магазин!</h1>
            <div className='image-home'>

                <img src="https://www.cartier.com/ru-ru/media/banner/20240216_102950_4XGvz1707991687_widget_banners_source_1.webp"  style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        </div>
    );
};

export default Home;
