import React, { Component } from "react";
import Axios from "axios";
import config from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuthorized } from "../../utils";
import $ from 'jquery';

import TopMenu from "../Menu/TopMenu";
import SideMenu from "../Menu/SideMenu";

import Button from "../common/Button";
import Textbox from "../common/Textbox";
import Label from "../common/Label";
import DropDown from "../common/DropDown";

class ManageExpenses extends Component {
  state = {
    categoryData: [],
    spentByUserData: []
  };
  getCategories = async () => {
    let isAuthorised = await isAuthorized();
    if (isAuthorised) {
      await Axios.get(config.urls.EXPENSE_SERVICE + "getCategory")
        .then((res) => {
          if (res.data !== null || res.data !== undefined) {
            let organisedData = [];
            res.data.map((data) => {
              organisedData.push({ id: data._id, value: data.CategoryName });
            });
            this.setState({ categoryData: organisedData });
          }
        })
        .catch((err) => {
          if (err.response !== undefined && err.response.status === 400)
            toast(err.response.data.message);
        });
    }
  };

  getUsers = async () => {
    let isAuthorised = await isAuthorized();
    if (isAuthorised) {
      await Axios.get(config.urls.USER_SERVICE + "getUsers")
        .then((res) => {
          if (res.data !== null || res.data !== undefined) {
            let organisedData = [];
            res.data.map((data) => {
              organisedData.push({ id: data._id, value: data.FirstName + " " + data.LastName });
            });
            this.setState({ spentByUserData: organisedData });
          }
        })
        .catch((err) => {
          if (err.response !== undefined && err.response.status === 400)
            toast(err.response.data.message);
        });
    }
  };

  componentDidMount = async () => {
    this.getCategories();
    this.getUsers();
    $('.duallistbox').bootstrapDualListbox()
  };

  render() {
    return (
      <div>
        <TopMenu />
        <SideMenu />
        <div className="content-wrapper">
          <br></br>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <label>Catogory</label>
                  <DropDown
                    classValue="form-control"
                    dropDownData={this.state.categoryData}
                    property="Category"
                  />
                </div>
                <div className="col-md-6">
                  <label>Spent By</label>
                  <DropDown
                    classValue="form-control"
                    dropDownData={this.state.spentByUserData}
                    property="User"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                <select class="duallistbox" multiple="multiple">
                    <option selected>Alabama</option>
                    <option>Alaska</option>
                    <option>California</option>
                    <option>Delaware</option>
                    <option>Tennessee</option>
                    <option>Texas</option>
                    <option>Washington</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ManageExpenses;
