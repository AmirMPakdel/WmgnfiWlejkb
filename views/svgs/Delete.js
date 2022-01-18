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
const Delete = (props) => {

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
                    data-name="Iconly/Light/Delete"
                    >
                    <path
                        data-name="Stroke 1"
                        d="M19.325 9.468s-.543 6.735-.858 9.572a2.238 2.238 0 0 1-2.358 2.174c-2.609.047-5.221.05-7.829-.005a2.214 2.214 0 0 1-2.289-2.162c-.317-2.862-.857-9.579-.857-9.579"
                    />
                    <path data-name="Stroke 3" d="M20.708 6.24H3.75" />
                    <path
                        data-name="Stroke 5"
                        d="M17.441 6.24a1.648 1.648 0 0 1-1.615-1.324L15.583 3.7a1.28 1.28 0 0 0-1.237-.949h-4.228a1.28 1.28 0 0 0-1.242.949l-.243 1.216A1.648 1.648 0 0 1 7.018 6.24"
                    />
                    </g>
                </svg>
                
            </svg>

        </div>
    )
}

export default Delete;