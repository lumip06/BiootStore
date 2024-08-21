
import React, {useState} from "react";
import "../../styles/NewBookPage.css"
import {registerUser} from "../../api/UserAPI";
import {addNewBook} from "../../api/BookAPI";
function NewBookForm() {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        title:'',
        author: '',
        publishedYear:0,
        genre:"",
        publisher:"",
        cover:"",
        price:"",
        stock:"",
        img:""
    });
    const fields = [
        { label: 'Title', type: 'text', name: 'title', placeholder: 'Title'},
        { label: 'Author', type: 'text', name: 'author', placeholder: 'Author' },
        { label: 'Genre', type: 'text', name: 'genre', placeholder: 'Genre' },
        { label: 'Publisher', type: 'text', name: 'publisher', placeholder: 'Publisher' },
        { label: 'Published year', type: 'text', name: 'publishedYear', placeholder: 'Published Year' },
        {label: 'Cover type', type: 'select', name: 'cover', placeholder: 'Select cover type',
            options: [
                { value: 'Softcover', label: 'Softcover' },
                { value: 'Hardcover', label: 'Hardcover' }]
        },
        { label: 'Price', type: 'number', name: 'price', placeholder: 'Price'  },
        { label: 'In Stock', type: 'number', name: 'stock', placeholder: 'Stock' },
        { label: 'Book Cover Image', type: 'text', name: 'img', placeholder: 'Image' }
    ];
    const handleBookAddition = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        setErrors({
            ...errors,
            [name]: '',
        });
    };
    const validateBookForm=()=>{
        const newErrors = {};

        fields.forEach((field) => {
            if (!formData[field.name]) {
                newErrors[field.name] = `${field.name} is required.`;
            }
        });

        return newErrors;
    }
    const handleBookForm = async (e)=>{
        e.preventDefault();
        const newErrors = validateBookForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try{
            const response = await addNewBook(formData);
        }catch(error){
            console.error('book add failed:', error.response ? error.response.data : error.message);

        }

    }
    return (
        <div className="newBookPage">
            <div id="bookFormArea">
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
                            >
                                Add book
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    );
}


export default NewBookForm;
