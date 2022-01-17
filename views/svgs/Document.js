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
const Document = (props) => {

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
                    data-name="Iconly/Light/Document"
                    >
                    <path data-name="Stroke 1" d="M15.716 16.223h-7.22" />
                    <path data-name="Stroke 2" d="M15.716 12.037h-7.22" />
                    <path data-name="Stroke 3" d="M11.251 7.86H8.496" />
                    <path
                        data-name="Stroke 4"
                        d="M15.909 2.75H8.22a4.251 4.251 0 0 0-4.469 4.607v9.2a4.254 4.254 0 0 0 4.506 4.603h7.689a4.252 4.252 0 0 0 4.47-4.6v-9.2a4.255 4.255 0 0 0-4.507-4.61Z"
                    />
                    </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default Document;