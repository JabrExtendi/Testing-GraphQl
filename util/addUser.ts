
export default async function addUser(token) {

    let initialString = JSON.stringify({
        operationName: "InsertUserMutation", query: `mutation AddUser($id: float8, $name: String) { insert_user_one(object: { id: $id, name: $name}) {  id name  } }` , variables: { id: token.sub, name: token.name}
    })

    console.log(initialString)

    await fetch("http://localhost:8080/v1/graphql", {
        method: "post",
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'password'
        },

        body: initialString
    })
        .then((response) => {
            console.log("The response is :" + JSON.stringify(response))
        })
        .catch((error) => {
            console.log("The error is :" + error)
        });
}

