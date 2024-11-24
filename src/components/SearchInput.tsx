import { IonIcon, IonInput } from "@ionic/react";
import { Field, FieldProps, Form, Formik } from "formik";
import styles from "../common.module.css";
import { search } from "ionicons/icons";

interface SearchInputProps {
  onSearch: (search: string) => void;
  label: string;
  placeholder: string;
}

export default function SearchInput({
  onSearch,
  label,
  placeholder,
}: SearchInputProps) {
  return (
    <Formik
      initialValues={{ currentSearch: "" }}
      onSubmit={(values) => {
        onSearch(values.currentSearch);
      }}
    >
      {() => (
        <Form className={`${styles.searchContainer}`}>
          <Field name="currentSearch">
            {({ field }: FieldProps) => (
              <IonInput
                className={`${styles.search}`}
                label={label}
                labelPlacement="stacked"
                placeholder={placeholder}
                fill="outline"
                type="search"
                value={field.value}
                name={field.name}
                onIonBlur={field.onBlur}
                onIonInput={field.onChange}
              >
                <IonIcon slot="start" icon={search} />
              </IonInput>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
}
