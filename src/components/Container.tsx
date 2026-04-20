import './Container.css'

type ContainerProp = {
    children: React.ReactNode
    wide?: boolean
}

function Container({ children, wide }: ContainerProp) {

    return <div className={`container${wide ? '--wide' : ''}`}>
        {children}
    </div>
}

export default Container