import React from 'react';
import ReactQuill from 'react-quill';
import { FieldProps } from 'formik';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps extends FieldProps {
    placeholder?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ field, form, placeholder}) => {
    const handleChange = (content: string) => {
        form.setFieldValue(field.name, content);
    };

    return (
        <ReactQuill 
            value={field.value}
            onChange={handleChange}
            onBlur={() => form.setFieldTouched(field.name, true)}
            theme="snow"
            placeholder={placeholder}
            style={{ height: '200px', marginBottom:'50px' }}
        />
    )
}

export default QuillEditor;