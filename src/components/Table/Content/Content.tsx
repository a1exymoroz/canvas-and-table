import { FunctionComponent, memo } from "react";
import { TableItem } from "../Table";
import "./Content.css";

interface ContentProps {
  items: TableItem[];
  editItem: TableItem | null;
  editCallback: (item: TableItem) => void;
  removeCallback: (i: number) => void;
}

const Component: FunctionComponent<ContentProps> = ({
  items,
  editItem,
  editCallback,
  removeCallback,
}) => {
  return (
    <table>
      <caption>User telephones</caption>
      <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Name</th>
          <th scope="col">Telephone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ tel, name }, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index}</th>
              <td>{name}</td>
              <td>{tel}</td>
              <td>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    editCallback({ tel, name, index });
                  }}
                  disabled={!!editItem}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCallback(index);
                  }}
                  disabled={!!editItem}
                >
                  Remove
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const ContentComponent = memo(Component);
