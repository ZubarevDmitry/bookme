import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Grid, Loader, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UserForm from '../user/UserForm';
import { updateUser, fetchSignedInUser, deleteUser } from '../../actions';
import UserModal from '../user/UserModal';

function DashboardEdit(props) {
  const [state, setState] = useState({
    open: false,
    text: 'account',
  });

  useEffect(() => {
    if (_.isEmpty(props.user))
      props.fetchSignedInUser(props.userId, props.token);
  });

  const onSubmit = (formValues) => {
    props.updateUser(formValues, props.match.params.id, props.token);
  };

  const onDeleteClick = () => {
    setState({
      open: true,
    });
  };

  const onModalClick = (status) => {
    if (status === 'yes') {
      setState({
        open: false,
      });
      props.deleteUser(props.match.params.id, props.token);
    } else {
      setState({
        open: false,
      });
    }
  };

  const renderForm = () => {
    const { user } = props;
    if (_.isEmpty(user)) return <Loader active size="large" />;
    const {
      avatarUrl,
      description,
      name,
      profession,
      visible,
      schedule,
    } = user;
    const initialValues = {
      avatarUrl,
      description,
      name,
      profession,
      visible,
      from: +schedule[0],
      to: +schedule[1],
    };
    return (
      <Grid columns="two" divided>
        <Grid.Column width={8}>
          <UserForm onSubmit={onSubmit} initialValues={initialValues} />
          <br />
          <Button
            content="Delete Account"
            negative
            size="tiny"
            onClick={onDeleteClick}
          />
        </Grid.Column>
      </Grid>
    );
  };

  return (
    <div>
      {!localStorage.getItem('token') && <Redirect to="/" />}
      <h1>Update Your profile</h1>
      {renderForm()}
      <UserModal open={state.open} text="account" onModalClick={onModalClick} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.users.signedInUser,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, {
  updateUser,
  fetchSignedInUser,
  deleteUser,
})(DashboardEdit);
