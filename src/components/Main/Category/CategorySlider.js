import {useQuery} from "../../../utils/useQuery";
import React, {useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import css from "./Category.module.less"
import Spottable from "@enact/spotlight/Spottable";
import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../../../redux/actions";
import {Link} from "react-router-dom";

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


export const CategorySlider = (props) => {
    const query = useQuery();
    const categoryId = query.get("cid")
    const dispatch = useDispatch()
    const category = useSelector(state=>state.mainReducer.category)

    useEffect(() => {
        dispatch(getCategory(categoryId))
    }, [])

    useEffect(()=>{
        console.log(category)
    },[category])

    if (category){
        console.log(category)
    }

    console.log(categoryId && categoryId)
    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 6,
        // autoplay: true,
        centerMode: true,
        swipeToSlide: true,
        afterChange: function(index) {
            console.log(
                `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
        },
        nextArrow: <SampleNextArrow  />,
        prevArrow: <SamplePrevArrow  />
    };

    return (
        <>
            <div className={css.container}>
                <h1>{category && category.title}</h1>
                <Slider {...settings}>
                           {
                               category && category.items.map(item=>{
                                   return(
                                       <div className={css.block} key={item}>
                                           <ItemBase className={css.content}>
                                               <div className={css}>

                                                   <Link to={item.url}>
                                                       <img src={item.logo} alt="item"/>
                                                   </Link>

                                               </div>
                                           </ItemBase>
                                       </div>
                                   )
                               })
                           }
                </Slider>
            </div>


        </>
    )
}

const ComponentSpottable = ({children,...rest})=>{
    return<div {...rest}>{children}</div>
}
const ItemBase = Spottable(ComponentSpottable)
