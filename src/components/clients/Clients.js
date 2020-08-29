import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class Clients extends Component {
  state = {
    totalOwed: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      //Add balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return { totalOwed: total };
    }
  }

  render() {
    // const clients = [
    //   {
    //     id: "12345",
    //     firstName: "Kevin",
    //     lastName: "Johnson",
    //     email: "kevin@gmail.com",
    //     phone: "55-555-555",
    //     balance: "30",
    //   },
    //   {
    //     id: "1655",
    //     firstName: "John",
    //     lastName: "Doe",
    //     email: "jdoe@gmail.com",
    //     phone: "55-444-555",
    //     balance: "100",
    //   },
    // ];

    const { clients } = this.props;
    const { totalOwed } = this.state;
    if (clients) {
      return (
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <h2>
                <i className='fas fa-users'></i>Clients
              </h2>
            </div>
            <div className='col-md-6'>
              <h5 className='text-right text-secondary'>
                Total Owed{" "}
                <span className='text-primary'>
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>
          <table className='table table-striped'>
            <thead className='thead-inverse'>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className='btn btn-sm btn-secondary'
                    >
                      <i className='fas fa-arrow-circle-right'></i> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}
Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array,
};

export default compose(
  firestoreConnect([{ collection: "clients" }]), // or { collection: 'todos' }
  connect((state, props) => ({
    clients: state.firestore.ordered.clients,
  }))
)(Clients);

// export default Clients;
