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
const Activity = (props) => {

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
                    data-name="Iconly/Light/Activity"
                    >
                    <path d="m5.245 13.282 2.993-3.889 3.414 2.68 2.929-3.78" />
                    <circle
                        cx={1.922}
                        cy={1.922}
                        r={1.922}
                        transform="translate(16.073 .778)"
                    />
                    <path d="M12.924 1.62H5.657C2.645 1.62.778 3.753.778 6.764v8.082c0 3.011 1.831 5.135 4.879 5.135h8.6c3.011 0 4.879-2.124 4.879-5.135V7.808" />
                    </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default Activity;