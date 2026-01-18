import "./css/Form.css";
function Main(){
    async function send(e){
        const URL = "http://localhost:3001/"
        e.preventDefault();
        const form = e.target;
        const data = {
            username: form.username.value,
            password: form.password.value,
        };
        const response = await fetch(`${URL}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result);
        switch(response.status){
            case 200:
                localStorage.setItem("csrf", result.csrf);
                window.location.href = "/profile";
                break;
            case 404:
                alert("User not found");
                break;
            case 401:
                alert("Incorrect password");
                break;     
            default:
                alert("An error occurred");
    }
}
    return(
        <form onSubmit={send}>
            <h1>Login Form</h1>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <br />
            
            <button type="submit">Login</button>
        </form>
    )
}
export default Main;