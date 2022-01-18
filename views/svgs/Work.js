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
const Work = (props) => {

    let p = Object.assign({}, props);
    p.stroke = props.stroke? props.stroke : env.THEME.lc1;

    return(
        <div className={p.className} {...p}>

            <svg xmlns="http://www.w3.org/2000/svg" 
            fill={p.fill} 
            stroke={p.stroke}
            viewBox="0 0 28 28">

                <svg x="0" y="0">
                    <g
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit={10}
                    strokeWidth={1.5}
                    data-name="Iconly/Light/Work"
                    >
                    <path
                        data-name="Stroke 1"
                        d="M3.505 19.346s.178 2.173.219 2.858a4.779 4.779 0 0 0 1 2.658 3.71 3.71 0 0 0 3.139 1.368h14.336a3.71 3.71 0 0 0 3.136-1.369 4.79 4.79 0 0 0 1-2.658c.04-.685.218-2.858.218-2.858"
                    />
                    <path
                        data-name="Stroke 3"
                        d="M10.62 6.662v-.464a2.759 2.759 0 0 1 2.76-2.76h3.228a2.76 2.76 0 0 1 2.76 2.76v.464"
                    />
                    <path data-name="Stroke 5" d="M14.993 20.848V19.23" />
                    <path
                        data-name="Stroke 7"
                        d="M3.437 10.487v4.333a20.409 20.409 0 0 0 8.422 3.128 3.225 3.225 0 0 1 6.231.012 20.407 20.407 0 0 0 8.459-3.14v-4.333a3.813 3.813 0 0 0-3.821-3.823H7.271a3.824 3.824 0 0 0-3.834 3.823Z"
                    />
                    </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default Work;