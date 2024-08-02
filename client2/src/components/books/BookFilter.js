import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function BookFilter() {
    return (
        <div id="filter-area">
            <div className="form-check">
                <div className="form-check">
                    <p className="fs-1">Subcategorii</p>

                    <input className="form-check-input" type="checkbox" value="Fantasy" id="checkSubcategoriiFantasy"/>
                    <label className="form-check-label" htmlFor="checkSubcategoriiFantasy">Fantasy</label><br/>

                    <input className="form-check-input" type="checkbox" value="Romance" id="checkSubcategoriiRomance"/>
                    <label className="form-check-label" htmlFor="checkSubcategoriiRomance">Romance</label><br/>

                    <input className="form-check-input" type="checkbox" value="Thriller"
                           id="checkSubcategoriiThriller"/>
                    <label className="form-check-label" htmlFor="checkSubcategoriiThriller">Thriller</label><br/>


                    <p className="fs-1">Pret</p>

                    <input className="form-check-input" type="checkbox" value="50" id="checkPret1"/>
                    <label className="form-check-label" htmlFor="checkPret1">0-50</label><br/>

                    <input className="form-check-input" type="checkbox" value="100" id="checkPret2"/>
                    <label className="form-check-label" htmlFor="checkPret2">50-100</label><br/>

                    <input className="form-check-input" type="checkbox" value="150" id="checkPret3"/>
                    <label className="form-check-label" htmlFor="checkPret3">100+</label><br/>


                    <p className="fs-1">Editura</p>

                    <input className="form-check-input" type="checkbox" value="Litera" id="checkEdituraLitera"/>
                    <label className="form-check-label" htmlFor="checkEdituraLitera">Litera</label><br/>

                    <input className="form-check-input" type="checkbox" value="RAO" id="checkEdituraRAO"/>
                    <label className="form-check-label" htmlFor="checkEdituraRAO">RAO</label><br/>

                    <p className="fs-1">Data publicarii</p>
                    <input className="form-check-input" type="checkbox" value="AnCurent" id="checkAnCurent"/>
                    <label className="form-check-label" htmlFor="checkAnCurent">2024</label><br/>

                    <input className="form-check-input" type="checkbox" value="AnAnterior" id="checkAniAnteriori"/>
                    <label className="form-check-label" htmlFor="checkAniAnteriori">Inainte de 2024</label><br/>
                    <p className="fs-1">Tip coperta</p>

                    <input className="form-check-input" type="checkbox" value="Softcover" id="checkSoftcover"/>
                    <label className="form-check-label" htmlFor="checkSoftcover">Softcover</label><br/>

                    <input className="form-check-input" type="checkbox" value="Hardcover" id="checkHardcover"/>
                    <label className="form-check-label" htmlFor="checkHardcover">Hardcover</label><br/>

                </div>

                {/*<Form>*/}

                {/*    <p className="fs-1">Subcategorii</p>*/}
                {/*    <InputGroup className="mb-3" controlId="formSubcategoriiCheckbox">*/}
                {/*        <Container>*/}

                {/*            <Row><Form.Check*/}
                {/*                type="checkbox"*/}
                {/*                value="Fantasy" id="checkSubcategoriiFantasy"*/}
                {/*                label="Fantasy"*/}
                {/*            /></Row>*/}
                {/*            <Row><Form.Check*/}
                {/*                type="checkbox"*/}
                {/*                value="Romance" id="checkSubcategoriiRomance"*/}
                {/*                label="Romance"*/}
                {/*            /></Row>*/}
                {/*            <Row>         <Form.Check*/}
                {/*                type="checkbox"*/}
                {/*                value="Thriller" id="checkSubcategoriiThriller"*/}
                {/*                label="Thriller"*/}
                {/*            /></Row>*/}

                {/*        </Container>*/}

                {/*    </InputGroup>*/}

                {/*    <p className="fs-1">Pret</p>*/}
                {/*    <InputGroup className="mb-3" controlId="formPretCheckbox">*/}
                {/*        <Container>*/}
                {/*            <Row> <Form.Check*/}
                {/*                type="checkbox"*/}
                {/*                value="50" id="checkPret1"*/}
                {/*                label="0-50lei"*/}
                {/*            /></Row>*/}
                {/*       <Row>   <Form.Check*/}
                {/*           type="checkbox"*/}
                {/*           value="100" id="checkPret2"*/}
                {/*           label="50-100lei"*/}
                {/*       /></Row>*/}

                {/*            <Row>   <Form.Check*/}
                {/*                type="checkbox"*/}
                {/*                value="150" id="checkPret3"*/}
                {/*                label=">100lei"*/}
                {/*            /></Row>*/}
                {/*        </Container>*/}

                {/*    </InputGroup>*/}

                {/*    <p className="fs-1">Editura</p>*/}
                {/*    <InputGroup className="mb-3" controlId="formEdituraCheckbox">*/}
                {/*        <Container>*/}
                {/*            <Row>      <Form.Check*/}
                {/*                type="checkbox"*/}
                {/*                value="Litera" id="checkEdituraLitera"*/}
                {/*                label="Litera"*/}
                {/*            /></Row>*/}
                {/*            <Row>    <Form.Check*/}
                {/*                type="checkbox"*/}
                {/*                value="RAO" id="checkEdituraRAO"*/}
                {/*                label="RAO"*/}
                {/*            /></Row>*/}
                {/*        </Container>*/}


                {/*    </InputGroup>*/}
                {/*    <p className="fs-1">Data publicarii</p>*/}
                {/*    <InputGroup className="mb-3" controlId="formDataCheckbox">*/}
                {/*        <Container>*/}
                {/*            <Row> <Form.Check*/}
                {/*                type="checkbox"*/}
                {/*                value="AnCurent" id="checkAnCurent"*/}
                {/*                label="2024"*/}
                {/*            /></Row>*/}
                {/*            <Row>*/}
                {/*                <Form.Check*/}
                {/*                    type="checkbox"*/}
                {/*                    value="AnAnterior" id="checkAniAnteriori"*/}
                {/*                    label="Inainte de 2024"*/}
                {/*                /></Row>*/}
                {/*        </Container>*/}


                {/*    </InputGroup>*/}
                {/*    <p className="fs-1">Tip coperta</p>*/}
                {/*    <InputGroup className="mb-3" controlId="formCopertaCheckbox">*/}
                {/*       <Container>*/}
                {/*           <Row>  <Form.Check*/}
                {/*               type="checkbox"*/}
                {/*               value="Hardcover" id="checkHardcover"*/}
                {/*               label="Hardcover"*/}
                {/*           /></Row>*/}
                {/*           <Row>   <Form.Check*/}
                {/*               type="checkbox"*/}
                {/*               value="Softcover" id="checkSoftcover"*/}
                {/*               label="Softcover"*/}
                {/*           /></Row>*/}
                {/*       </Container>*/}

                {/*    </InputGroup>*/}


                {/*</Form>*/}


            </div>

        </div>
    );
}

export default BookFilter