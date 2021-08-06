import React from "react";
import css from "./Main.module.less";
import MainListItem from "./MainListItem";
import {Link} from "react-router-dom";
import {ItemBase} from "../Header/Header";
import Slider from "react-slick";

const MainList = ({moviesList}) => {
    function SampleNextArrow(props) {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{...style, display: "none",}}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{...style, display: "none"}}
                onClick={onClick}
            />
        );
    }

    const settings = {
        // className: "center",
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 6,
        swipeToSlide: true,
        afterChange: function (index) {
            console.log(
                `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
        },
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>
    };

    return (
        <div className={css.main__list}>

            <ItemBase className={css.on__title__focus}>
                <Link to={"/category?cid=" + moviesList.cid}><h1>{moviesList.title}</h1></Link>
            </ItemBase>

            <div className={css.container1}>
                <Slider {...settings}>

                   <div className={css.block}>
                       <div className={css.row}>
                           {moviesList.items.map((item, idx) => {
                               return (

                                   <MainListItem  key={idx} className={css.list__item} item={item}/>

                               )
                           })}
                       </div>
                   </div>
                </Slider>
            </div>
            {/*<div className={css.row}>*/}
            {/*    {moviesList.items.map((item, idx) => {*/}
            {/*        return (*/}

            {/*                <MainListItem  key={idx} className={css.list__item} item={item}/>*/}

            {/*        )*/}
            {/*    })}*/}
            {/*</div>*/}


        </div>

    )
}


export default MainList
