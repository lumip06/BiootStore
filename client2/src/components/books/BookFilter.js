import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useBoundStore} from "../../BoundStore";


// Wrapper to use Zustand inside a class component
function withCheckboxStore(Component) {
    return function WrappedComponent(props) {
        const {toggleFilter,checkboxes} = useBoundStore();
        return <Component {...props} toggleFilter={toggleFilter} checkboxes={checkboxes} />;
    };
}

class BookFilter extends React.Component {

    constructor(props) {
        super(props);
        this.filterListGenre=[
            {id:'Fantasy',label:'Fantasy',name:'genre'},
            {id:'Romance',label:'Romance',name:'genre'},
            {id:'Aventure',label:'Aventure',name:'genre'}
        ];
        this.filterListPrice=[
            {id:'10',label:'10',name:'price'}
        ];
        this.filterListCover=[
            {id:'Soft',label:'Soft',name:'cover'},
            {id:'Hard',label:'Hard',name:'cover'}
        ];
        this.filterListPublisher=[
            {id:'RAO',label:'Rao',name:'publisher'}
        ];
    }



    render() {
        const {toggleFilter,checkboxes} =this.props;

        return <div id="filter-area">
            <div className="form-check">
                <div className="form-check">
                    <p className="fs-1">Subcategorii</p>
                    {this.filterListGenre.map((checkbox) => (
                        <div key={checkbox.id}>
                            <input
                                type="checkbox"
                                id={checkbox.id}
                                name={checkbox.name}
                                checked={checkboxes[checkbox.id] || false}
                                onChange={() => toggleFilter(checkbox.id,checkbox.name)}
                            />
                            <label htmlFor={checkbox.id}>{checkbox.label}</label>
                        </div>
                    ))}
                    <p className="fs-1">Pret</p>
                    {this.filterListPrice.map((checkbox) => (
                        <div key={checkbox.id}>
                            <input
                                type="checkbox"
                                id={checkbox.id}
                                name={checkbox.name}
                                checked={checkboxes[checkbox.id] || false}
                                onChange={() => toggleFilter(checkbox.id,checkbox.name)}/>
                            <label htmlFor={checkbox.id}>{checkbox.label}</label>
                        </div>
                    ))}

                    <p className="fs-1">Editura</p>
                    {this.filterListPublisher.map((checkbox) => (
                        <div key={checkbox.id}>
                            <input
                                type="checkbox"
                                id={checkbox.id}
                                name={checkbox.name}
                                checked={checkboxes[checkbox.id] || false}
                                onChange={() => toggleFilter(checkbox.id,checkbox.name)}/>
                            <label htmlFor={checkbox.id}>{checkbox.label}</label>
                        </div>
                    ))}
                    <p className="fs-1">Tip coperta</p>
                    {this.filterListCover.map((checkbox) => (
                        <div key={checkbox.id}>
                            <input
                                type="checkbox"
                                id={checkbox.id}
                                name={checkbox.name}
                                checked={checkboxes[checkbox.id] || false}
                                onChange={() => toggleFilter(checkbox.id,checkbox.name)}/>
                            <label htmlFor={checkbox.id}>{checkbox.label}</label>
                        </div>
                    ))}
                    <p className="fs-1">Data publicarii</p>


                </div>


            </div>

        </div>
    }
}


export default withCheckboxStore(BookFilter)