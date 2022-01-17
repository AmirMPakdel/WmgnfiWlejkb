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
const Profile = (props) => {

    let p = Object.assign({}, props);
    p.stroke = env.THEME.lc1;

    return(
        <div className={p.className} {...p}>

            <svg xmlns="http://www.w3.org/2000/svg" 
            fill={p.fill} 
            stroke={p.stroke}
            viewBox="0 0 26 26">

                <svg x="1" y="0">
                    <g
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit={10}
                    strokeWidth={1.5}
                    data-name="Iconly/Light/Profile"
                    >
                    <circle cx={6.214} cy={7} r={6.214} transform="translate(3.9 0)"/>
                    <path transform="translate(0.8 0)" d="M0 21.07a2.881 2.881 0 0 1 .286-1.261c.595-1.191 2.273-1.822 3.666-2.107A21.833 21.833 0 0 1 7 17.273a32.582 32.582 0 0 1 5.7 0 22.083 22.083 0 0 1 3.048.429c1.393.286 3.071.857 3.667 2.107a2.952 2.952 0 0 1 0 2.536c-.6 1.25-2.274 1.821-3.667 2.1a20.44 20.44 0 0 1-3.048.44 33.582 33.582 0 0 1-4.641.063A5.288 5.288 0 0 1 7 24.88a20.059 20.059 0 0 1-3.036-.44c-1.405-.274-3.071-.846-3.678-2.092A2.964 2.964 0 0 1 0 21.07Z" />
                    </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default Profile;