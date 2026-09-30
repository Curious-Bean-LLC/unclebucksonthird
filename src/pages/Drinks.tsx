import MenuDisplay from '../components/MenuDisplay'

export default function Drinks() {
  return (
    <>
      <MenuDisplay menuFolder='wine' specialsFolder='wine' />
      <MenuDisplay menuFolder='beer' specialsFolder='beer' />
      <MenuDisplay menuFolder='cocktails' specialsFolder='cocktails' />
    </>
  )
}
