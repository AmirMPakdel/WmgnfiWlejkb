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
const Notification = (props) => {

    let p = Object.assign({}, props);
    p.stroke = env.THEME.dc1;

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
                    data-name="Iconly/Light/Notification"
                    >
                    <path d="M3.5 13.787v-.219a3.6 3.6 0 0 1 .6-1.818 4.87 4.87 0 0 0 1.2-2.314c0-.666 0-1.342.058-2.009C5.655 4.218 8.827 2 11.961 2h.078c3.134 0 6.306 2.218 6.617 5.427.058.666 0 1.342.049 2.009a4.955 4.955 0 0 0 1.195 2.323 3.506 3.506 0 0 1 .6 1.809v.209a3.566 3.566 0 0 1-.844 2.39 4.505 4.505 0 0 1-2.856 1.371 45.078 45.078 0 0 1-9.615 0 4.554 4.554 0 0 1-2.85-1.371 3.6 3.6 0 0 1-.835-2.38ZM9.555 20.852a3.061 3.061 0 0 0 2.037 1.127 3.088 3.088 0 0 0 2.251-.627 2.886 2.886 0 0 0 .524-.5" />
                    </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default Notification;