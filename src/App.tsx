import React, { useCallback } from 'react'
import Card from './components/Card'
import update from 'immutability-helper'

const App = () => {

  const [todoList, setTodoList] = React.useState<{
    name: string,
    description: string
  }[]>([
    {
      name: 'Learn React',
      description: 'Learn React from scratch'
    },
    {
      name: 'Learn React DnD',
      description: 'Learn React DnD from scratch'
    },
    {
      name: 'Learn React Router',
      description: 'Learn React Router from scratch'
    },
    {
      name: 'Learn React Query',
      description: 'Learn React Query from scratch'
    },
    {
      name: 'Learn React Hooks',
      description: 'Learn React Hooks from scratch'
    },
    {
      name: 'Learn React Context',
      description: 'Learn React Context from scratch'
    },
    {
      name: 'Learn React Redux',
      description: 'Learn React Redux from scratch'
    }
  ])

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {

    const draggedCard = todoList[dragIndex]

    setTodoList(update(todoList, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, draggedCard]
      ]
    }))

  }, [todoList])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      gap: '10px',
      width: '100%',
      height: '100%',
    }}>
      {
        todoList.map((todo, index) => (
          <Card moveCard={moveCard} index={index} key={index} name={todo.name} description={todo.description} />
        ))
      }
    </div>
  )
}

export default App
