type Props = {
  data: String[];
};

function List({ data }: Props) {
  return (
    <ul className="list-group">
      {data.map((elemento) => (
        <li className="list-group-item">{elemento}</li>
      ))}
    </ul>
  );
}

export default List;
