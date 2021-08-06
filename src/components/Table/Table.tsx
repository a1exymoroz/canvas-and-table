import { FunctionComponent, useCallback, useState } from "react";
import { ContentComponent } from "./Content/Content";
import { FooterComponent } from "./Footer/Footer";
import styles from "./Table.module.css";

export interface TableItem {
  tel: string;
  name: string;
  index?: number | null;
}

const initData = [
  {
    tel: "+7 (123) 456-78-90",
    name: "Alex",
  },
  {
    tel: "+7 (123) 456-78-90",
    name: "Brian",
  },
  {
    tel: "+7 (123) 456-78-90",
    name: "Timon",
  },
  {
    tel: "+7 (123) 456-78-90",
    name: "David",
  },
];

export const TableComponent: FunctionComponent = () => {
  const [items, setItems] = useState<TableItem[]>(initData);
  const [editItem, setEditItem] = useState<TableItem | null>(null);

  const removeHandleClick = useCallback((i: number) => {
    setItems((prev) => prev.filter((_, index) => index !== i));
  }, []);

  const addHandleClick = useCallback((item: TableItem) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const editHandleClick = useCallback((item: TableItem) => {
    setItems((prev) => {
      const clone = [...prev];
      if (item.index) {
        clone.splice(item.index, 1, item);
      }
      return clone;
    });

    setEditItem(null);
  }, []);

  const setEditItemHandle = useCallback(
    (item: TableItem) => setEditItem(item),
    []
  );

  return (
    <main className={styles.main}>
      <ContentComponent
        items={items}
        editItem={editItem}
        editCallback={setEditItemHandle}
        removeCallback={removeHandleClick}
      ></ContentComponent>
      <FooterComponent
        editItem={editItem}
        addCallback={addHandleClick}
        editCallback={editHandleClick}
      ></FooterComponent>
    </main>
  );
};
