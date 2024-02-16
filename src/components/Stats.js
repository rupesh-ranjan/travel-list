export default function Stats(props) {
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
