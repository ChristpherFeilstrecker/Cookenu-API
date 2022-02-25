import  connection from "./connection"

export const createSQLTables = async () => {
  await connection.raw(`
  CREATE TABLE cookenu_users (
	id VARCHAR(255) PRIMARY KEY,
   name varchar(255),
   email varchar(255),
   password varchar(255),
   role VARCHAR(255) 
);
  `)

  await connection.raw(`
  CREATE TABLE cookenu_recipes (
	id VARCHAR(255) PRIMARY KEY,
   title VARCHAR(255),
   description TEXT,
   created_date VARCHAR(255),
   user_id VARCHAR(255) NOT NULL,
   user_name VARCHAR(255) NOT NULL
);
  `)
  
  await connection.raw(`
  CREATE TABLE cookenu_follow (
	id VARCHAR(255) PRIMARY KEY,
   follow_id VARCHAR(255),
   followed_id VARCHAR(255)
);
  `)

 
}