import { FaHistory } from "react-icons/fa";
import styles from './DropDown.module.css'

type DropDownProp<T> = {
    isSingleSelect?: boolean
    input?: boolean
    search?: boolean
    options: { value: T, name: string }[]
    selectOption: (value: T) => void
    resetOptions?: () => void
    selected?: T[]
    closeDropDown?: () => void
    removeOption?: (value: T) => void
}

function DropDown<T>({ isSingleSelect, input, search, options, selectOption, resetOptions, selected, closeDropDown, removeOption }: DropDownProp<T>) {

    return <div className={`${styles.variantContainer} ${input ? styles.input : ''} ${search ? styles.search : ''}`}>
        {!input && !search &&
            <button
                onClick={() => { resetOptions?.(); isSingleSelect && closeDropDown !== undefined && closeDropDown() }}>
                <span>ALL</span>
                <span>{selected?.length === 0 && '✓'}</span>
            </button>}
        {options.map((el, index) =>
            <button
                type='button'
                onClick={() => { selectOption(el.value); isSingleSelect && closeDropDown !== undefined && closeDropDown() }}
                key={index}>
                <div className={styles.titleOption}>
                    {search && <FaHistory style={{fontSize: '10px'}}/>}
                    <span>{el.name}</span>
                </div>
                <span>{selected?.find(item => item === el.value) && '✓'}</span>
                {search && removeOption && <span onClick={(e)=> {e.stopPropagation(); removeOption(el.value)}} className={styles.deleteBtn}>×</span>}
            </button>
        )}
    </div>
}

export default DropDown