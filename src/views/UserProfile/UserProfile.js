import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Input from "@material-ui/core/Input";
import classNames from "classnames";
import axios from 'axios';
import Table from "components/Table/Table.js";

import avatar from "assets/img/faces/marc.jpg";
import stylesInput from "assets/jss/material-dashboard-react/components/customInputStyle.js";
const useStylesInput = makeStyles(stylesInput);


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {

  const classesInput = useStylesInput();
  const [userId, setUserId] = useState(0);

  const [task, setTask] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");




  useEffect(() => {
    try {

      const getTask = async (evt) => {
        const response = await axios.get(`http://localhost:8080/api/task`)
        const data = await response.data
        setTask(data)

      }
      getTask()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleRegisterTask = (evt) => {

    const datas = {
      title,
      description,
      status
    };
    axios.post(`http://localhost:8080/api/task`, datas)
      .then(res => {
        setTask([...task, res.data])
      })
    evt.preventDefault();

  }
  const handleDeleteTask = (id) => {
    const newTask = [...task];
    axios.delete(`http://localhost:8080/api/task/${id}`)
      .then(res => {
        const findIndex = newTask.findIndex(task => task.id === id)
        if (findIndex > -1) {
          newTask.splice(findIndex, 1);
        }
        setTask(newTask);
      })



  }
  const handleUpdateTask = ({ id, titleTable, statusTable, descriptionTable }) => {

    axios.put(`http://localhost:8080/api/task/${id}`, { title: titleTable, status: statusTable, description: descriptionTable })
      .then(res => {
        const updatedTask = res.data
        const newTask = [...task];
        const findIndex = newTask.findIndex(task => task.id === updatedTask.id);

        newTask[findIndex] = updatedTask
        setTask(newTask)
      })

  }
  const classes = useStyles();
  return (
    <>
      <GridContainer style={{ paddingLeft: 180, paddingRight: 180 }}>
        <GridItem xs={12} sm={12} md={12}>
          <form onSubmit={handleRegisterTask}>

            <Card>

              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Cadastro de Produtos</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>

                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ marginTop: "43px" }}
                      placeholder="Titulo da task"
                      id="task"
                    />

                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>

                    <Input
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      style={{ marginTop: "43px" }}
                      placeholder="Status da task"
                      id="task"
                    />

                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Descrição"
                      multiline
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      defaultValue="Descrição"
                      variant="outlined"
                    />

                  </GridItem>
                </GridContainer>



              </CardBody>
              <CardFooter>

                <Button type="submit" color="primary">Cadastrar</Button>
              </CardFooter>
            </Card>
          </form>

        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                Lista de produtos
            </h4>

            </CardHeader>
            <CardBody>
              <Table
                onChangeTask={(newData, oldData) => handleUpdateTask()}
                onDeleteTask={(newData, oldData) => handleDeleteTask(newData, oldData)}
                tableHeaderColor="primary"
                tableHead={["Titulo", "Status", "Descrição", "Alterar", "Excluir"]}
                dados={task}

              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
