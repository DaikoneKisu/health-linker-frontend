import React from 'react';
import ReactQuill from 'react-quill';
import { FieldProps } from 'formik';
import 'react-quill/dist/quill.snow.css';

// Opciones de la barra de herramientas
const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['color', 'background'],
      ['clean'],
      ['code-block']
    ],
  };
  
  // Formatos permitidos
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'color',
    'background',
    'code-block'
  ];

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
            modules={modules}
            formats={formats}
            style={{ height: '200px', marginBottom:'50px' }}
        />
    )
}

export default QuillEditor;