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
const EditSqr = (props) => {

    let p = Object.assign({}, props);
    p.stroke = props.stroke? props.stroke : env.THEME.dc1;

    return(
        <div className={p.className} {...p}>

            <svg xmlns="http://www.w3.org/2000/svg" 
            fill={p.fill} 
            stroke={p.stroke}
            viewBox="0 0 23 23">

                <svg x="0" y="0">
                    <g
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit={10}
                    strokeWidth={1.5}
                    data-name="Iconly/Light/EditSqr"
                    >
                    <path
                        data-name="Stroke 1"
                        d="M11.492 2.789H7.75c-3.072 0-5 2.177-5 5.259v8.314c0 3.082 1.919 5.259 5 5.259h8.824c3.085 0 5-2.177 5-5.259v-4.028"
                    />
                    <path
                        data-name="Stroke 3"
                        d="m8.828 10.92 7.471-7.47a2.385 2.385 0 0 1 3.371 0l1.219 1.214a2.383 2.383 0 0 1 0 3.371l-7.509 7.51a2.171 2.171 0 0 1-1.535.636H8.099l.094-3.78a2.17 2.17 0 0 1 .635-1.481Z"
                    />
                    <path data-name="Stroke 5" d="m15.165 4.602 4.566 4.566" />
                    </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default EditSqr;