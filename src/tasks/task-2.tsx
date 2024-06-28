type MyComponentProps<T> = {
  items: T[]
  defaultItem: T
}
// function MyComponent<T>(props: MyComponentProps<T>) {
//   console.log(props)
//   return <p>some content</p>
// }
//
// const App = () => {
//   const users: User[] = [
//     { name: 'Bilbo', age: 111 },
//     { name: 'Frodo', age: 33 },
//   ]
//
//   return (
//     <>
//       <MyComponent items={['react', 'typescript']} defaultItem={'redux'} />
//       <MyComponent items={users} defaultItem={{ name: 'Bilbo', age: 111 }} />
//     </>
//   )
// }

const MyComponent = <T, >(props: MyComponentProps<T>) => { // Difference between using generics with arrow function component and function declaration component
  console.log(props)
  return <p>some content</p>
}

const App = () => {
  const users: User[] = [
    { name: 'Bilbo', age: 111 },
    { name: 'Frodo', age: 33 },
  ]
  return (
      <>
        <MyComponent items={['react', 'typescript']} defaultItem={'redux'} />
        <MyComponent items={users} defaultItem={{ name: 'Bilbo', age: 111 }} />
      </>
  )
}

type User = {
  name: string
  age: number
}
