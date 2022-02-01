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
const Setting = (props) => {

    let p = Object.assign({}, props);
    p.stroke = props.stroke? props.stroke : env.THEME.lc1;

    return(
        <div className={p.className} {...p}>

            <svg xmlns="http://www.w3.org/2000/svg" 
            fill={p.fill} 
            stroke={p.stroke}
            viewBox="0 0 21 21">

                <svg x="0" y="0">
                    <g
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit={10}
                    strokeWidth={1.5}
                    data-name="Iconly/Light/Setting"
                    >
                        <path d="m18.307 6.124-.622-1.08a1.913 1.913 0 0 0-2.609-.7h0a1.9 1.9 0 0 1-2.609-.677 1.831 1.831 0 0 1-.256-.915h0A1.913 1.913 0 0 0 10.298.778H9.044a1.9 1.9 0 0 0-1.9 1.913h0a1.913 1.913 0 0 1-1.917 1.887 1.831 1.831 0 0 1-.915-.256h0a1.913 1.913 0 0 0-2.609.7l-.668 1.1a1.913 1.913 0 0 0 .7 2.609h0a1.913 1.913 0 0 1 .957 1.657 1.913 1.913 0 0 1-.957 1.657h0a1.9 1.9 0 0 0-.7 2.6h0l.632 1.089a1.913 1.913 0 0 0 2.612.744h0a1.895 1.895 0 0 1 2.6.7 1.831 1.831 0 0 1 .256.915h0a1.913 1.913 0 0 0 1.913 1.913h1.25a1.913 1.913 0 0 0 1.913-1.9h0a1.9 1.9 0 0 1 1.913-1.913 1.95 1.95 0 0 1 .915.256h0a1.913 1.913 0 0 0 2.609-.7h0l.659-1.1a1.9 1.9 0 0 0-.7-2.609h0a1.9 1.9 0 0 1-.7-2.609 1.876 1.876 0 0 1 .7-.7h0a1.913 1.913 0 0 0 .7-2.6h0Z" />
                        <circle
                            cx={2.636}
                            cy={2.636}
                            r={2.636}
                            transform="translate(7.039 7.753)"
                        />
                    </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default Setting;