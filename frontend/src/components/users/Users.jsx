// import logo from './logo.svg';
import './Users.scss';
import UsersItem from './UsersItem';
import { CardDeck } from 'react-bootstrap';
import { useParams } from 'react';
import useApplicationData from "../../hooks/useApplicationData";

// import useApplicationData from "hooks/useApplicationData"

const Users = (props) => {
  //const cityName = cities.filter(city => city.id === user.city_id)
  let  cityId  = useParams();
  
  const citiesArray = ["Toronto", "Vancouver", "Calgary", "Montreal"];

  
  //console.log('USERS SONT tu lacity', props.users, props.cities, typeof(props.cities));

  const usersList = props.users.map((user, index) => {
    //const userCity = props.cities.filter(city => city.id === user.city_id);
    //console.log("Users city", userCity)
    return (
      <UsersItem
        key={index}
        id={user.id}
        name = {`${user.firstname} ${user.lastname}`}
        description = {user.description}
        city = {citiesArray[user.city_id - 1]}
      />
    )
  }) 


  //console.log('de quoi ca lair', usersList)


  return (
   
  <CardDeck >
    {usersList}
  </CardDeck>

  )
};

export default Users;
