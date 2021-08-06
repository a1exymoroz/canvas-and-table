import { FunctionComponent, memo, useEffect, useRef } from "react";
import { TableItem } from "../Table";
import styles from "./Footer.module.css";

interface FooterProps {
  editItem: TableItem | null;
  addCallback: (item: TableItem) => void;
  editCallback: (item: TableItem) => void;
}

const Component: FunctionComponent<FooterProps> = ({
  addCallback,
  editCallback,
  editItem,
}) => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputTelRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const elements = e.target.elements;
    const item = {
      name: elements.name.value,
      tel: elements.phone.value,
      index: editItem && editItem.index,
    };

    editItem ? editCallback(item) : addCallback(item);
    e.target.reset();
  };

  useEffect(() => {
    if (editItem) {
      (inputNameRef.current as HTMLInputElement).value = editItem.name;
      (inputTelRef.current as HTMLInputElement).value = editItem.tel;
    }
  }, [editItem]);

  return (
    <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
      <div className={styles.form__field}>
        <input
          ref={inputNameRef}
          type="text"
          name="name"
          placeholder="Name*"
          required
        />
      </div>

      <div className={styles.form__field}>
        <input
          ref={inputTelRef}
          type="tel"
          name="phone"
          placeholder="Telephone"
          pattern="[\+]\d{1}\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}"
        />
        <span className={styles.form__error}>
          This field should contain a phone number in the format +7 (123)
          456-78-90
        </span>
      </div>
      <button type="submit">{editItem ? "Edit" : "Add"}</button>
    </form>
  );
};

export const FooterComponent = memo(Component);
