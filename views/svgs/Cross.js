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
const Cross = (props) => {

    let p = Object.assign({}, props);
    p.stroke = props.stroke? props.stroke : env.THEME.lc1;

    return(
        <div className={p.className} {...p}>

            <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12">

                <svg x="0" y="0">
                <g data-name="cross/light">
                <g data-name="Iconly/Light/Arrow - Left 2">
                    <g data-name="Arrow - Left 2">
                    <path
                        data-name="Stroke 1"
                        d="m1.061 11.495 5.217-5.217-5.217-5.217"
                        fill="none"
                        stroke={p.stroke}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={1.5}
                    />
                    </g>
                </g>
                <g data-name="Iconly/Light/Arrow - Left 2">
                    <g data-name="Arrow - Left 2">
                    <path
                        data-name="Stroke 1"
                        d="M11.495 11.495 6.278 6.278l5.217-5.217"
                        fill="none"
                        stroke={p.stroke}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={1.5}
                    />
                    </g>
                </g>
                </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default Cross;