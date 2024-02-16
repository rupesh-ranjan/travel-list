import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    // setItems(items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure want to delete all items ?");

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form(props) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) return;
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    // console.log(newItem);
    props.onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What you need for 😍trip? </h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList(props) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = props.items;
  if (sortBy === "description") {
    sortedItems = props.items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = props.items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={props.onDeleteItem}
            onToggleItems={props.onToggleItems}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input"> Sort by input order </option>
          <option value="description"> Sort by description </option>
          <option value="packed"> Sort by packed status </option>
        </select>
        <button onClick={props.onClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item(props) {
  return (
    <li>
      <input
        type="checkbox"
        checked={props.item.packed}
        value={props.item.packed}
        onChange={() => {
          props.onToggleItems(props.item.id);
        }}
      />
      <span style={props.item.packed ? { textDecoration: "line-through" } : {}}>
        {props.item.quantity} {props.item.description}
      </span>
      <button onClick={() => props.onDeleteItem(props.item.id)}>❌</button>
    </li>
  );
}

function Stats(props) {
  const totalItemCount = props.items.length;
  if (!totalItemCount) {
    return (
      <footer className="stats">
        <em>Start adding some item to your packing list 🚀</em>
      </footer>
    );
  }
  const packedItemCount = props.items.filter((item) => item.packed).length;
  const packedItemPercentage = Math.round(
    (packedItemCount / totalItemCount) * 100
  );
  return (
    <footer className="stats">
      <em>
        {packedItemPercentage === 100
          ? "You got everything! Ready to go 🌏✈️"
          : `💼You have ${totalItemCount} item${
              totalItemCount === 1 ? "" : "s"
            } in your list, and you already packed 
        ${packedItemCount} (${packedItemPercentage}%)`}
      </em>
    </footer>
  );
}
