async function handleLogin() {
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
     

      console.log(response);
      if (response.ok) {
        const data = await response.json();
          console.log(data);
        // Display success message
        document.getElementById('loginMessage').innerHTML = `
          <div class="alert alert-success">Welcome, ${data.user_info.name}!</div>
        `;

        // Save the token in localStorage (or sessionStorage)
        localStorage.setItem('authToken', JSON.stringify(data.token.token));
        localStorage.setItem('userInfo', JSON.stringify(data.user_info));
        
        // Redirect to a protected route (if needed)
        window.location.href = './dashboard.html';
      } else {
        // Handle error
        const error = await response.json();
        document.getElementById('loginMessage').innerHTML = `
          <div class="alert alert-danger">${error.message || 'Invalid credentials'}</div>
        `;
      }
    } catch (err) {
      // Handle unexpected errors
      document.getElementById('loginMessage').innerHTML = `
        <div class="alert alert-danger">Something went wrong. Please try again.</div>
      `;
      console.error(err);
    }
  }








  async function logoutUser() {
    try {
      
        // Assuming server responds with a JSON success message

        // Remove the token from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');


        // Redirect to the login or home page
        window.location.href = './index.html';
      
    } catch (err) {
      // Handle unexpected errors
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again later.");
    }
  }


  async function checkLogin() {
    try {
      const userToken = localStorage.getItem('userInfo');
      if (userToken) {
        return true; 
      } else {
        return false; 
      }
    } catch (err) {
      console.log(err);
      return false; 
    }
  }


  function CheckNav(){
    const user_info = userInfo();
  
  const email = user_info.email;
  console.log(typeof(email));
  

      if (user_info.role_id === 1 || user_info.role_id === 2) {
  document.getElementById('userNav').innerHTML = `
    <li >
      <a href="./users.html" class="nav-link link-body-emphasis">
        <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"></use></svg>
        Users
      </a>
    </li>`;
}

      document.addEventListener('DOMContentLoaded', main);
  }

  function CheckAuth(){
    const user_info = userInfo();
  
  const email = user_info.email;
  console.log(typeof(email));
  

      if (user_info.role_id === 3) {
        window.location.href = './dashboard.html';

}

      document.addEventListener('DOMContentLoaded', main);
  }


  async function redirectIfNotLoggedIn() {
    try {
      const logged = await checkLogin(); // Call the async function
      if (!logged) {
        // Redirect to the login page if not logged in
        window.location.href = "./index.html";
      }
    } catch (err) {
      console.error("Error in login check:", err);
    }
  }