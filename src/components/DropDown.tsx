import { FaHistory } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { BASE_URL_IMAGE } from "../constants";
import styles from './DropDown.module.css'

type DropDownProp<T> = {
    isSingleSelect?: boolean
    input?: boolean
    search?: boolean
    options: { value: T, name: string, isHistory?: boolean, poster?: string }[]
    selectOption: (value: T, poster?: string) => void
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
                onClick={() => { selectOption(el.value, el.poster);
                     isSingleSelect && closeDropDown !== undefined && closeDropDown() }}
                key={index}>
                <div className={styles.titleOption}>
                    {search && el.isHistory ? <FaHistory style={{fontSize: '10px', opacity: '0.7'}}/> : <IoSearch style={{fontSize: '10px'}}/>}
                    {search && el.poster && <img src={`${BASE_URL_IMAGE}w92${el.poster}`} className={styles.poster}/>}
                    <span>{el.name}</span>
                </div>
                <span>{selected?.find(item => item === el.value) && '✓'}</span>
                {search && el.isHistory && removeOption && <span onClick={(e)=> {e.stopPropagation(); removeOption(el.value)}} className={styles.deleteBtn}>×</span>}
            </button>
        )}
    </div>
}

export default DropDown