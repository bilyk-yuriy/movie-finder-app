import './Container.css'

type ContainerProp = {
    children: React.ReactNode
}

function Container({ children }: ContainerProp) {

    return <div className="container">
        {children}
    </div>
}

export default Container