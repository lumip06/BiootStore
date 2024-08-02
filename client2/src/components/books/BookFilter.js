import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

class BookFilter extends React.Component {
    handleChange = (event) => {
        const { name, value, checked } = event.target;
        this.props.onFilterChange(name, value, checked);
    };
    render() {
        return <div id="filter-area">
            <div className="form-check">
                <div className="form-check">
                    <p className="fs-1">Subcategorii</p>

                    <input onChange={this.handleChange} className="form-check-input" type="checkbox" name="genre" value="Fantasy" id="checkSubcategoriiFantasy"/>
                    <label className="form-check-label" htmlFor="checkSubcategoriiFantasy">Fantasy</label><br/>

                    <input onChange={this.handleChange} className="form-check-input" type="checkbox" name="genre" value="Romance" id="checkSubcategoriiRomance"/>
                    <label className="form-check-label" htmlFor="checkSubcategoriiRomance">Romance</label><br/>

                    <input onChange={this.handleChange}className="form-check-input" type="checkbox" name="genre" value="Thriller"
                           id="checkSubcategoriiThriller"/>
                    <label className="form-check-label" htmlFor="checkSubcategoriiThriller">Thriller</label><br/>


                    <p className="fs-1">Pret</p>

                    <input onChange={this.handleChange} className="form-check-input" type="checkbox" name="price" value="<50" id="checkPret1"/>
                    <label className="form-check-label" htmlFor="checkPret1">0-50</label><br/>

                    <input onChange={this.handleChange} className="form-check-input" type="checkbox" name="price" value="<100" id="checkPret2"/>
                    <label className="form-check-label" htmlFor="checkPret2">50-100</label><br/>

                    <input onChange={this.handleChange} className="form-check-input" type="checkbox" name="price" value="<150" id="checkPret3"/>
                    <label className="form-check-label" htmlFor="checkPret3">100+</label><br/>


                    <p className="fs-1">Editura</p>

                    <input onChange={this.handleChange} className="form-check-input" type="checkbox" name="publisher" value="Litera" id="checkEdituraLitera"/>
                    <label className="form-check-label" htmlFor="checkEdituraLitera">Litera</label><br/>

                    <input onChange={this.handleChange} className="form-check-input" type="checkbox" name="publisher" value="RAO" id="checkEdituraRAO"/>
                    <label className="form-check-label" htmlFor="checkEdituraRAO">RAO</label><br/>

                    <p className="fs-1">Data publicarii</p>
                    <input onChange={this.handleChange} className="form-check-input" type="checkbox" name="publishedYear" value="<1900" id="checkAnCurent"/>
                    <label className="form-check-label" htmlFor="checkAnCurent">inainte de 1900</label><br/>

                    <input onChange={this.handleChange} className="form-check-input" type="checkbox" name="publishedYear" value=">1800" id="checkAniAnteriori"/>
                    <label className="form-check-label" htmlFor="checkAniAnteriori">dupa 1800</label><br/>
                    <p className="fs-1">Tip coperta</p>

                    <input onChange={this.handleChange} className="form-check-input" type="checkbox" name="cover" value="Softcover" id="checkSoftcover"/>
                    <label className="form-check-label" htmlFor="checkSoftcover">Softcover</label><br/>

                    <input onChange={this.handleChange} className="form-check-input" type="checkbox" name="cover" value="Hardcover" id="checkHardcover"/>
                    <label className="form-check-label" htmlFor="checkHardcover">Hardcover</label><br/>

                </div>


            </div>

        </div>
    }
}


export default BookFilter