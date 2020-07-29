import React from 'react';
import axios from 'axios';

// material ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 50%)',
    width: 400,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginBottom: 20,
  },
  button: {
    alignSelf: 'center',
    padding: '8px 48px',
  },
  logo: {
    fontSize: '5rem',
    textAlign: 'center',
    marginBottom: '20px',
  },
}));

const baseUrl = 'https://5f1ed14357e3290016863d6d.mockapi.io';

const Login = ({ setUser }) => {
  const classes = useStyles();

  const [username, setUsername] = React.useState('Karolann24@yahoo.com');
  const [password, setPassword] = React.useState('Test');

  const onFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/login`, {
        username,
        password,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(
          'API LIMITATION: Max number of elements reached for this resource!'
        );
        console.log(
          'We set the user to true so we can see the functionality of the app'
        );
        setUser(true);
      });
  };
  return (
    <div className={classes.loginContainer}>
      <h1 className={classes.logo}>Kite</h1>
      <form
        className={classes.formContainer}
        noValidate
        autoComplete="off"
        onSubmit={onFormSubmit}
      >
        <TextField
          className={classes.textField}
          id="outlined-username-input"
          required
          label="Username"
          type="text"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          className={classes.textField}
          id="outlined-password-input"
          required
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
