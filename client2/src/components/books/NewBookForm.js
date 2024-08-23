import React, {useState} from "react";
import "../../styles/NewBookPage.css"
import {addNewBook} from "../../api/BookAPI";
import {Modal} from "react-responsive-modal";

function NewBookForm() {
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
        e.preventDefault();
        const newErrors = validateBookForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const response = await addNewBook(formData);
        } catch (error) {
            console.error('book add failed:', error.response ? error.response.data : error.message);

        }
        onOpenBookSuccessModal();
    }
    return (
        <div className="newBookPage">

            <div id="bookFormArea">
                <h1>ADD A NEW BOOK:</h1>
                <div className="container">

                    <form id="book-form" autoComplete="on" onSubmit={handleBookForm}>
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
                                                onChange={handleBookAddition}
                                            >
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
                                                })}
                                            />
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
                                style={{marginTop: "50px"}}
                            >
                                Add book
                            </button>
                            <Modal open={open} onClose={handleCloseBookSuccessModal} center>
                                <div style={{padding: "50px"}}>
                                    <h1>Book added successfully! :D</h1>
                                </div>
                            </Modal>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    );
}


export default NewBookForm;
