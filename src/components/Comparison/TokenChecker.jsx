import React, {useRef} from 'react'

export const TokenChecker = props => {
    const {coin_id, init, onChange} = props
    const checkRef = useRef()
    const onChangeHandler = e => {
        let checked = checkRef.current.checked
        onChange(coin_id, checked)
    }
    return (
        <input
            type="checkbox"
            className="checkbox"
            checked={init}
            ref={checkRef}
            onChange={(e) => {onChangeHandler(e)}}
          />
    )
}