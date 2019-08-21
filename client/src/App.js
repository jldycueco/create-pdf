import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

export default function App() {
  const [values, setValues] = useState({
    name: '',
    receiptId: '',
    price1: '',
    price2: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = () => {
    setValues({
      name: '',
      receiptId: '',
      price1: '',
      price2: '',
    });
  };

  const createAndDownloadPDF = () => {
    axios
      .post('/create-pdf', values)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], {
          type: 'application/pdf',
        });

        saveAs(pdfBlob, 'reciept.pdf');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createAndDownloadPDF();
    resetForm();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={handleChange}
          value={values.name}
        />
        <input
          type="number"
          placeholder="Receipt ID"
          name="receiptId"
          onChange={handleChange}
          value={values.receiptId}
        />
        <input
          type="number"
          placeholder="Price 1"
          name="price1"
          onChange={handleChange}
          value={values.price1}
        />
        <input
          type="number"
          placeholder="Price 2"
          name="price2"
          onChange={handleChange}
          value={values.price2}
        />
        <button type="submit">Download PDF</button>
      </form>
    </>
  );
}
