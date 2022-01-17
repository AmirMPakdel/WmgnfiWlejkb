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
const ArrowUpSqr = (props) => {

    let p = Object.assign({}, props);
    p.stroke = env.THEME.lc1;

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
                    data-name="Iconly/Light/ArrowUpSqr"
                    >
                    <path
                        data-name="Stroke 1"
                        d="M16.334 2.75H7.665c-3.02 0-4.915 2.139-4.915 5.166v8.168c0 3.027 1.885 5.166 4.915 5.166h8.669c3.03 0 4.916-2.139 4.916-5.166V7.916c0-3.027-1.886-5.166-4.916-5.166Z"
                    />
                    <path data-name="Stroke 3" d="M12 7.914v8.172" />
                    <path data-name="Stroke 5" d="M8.248 11.678 12 7.914l3.748 3.764" />
                    </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default ArrowUpSqr;