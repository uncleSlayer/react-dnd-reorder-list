import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

const Card = ({
    name,
    description,
    index,
    moveCard
}: {
    name: string,
    description: string,
    index: number,
    moveCard: (dragIndex: number, hoverIndex: number) => void
}) => {

    const ref = React.useRef<HTMLDivElement>(null)

    const [{ isDragging }, drag] = useDrag({
        type: "todo",
        item: {
            name,
            description,
            index
        },
        collect: (monitor) => { 

            return {
                isDragging: monitor.isDragging(),
            }
        },
    }) 

    const [{ handlerId }, drop] = useDrop({
        accept: "todo",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item, monitor) {
            if (!ref.current) return

            // @ts-ignore
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current.getBoundingClientRect()
            
            const clientOffset = monitor.getClientOffset()

            if (!clientOffset) return

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const hoverClientY = clientOffset.y - hoverBoundingRect.top


            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

            moveCard(dragIndex, hoverIndex)

            // @ts-ignore
            item.index = hoverIndex

        }
    })

    drag(drop(ref))

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '5px',
            padding: '10px',
            border: '1px dashed black',
            width: '50%',
            margin: 'auto auto',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
            cursor: 'move',
            opacity: isDragging ? 0.5 : 1,
        }}
            ref={ref}
        >
            <span style={{ color: 'black', userSelect: 'none' }}>{name}</span>
            <p style={{ color: 'gray', userSelect: 'none' }}>{description}</p>
        </div>
    )
}

export default Card