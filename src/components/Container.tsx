import styles from './Container.module.css'

type ContainerProp = {
    children: React.ReactNode
    wide?: boolean
}

function Container({ children, wide }: ContainerProp) {

    return <div className={styles[`container${wide ? '--wide' : ''}`]}>
        {children}
    </div>
}

export default Container