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
const Logout = (props) => {

    let p = Object.assign({}, props);
    p.stroke = props.stroke? props.stroke : env.THEME.dc1;

    return(
        <div className={p.className} {...p}>

            <svg xmlns="http://www.w3.org/2000/svg" 
            fill={p.fill} 
            stroke={p.stroke}
            viewBox="0 0 24 24">

                <svg x="2" y="2">
                    <g
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit={10}
                    strokeWidth={1.5}
                    data-name="Iconly/Light/Logout"
                    >
                    <path
                        data-name="Stroke 1"
                        d="M7.543 5.368v-.933A3.685 3.685 0 0 1 11.228.75h4.875a3.685 3.685 0 0 1 3.684 3.685v11.13a3.685 3.685 0 0 1-3.684 3.685h-4.885a3.675 3.675 0 0 1-3.675-3.674v-.943"
                    />
                    <path data-name="Stroke 3" d="M.75 10h12.041" />
                    <path data-name="Stroke 5" d="M3.678 7.085.75 10l2.928 2.916" />
                    </g>
                </svg>

            </svg>

        </div>
    )
}

export default Logout;