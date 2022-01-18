import * as React from "react"

/**
 * @typedef Props
 * @property {string} className
 * @property {string} fill
 * @property {string} stroke
 * 
 * @param {Props} props 
 * @returns 
 */
const Hamburger = (props) => {

    let p = Object.assign({}, props);
    p.stroke = props.stroke? props.stroke : env.THEME.dc1;

    return(
        <div className={p.className} {...p}>

            <svg xmlns="http://www.w3.org/2000/svg" 
            fill={p.fill} 
            stroke={p.stroke}
            viewBox="0 0 14 14">

                <svg x="0" y="0">
                    <g
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit={10}
                    strokeWidth={1.5}
                    data-name="Iconly/Light/Hamburger"
                    >
                    <path
                        data-name="Stroke 5"
                        d="M.75.75h16.118M.75 6.607h16.118M.75 12.464h16.118"
                    />
                    </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default Hamburger;