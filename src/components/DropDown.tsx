import styles from './DropDown.module.css'

type DropDownProp<T> = {
    isSingleSelect?: boolean
    input?: boolean
    options: { value: T, name: string }[]
    selectOption: (value: T)=> void
    resetOptions?: ()=> void
    selected?: T[]
    closeDropDown?: ()=> void 
}

function DropDown<T>({ isSingleSelect, input, options, selectOption, resetOptions, selected, closeDropDown}: DropDownProp<T>) {

    return <div className={`${styles.variantContainer} ${input ? styles.input : ''}`}>
        {!input && <button onClick={()=> {resetOptions?.(); isSingleSelect && closeDropDown !== undefined && closeDropDown()}}><span>ALL</span><span>{selected?.length === 0 && '✓'}</span></button>}
        {options.map((el, index) => 
            <button type='button' onClick={()=> {selectOption(el.value); isSingleSelect && closeDropDown !== undefined && closeDropDown()}} key={index}><span>{el.name}</span><span>{selected?.find(item=> item === el.value) && '✓'}</span></button>
        )} 
    </div>
}

export default DropDown