import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import Button from "components/CustomButtons/Button.js";
import './Table.css'
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Input from "@material-ui/core/Input";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import GridItem from "components/Grid/GridItem.js";
import TextField from '@material-ui/core/TextField';
import GridContainer from "components/Grid/GridContainer.js";

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
//const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [titleTable, setTitleTable] = useState("");
  const [statusTable, setStatusTable] = useState("");
  const [descriptionTable, setDescriptionTable] = useState("");
  const [id, setId] = useState(0);

  const handleOpen = (id) => {
    console.log({ id })
    setId(id)
    axios.get(`http://localhost:8080/api/task/${id}`)
      .then(res => {
        console.log('sucess:', res)

        setTitleTable(res.data.title)
        setStatusTable(res.data.status)
        setDescriptionTable(res.data.description)
      })
    setOpen(true)
    // id.preventDefault();

    console.log(id)

    //  window.location.reload(true);

    //alert(`Submitting Name ${preco}`)
  }
  const handleClose = () => {
    setOpen(false);
  };


  const deleteProduto = (id) => {
    console.log(id)


    console.log(id)
    axios.delete(`http://localhost:8080/api/task/${id}`)
      .then(res => {
        console.log('sucess:', res)
      })

  }
  const { tableHead, tableData, tableHeaderColor, dados } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow} >
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    key={key}
                  >
                    {prop}

                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {dados.map((prop, key) => {

            return (


              <TableRow key={key} className={classes.tableBodyRow}>
                <TableCell style={{ width: '200px' }} className={classes.tableCell}>
                  {prop.title}
                </TableCell>
                <TableCell style={{ width: '200px' }} className={classes.tableCell}>
                  {prop.status}
                </TableCell>
                <TableCell style={{ width: '200px' }} className={classes.tableCell}>
                  {prop.description}
                </TableCell>
                <TableCell style={{ width: '200px' }} className={classes.tableCell}>
                  {/* <Button  type="submit" onClick={() => alterarProduto()} style={{width:'50px'}}  color="info">Alterar</Button> */}

                  <Button variant="contained" onClick={() => handleOpen(prop.id)} style={{ width: '50px' }} color="info" >
                    Alterar
                  </Button>
                </TableCell>
                <TableCell style={{ width: '200px' }} className={classes.tableCell} key={key}>

                  <Button type="submit" onClick={(e) => { props.onDeleteTask(prop.id) }} style={{ width: '50px' }} color="danger">Excluir</Button>

                </TableCell>
              </TableRow>
            );

          })}
        </TableBody>
      </Table>


      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div>
            <GridItem xs={12} sm={18} md={18}>
              <>

                <Card style={{ minWidth: 800 }}>

                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Editar Produto</h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>

                        <Input
                          value={titleTable}
                          onChange={e => setTitleTable(e.target.value)}
                          style={{ marginTop: "43px" }}
                          placeholder="Nome do produto"
                          id="produto"

                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={4}>
                        <Input
                          value={statusTable}
                          onChange={e => setStatusTable(e.target.value)}
                          style={{ marginTop: "43px" }}
                          placeholder="Preço do produto"
                          id="preco-produto"

                        />

                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Descrição"
                          multiline
                          rows={4}
                          value={descriptionTable}
                          onChange={(e) => setDescriptionTable(e.target.value)}
                          defaultValue="Descrição"
                          variant="outlined"
                        />

                      </GridItem>
                    </GridContainer>



                  </CardBody>
                  <CardFooter>

                    <Button type="button" onClick={(e) => {
                      props.onChangeTask({ id, titleTable, statusTable, descriptionTable })
                      setOpen(false)
                    }} color="primary">Atualizar</Button>
                  </CardFooter>
                </Card>
              </>

            </GridItem>
          </div>
        </Fade>
      </Modal>

    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
