/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import Poster from "./Poster";

/* eslint-disable react/prop-types */
const RenderCard = ({label, poster}) => {
    const sliderRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const scrollAmount = 250;

    const checkOverflow = () => {
        const container = sliderRef.current;
        if (container) {
          const overflow = container.scrollWidth > container.clientWidth;
          setIsOverflowing(overflow);
        }
      };

      useEffect(() => {
        checkOverflow();
        const resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(sliderRef.current);

        return () => {
          if (sliderRef.current) {
            resizeObserver.unobserve(sliderRef.current);
          }
        };
      }, [poster]);
      
  return (
    <div className="render-poster">
        <h1 style={{fontSize:"2.5rem"}}>{label}</h1>

        <div className="slider-wrapper">

            {isOverflowing && (
                <svg  className="nav-btn" onClick={() => { sliderRef.current.scrollLeft -= scrollAmount; }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            )}

            <div className="poster-div" ref={sliderRef}>
                {poster.map((item, index)=>(
                    <Poster key={index} item={item}/>
                ))}
            </div>

            {isOverflowing && (
          <svg className="nav-btn" onClick={() => { sliderRef.current.scrollLeft += scrollAmount; }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />

          </svg>
        )}
        </div>
        
    </div>
  )
}

export default RenderCard
