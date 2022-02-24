export interface Profile {
   id: string
   name: string
   email: string
}

export interface Recipe {
   id: string
	title: string
	description: string
	created_date: string
   user_id:string
   user_name:string
}

export interface GetRecipe {
   id: string
	title: string
	description: string
	created_date: string
}

export interface Follow {
   id: string
	follow_id: string
	followed_id: string
}

export interface authenticationData {
   id: string
}

export interface user {
   id: string
   email: string
   name: string
   password: string
   role:string
}

export interface recipe {
   id: string
   title: string
   description: string
   created_date: string
}