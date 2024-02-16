import { useState } from "react";
import Item from "./Item";

export default function PackingList(props) {
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
