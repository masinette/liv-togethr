// const { use } = require("../../routes");

const { param } = require("../../routes");

module.exports = (db) => {
  // Get all rooms by params or no params - LEVELs may need its own db table
  // api/rooms, api/rooms?active=true, api/rooms?active=true&city_id=1
  const getRooms = (params) => {
    console.log("params: ", params);
    console.log("params length: ", Object.keys(params).length);
    const paramsArray = Object.keys(params);

    let queryString = `SELECT rooms.* FROM rooms `;
    const queryParams = [];
    
    if (params.level) {
      queryString += `JOIN users ON rooms.user_id = users.id `;
    }

    if (paramsArray.length !== 0) {
      queryString += `WHERE active = true `;

      if (params.city_id) {
        queryParams.push(params.city_id);
        queryString += `AND rooms.city_id = $${queryParams.length} `;
      }
  
      if (Array.isArray(params.level)) {
        queryString += "AND ";
        params.level.forEach((level, index) => {
          queryParams.push(level);
          queryString += `users.level = $${queryParams.length} `;
          if (params.level[index + 1]) {
            queryString += `OR `;
          }
        });
      } else if (params.level) {
        queryParams.push(params.level);
        queryString += `AND users.level = $${queryParams.length} `;
      }

    }


    // Query levels
    // `SELECT rooms.* FROM rooms JOIN users ON rooms.user_id = users.id WHERE active = true AND rooms.city_id = 4 AND users.level = 1 ;`

    queryString += `;`;
    console.log("query: ", queryString);
    console.log("queryparams: ", queryParams);

    const query = {
      text: queryString,
      values: queryParams
    }
    return db
      .query(query)
      .then((result) => result.rows)
      .catch(err => console.error("error: ", err));
  }

  // Get specific room /api/rooms/:id
  const getRoom = (id) => {
    const query = {
      text: `SELECT * FROM rooms WHERE id = $1;`,
      values: [id]
    }
    return db
      .query(query)
      .then((result) => result.rows)
      .catch(err => console.error("error: ", err));
  }

  // Add new room
  const addRoom = (body) => {
    console.log(body)
    let queryString = `INSERT INTO rooms `;
    const queryParams = [];
    const keys =[];
    const values = [];

    for (let key of Object.keys(body)) {
      keys.push(key);
      queryParams.push(body[key])
      values.push(`$${queryParams.length}`)
    }

    console.log("keys: ", keys)
    console.log("values: ", values)
    console.log("queryParams: ", queryParams)

    queryString += `(${keys}) VALUES (${values}) RETURNING *;`

    console.log("query:", queryString)

    const query = {
      text: queryString,
      values: queryParams
    }

    return db
      .query(query)
      .then(result => {
        console.log(result)
        console.log(result.rows)
        return result.rows
      })
      .catch(err => console.error("error: ", err));
  }


  // update existing room
  const updateRoom = (body, room_id) => {
    console.log(body)
    
    const queryParams = [room_id];
    const keys = [];
    const values = [];
    let queryString = `UPDATE rooms SET `;

    for (let key of Object.keys(body)) {
      keys.push(key);
      queryParams.push(body[key])
      values.push(`$${queryParams.length}`)
    }

    queryString += `
    (${keys}) = (${values})
    WHERE id = $1 
    RETURNING *;`;

    // const { user_id, title, description, latitude, longitude, roomSize, startDate, endDate, price, petFriendly, active, address } = body;
    const query = {
      text: queryString,
      values: queryParams
    }

    return db
      .query(query)
      .then(result => {
        console.log(result)
        console.log(result.rows)  
        return result.rows
      })
      .catch(err => console.error("error: ", err));
  }

  // Get all rooms available for city_id. /api/rooms?city_id=1
  const getRoomsAvailableInCity = (params) => {
    const query = {
      text: `SELECT * FROM rooms WHERE active=true AND city_id = $1;`,
      values: city_id
    }
    return db
      .query(query)
      .then((result) => result.rows)
      .catch(err => err);
  }

  // rooms by level & city_id

  return {
    getRooms,
    getRoom,
    addRoom,
    updateRoom,
    getRoomsAvailableInCity
  }
}