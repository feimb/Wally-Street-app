export default function AssetFilters({
  search,
  setSearch,
  order,
  setOrder,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice
}) {

return (
  <div className="flex gap-3 items-center">

    <input
      value={search}
      placeholder="Buscar"
      onChange={(e)=>setSearch(e.target.value)}
      className="border rounded px-3 py-2"
    />

<input
  type="number"
  value={minPrice}
  placeholder="Mínimo"
  onChange={(e) => {
    const valor = Number(e.target.value);

    if (valor <= 0) {
      setMinPrice("");
    } else {
      setMinPrice(valor);
    }
  }}
  className="border rounded px-2 py-2 w-32"
/>

<input
  type="number"
  value={maxPrice}
  placeholder="Máximo"
  onChange={(e) => {
    const valor = Number(e.target.value);

    if (valor <= 0) {
      setMaxPrice("");
    } else {
      setMaxPrice(valor);
    }
  }}
  className="border rounded px-2 py-2 w-32"
/>

<select
  value={order}
  onChange={(e) => setOrder(e.target.value)}
  className="bg-zinc-950 text-white border border-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
>
  <option value="">Ordenar</option>
  <option value="asc">Menor Precio </option>
  <option value="desc">Mayor Precio </option>
  <option value="a-z">A-Z</option>
  <option value="z-a">Z-A</option>
</select>

  </div>
);
}