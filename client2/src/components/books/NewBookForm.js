import React, {useState} from "react";
import "../../styles/NewBookPage.css"
import {addNewBook} from "../../api/BookAPI";
import {Modal} from "react-responsive-modal";
import {useBoundStore} from "../../stores/BoundStore";
import Status from "../common/Status";

function NewBookForm() {
    const {loadingBooks, errorBooks, setLoadingBooks, setErrorBooks} = useBoundStore();
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publishedYear: '',
        genre: '',
        publisher: '',
        cover: '',
        price: '',
        stock: '',
        img: ''
    });
    const fields = [
        {label: 'Title', type: 'text', name: 'title', placeholder: 'Title'},
        {label: 'Author', type: 'text', name: 'author', placeholder: 'Author'},
        {label: 'Genre', type: 'text', name: 'genre', placeholder: 'Genre'},
        {label: 'Publisher', type: 'text', name: 'publisher', placeholder: 'Publisher'},
        {
            label: 'Published year',
            type: 'number',
            name: 'publishedYear',
            placeholder: 'Published Year',
            min: "1800",
            max: "2025"
        },
        {
            label: 'Cover type', type: 'select', name: 'cover', placeholder: 'Select cover type',
            options: [
                {value: 'Softcover', label: 'Softcover'},
                {value: 'Hardcover', label: 'Hardcover'}]
        },
        {label: 'Price', type: 'number', name: 'price', placeholder: 'Price', min: "5"},
        {label: 'In Stock', type: 'number', name: 'stock', placeholder: 'Stock', min: "0"},
        {label: 'Book Cover Image', type: 'text', name: 'img', placeholder: 'Image'}
    ];

    const handleBookAddition = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        setErrors({
            ...errors,
            [name]: '',
        });
    };
    const validateBookForm = () => {
        const newErrors = {};

        fields.forEach((field) => {
            if (!formData[field.name]) {
                newErrors[field.name] = `${field.name} is required.`;
            }
        });

        return newErrors;
    }
    const onOpenBookSuccessModal = () => setOpen(true);
    const onCloseBookSuccessModal = () => setOpen(false);
    const handleCloseBookSuccessModal = () => {
        onCloseBookSuccessModal();

    };
    const handleBookForm = async (e) => {
        setLoadingBooks(true);
        setErrorBooks(null);
        e.preventDefault();
        const newErrors = validateBookForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {

            await addNewBook(formData);
            onOpenBookSuccessModal();
        } catch (error) {
            setLoadingBooks(false);

            if (error.response) {

                if (error.response.data && error.response.data.message) {
                    console.error('Validation Error:', error.response.data.message);
                    setErrorBooks(error.response.data.message);
                } else {
                    console.error('Server Error:', error.response.status);
                    setErrorBooks(`Server error: ${error.response.status}`);
                }
            }
        }
        setLoadingBooks(false);

    }
    return (
        <div className="newBookPage">

            <div id="bookFormArea">
                <h1>ADD A NEW BOOK:</h1>

                <div className="container">
                    <Status loading={loadingBooks} error={errorBooks}>
                        <form id="book-form" autoComplete="on" onSubmit={handleBookForm}>

                            <svg viewBox="0 0 1024 1024" className="icon" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" fill="#000000" height="100px">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M699.4 214.1H424.5c-29 0-52.8-23.8-52.8-52.8V151c0-29 23.8-52.8 52.8-52.8h274.9c29 0 52.8 23.8 52.8 52.8v10.3c0 29-23.8 52.8-52.8 52.8z"
                                        fill="#FFB89A"></path>
                                    <path
                                        d="M770.1 128c-16.6 0-30 13.4-30 30s13.4 30 30 30c25.8 0 50.2 10.2 68.7 28.6 18.4 18.4 28.6 42.8 28.6 68.7v446.3h-71.1c-51 0-92.8 41.7-92.8 92.8v75.8h-451c-25.8 0-50.2-10.2-68.7-28.6-18.4-18.4-28.6-42.8-28.6-68.7V285.2c0-25.8 10.2-50.2 28.6-68.7 18.4-18.4 42.8-28.6 68.7-28.6 16.6 0 30-13.4 30-30s-13.4-30-30-30c-86.7 0-157.2 70.5-157.2 157.2v517.6c0 86.7 70.5 157.2 157.2 157.2h517.6c86.7 0 157.2-70.5 157.2-157.2V285.2c0.1-86.7-70.5-157.2-157.2-157.2z m68.7 743.5c-18.4 18.4-42.8 28.6-68.7 28.6h-32.5l129.7-120.5v23.3c0.1 25.8-10.1 50.2-28.5 68.6z"
                                        fill="#ffffff"></path>
                                    <path
                                        d="M382.7 191.8H640c34.9 0 63.4-28.5 63.4-63.4S674.9 65 640 65H382.7c-34.9 0-63.4 28.5-63.4 63.4s28.6 63.4 63.4 63.4z m0-66.8H640c1.7 0 3.4 1.6 3.4 3.4 0 1.7-1.6 3.4-3.4 3.4H382.7c-1.7 0-3.4-1.6-3.4-3.4 0-1.7 1.7-3.4 3.4-3.4z"
                                        fill="#ffffff"></path>
                                    <path
                                        d="M724.1 499.2h-33c-16.6 0-30 13.4-30 30s13.4 30 30 30h33c16.6 0 30-13.4 30-30s-13.4-30-30-30zM595.4 499.2h-53.3v-51c0-16.6-13.4-30-30-30s-30 13.4-30 30v51H319.3c-16.6 0-30 13.4-30 30s13.4 30 30 30h162.8v181.2c0 16.6 13.4 30 30 30s30-13.4 30-30V559.2h53.3c16.6 0 30-13.4 30-30s-13.4-30-30-30zM512.1 384.3c16.6 0 30-13.4 30-30v-26.4c0-16.6-13.4-30-30-30s-30 13.4-30 30v26.4c0 16.6 13.4 30 30 30z"
                                        fill="#33CC99"></path>
                                </g>
                            </svg>
                            <div className="row">
                                {fields.map((field, index) => (
                                    <div key={index} className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor={field.name}>{field.label}</label>
                                            {field.type === 'select' ? (
                                                <select
                                                    className="form-control"
                                                    id={field.name}
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleBookAddition}>
                                                    <option value="">{field.placeholder}</option>
                                                    {field.options.map((option, optIndex) => (
                                                        <option key={optIndex} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    className="form-control"
                                                    id={field.name}
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.name]}
                                                    onChange={handleBookAddition}
                                                    {...(field.type === 'number' && {
                                                        min: field.min,
                                                        max: field.max,
                                                    })}/>
                                            )}
                                            {errors[field.name] && (
                                                <small className="text-danger">{errors[field.name]}</small>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button
                                    type="submit"
                                    className="btn btn-outline-light btn-lg"
                                    value="Submit"
                                    id="submit"
                                    style={{marginTop: "50px"}}>
                                    Add book
                                </button>
                                <Modal open={open} onClose={handleCloseBookSuccessModal} center>
                                    <div style={{padding: "50px"}}>
                                        <h1>Book added successfully! :D</h1>
                                    </div>
                                </Modal>
                            </div>
                        </form>
                    </Status>
                </div>
            </div>


        </div>
    );
}


export default NewBookForm;
