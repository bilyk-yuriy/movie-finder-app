import { useState, useEffect, useRef } from "react"

function useListRef<T>(items: T[], quantityScroll: number) {

     const listRef = useRef<HTMLDivElement>(null)
    
            const [atStart, setAtStart] = useState(true)
            const [atEnd, setAtEnd] = useState(false)
        
            useEffect(()=> {
                const container = listRef.current
                if (!container) return 
                if (container.children.length === 0) return
        
                const firstItem = container.children[0] as HTMLElement
                const lastItem = container.children[container.children.length - 1] as HTMLElement
        
                const observer = new IntersectionObserver(
                    (entries)=> {
                        for (const entry of entries) {
                            if (entry.target === firstItem) setAtStart(entry.isIntersecting)
                            if (entry.target === lastItem) setAtEnd(entry.isIntersecting)
                        }
                    }, {root: container, threshold: 1}
                )
        
                observer.observe(firstItem)
                observer.observe(lastItem)
        
                return ()=> observer.disconnect()
        
            }, [items])
    
        function scrollList(direction: 'left' | 'right') {
    
            if (!listRef.current) return
    
            const card = listRef.current?.children[0] as HTMLElement
            const cardWidth = card.clientWidth + 20
    
            const remainder = listRef.current.scrollLeft % cardWidth
    
            const forwardLeft = remainder === 0 ? cardWidth * (quantityScroll) : cardWidth * (quantityScroll) + remainder
            const forwardRight = remainder === 0 ? cardWidth * (quantityScroll) : cardWidth * (quantityScroll) + (cardWidth - remainder)
            
            listRef.current?.scrollBy({
                left: direction === 'left' ? -(forwardLeft) : forwardRight,
                behavior: 'smooth'
            })
        }

    return {listRef, atStart, atEnd, scrollList}
}

export default useListRef