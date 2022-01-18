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
const Upload = (props) => {

    let p = Object.assign({}, props);
    p.stroke = props.stroke? props.stroke : env.THEME.dc1;

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
                    data-name="Iconly/Light/Upload"
                    >
                    <path
                        data-name="Stroke 1"
                        d="M7.389 8.984h-.933a3.685 3.685 0 0 0-3.685 3.685v4.875a3.685 3.685 0 0 0 3.685 3.684h11.13a3.685 3.685 0 0 0 3.685-3.684v-4.885a3.675 3.675 0 0 0-3.674-3.675h-.943"
                    />
                    <path data-name="Stroke 3" d="M12.021 2.191v12.041" />
                    <path data-name="Stroke 5" d="m9.106 5.119 2.915-2.928 2.916 2.928" />
                    </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default Upload;