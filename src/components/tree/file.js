import React, { useState, useEffect } from 'react'
import './styles.scss'
import { Tooltip } from 'reactstrap'

const File = ({ title, path }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false)

    const toggle = () => setTooltipOpen(!tooltipOpen);

    useEffect(() => {

    }, [])

    const onClick = () => {
        // console.log(`ballboy ${title} >>>`, path)
    }

    return (
        <>
            <div
                className={'File'}
                onClick={onClick}
                onMouseEnter={toggle}
                onMouseLeave={toggle}
            >{title}</div>
            {/* <Tooltip
                isOpen={tooltipOpen}
                target={path.replaceAll(' ', '').replaceAll('/', '')}
                toggle={toggle}
            >
                Hello world!
            </Tooltip> */}
        </>
    )
}

export default File