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
const Category = (props) => {

    let p = Object.assign({}, props);
    p.stroke = props.stroke? props.stroke : env.THEME.lc1;

    return(
        <div className={p.className} {...p}>

            <svg xmlns="http://www.w3.org/2000/svg" 
            fill={p.fill} 
            stroke={p.stroke}
            viewBox="0 0 24 24">

                <svg x="0" y="0">
                    <g
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit={10}
                    strokeWidth={1.5}
                    data-name="Iconly/Light/Category"
                    >
                    <path
                        data-name="Stroke 1"
                        d="M16.286 2h3.267A2.459 2.459 0 0 1 22 4.47v3.294a2.46 2.46 0 0 1-2.448 2.47h-3.266a2.46 2.46 0 0 1-2.449-2.47V4.47A2.46 2.46 0 0 1 16.286 2Z"
                    />
                    <path
                        data-name="Stroke 3"
                        d="M4.449 2h3.265a2.46 2.46 0 0 1 2.449 2.47v3.294a2.46 2.46 0 0 1-2.449 2.47H4.449A2.46 2.46 0 0 1 2 7.764V4.47A2.46 2.46 0 0 1 4.449 2Z"
                    />
                    <path
                        data-name="Stroke 5"
                        d="M4.449 13.766h3.265a2.46 2.46 0 0 1 2.449 2.471v3.293A2.46 2.46 0 0 1 7.714 22H4.449A2.46 2.46 0 0 1 2 19.53v-3.293a2.46 2.46 0 0 1 2.449-2.471Z"
                    />
                    <path
                        data-name="Stroke 7"
                        d="M16.286 13.766h3.267A2.46 2.46 0 0 1 22 16.237v3.293A2.459 2.459 0 0 1 19.552 22h-3.266a2.46 2.46 0 0 1-2.449-2.47v-3.293a2.46 2.46 0 0 1 2.449-2.471Z"
                    />
                    </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default Category;