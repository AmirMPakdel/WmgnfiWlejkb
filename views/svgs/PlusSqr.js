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
                    <path d="M12 8.327v7.326M15.666 11.991H8.333M16.686 2H7.314C4.048 2 2 4.312 2 7.585v8.83C2 19.688 4.038 22 7.314 22h9.371C19.962 22 22 19.688 22 16.415v-8.83C22 4.312 19.962 2 16.686 2Z" />
                    </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default Document;