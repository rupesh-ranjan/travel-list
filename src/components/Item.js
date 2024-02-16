export default function Item(props) {
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
