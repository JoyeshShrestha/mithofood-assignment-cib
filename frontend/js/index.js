function userInfo() {
    
    try{

    const user_info = localStorage.getItem('userInfo');
        datauser = JSON.parse(user_info);
        console.log(datauser);
     return datauser;
    }
  catch (err){
    console.log(err);
    return null; // Return null if there's an error
  }
}


async function getUsers() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return JSON.stringify(data); // Return the data as a JSON string
    } else {
      const error = await response.json();
      console.error("Error response from server:", error);
      throw new Error("Failed to fetch users.");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    throw err; // Re-throw the error so the caller can handle it
  }
}


async function addUser() {
  try {
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role_id = document.querySelector('input[name="role_id"]:checked')?.value;

    const response = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role_id }),

    });

    console.log(response);
    if (response.ok) {
      const data = await response.json();
      const message = JSON.stringify(data.message);
      alert(message);
     

      // Redirect to a protected route (if needed)
      window.location.href = './users.html';
    } else {
      // Handle error
      const error = await response.json();
      const message = JSON.stringify(error.errors);

     alert(message);
     
    }
  } catch (err) {
    // Handle unexpected errors
    
    console.error(err);
  }
}

async function deleteUser(user_id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/delete/${user_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to delete user. Status: ${response.status}`);
    }

    const result = await response.json();
    alert(`User with ID ${user_id} deleted successfully.`, result);

    // Optionally refresh the user list after deletion
    fetchAndDisplayUsers();
  } catch (error) {
    console.error(`Error deleting user with ID ${user_id}:`, error);
    alert('Failed to delete the user. Please try again.');
  }
}


async function getUserbyId(user_id){{
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.user);
  
    localStorage.setItem('currentUserInfo',JSON.stringify(data.user));
    }else{
      throw new Error(`Failed to retrieve user. Status: ${data.status}`);
    }

  } catch (error) {
    console.error(`Error retrieving user with ID ${user_id}:`, error);
    alert('Failed to retrieve the user. Please try again.');
  }
}
}
// async function loadUser(user){{
//   try {
//     console.log(user)
//     getUserbyId(user.id);
    
//   } catch (error) {
//     console.error(`Error retrieving user with ID ${user_id}:`, error);
//     alert('Failed to retrieve the user. Please try again.');
//   }
// }
// }

async function updateUser(user_id){
  try {
    const name = document.getElementById('updateusername').value;
    const email = document.getElementById('updateemail').value;
    const password =  document.getElementById('updatepassword').value;
    const role_id = document.querySelector('input[name="role_id"]:checked')?.value;

    const response = await fetch(`http://127.0.0.1:8000/api/users/update/${user_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role_id }),

    });

    console.log(response);
    if (response.ok) {
      const data = await response.json();
      const message = JSON.stringify(data.message);
      alert("User has been updated!");
     


      window.location.href = './users.html';
    } else {
      // Handle error
      const error = await response.json();
      const message = JSON.stringify(error.errors);

     alert("Error");
     
    }
  } catch (err) {
    // Handle unexpected errors
    
    console.error(err);
  }

}


async function getRecipes() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/recipe', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return JSON.stringify(data); // Return the data as a JSON string
    } else {
      const error = await response.json();
      console.error("Error response from server:", error);
      throw new Error("Failed to fetch recipes.");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    throw err; // Re-throw the error so the caller can handle it
  }
}


// Function to fetch recipe details by ID
function getRecipeDetails(recipeId) {
  // Make an API call to get the recipe details
  fetch(`http://127.0.0.1:8000/api/recipe/${recipeId}`)
      .then(response => response.json())
      .then(data => {
          // Once the data is fetched, we need to redirect to the new page and pass the recipe details
          // You can store the details in localStorage or pass them via URL params or sessionStorage.
          // Here, we will use localStorage to pass the recipe details.

          localStorage.setItem("recipeDetails", JSON.stringify(data)); // Save recipe data to localStorage

          // Redirect to the new page (e.g., recipeDetails.html)
          window.location.href = "recipeDetails.html";
      })
      .catch(error => {
          console.error("Error fetching recipe details:", error);
      });
}


async function addRecipe() {
  try {
    const recipe_name = document.getElementById('recipe_name').value;
    const subtitle = document.getElementById('subtitle').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image_url').value;
    
    const response = await fetch('http://127.0.0.1:8000/api/recipe/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ recipe_name, subtitle, description, image }),

    });

    console.log(response);
    if (response.ok) {
      const data = await response.json();
      const message = JSON.stringify(data.message);
      alert(message);
     

      // Redirect to a protected route (if needed)
      window.location.href = './recipe.html';
    } else {
      // Handle error
      const error = await response.json();
      const message = JSON.stringify(error.errors);

     alert(message);
     
    }
  } catch (err) {
    // Handle unexpected errors
    
    console.error(err);
  }
}

async function deleteRecipe(recipe_id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/recipe/delete/${recipe_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to delete recipe. Status: ${response.status}`);
    }

    const result = await response.json();
    alert(`Recipe with ID ${recipe_id}} deleted successfully.`, result);

    // Optionally refresh the user list after deletion
    fetchAndDisplayRecipes();
  } catch (error) {
    console.error(`Error deleting recipe with ID ${recipe_id}:`, error);
    alert('Failed to delete the recipe. Please try again.');
  }
}


async function editRecipe(recipe_id){
  try {
    const recipe_name = document.getElementById('update_recipe_name').value;
    const subtitle = document.getElementById('update_subtitle').value;
    const description = document.getElementById('update_description').value;
    const image = document.getElementById('update_image_url').value;

    const response = await fetch(`http://127.0.0.1:8000/api/recipe/update/${recipe_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ recipe_name, subtitle, description, image }),


    });

    console.log(response);
    if (response.ok) {
      const data = await response.json();
      const message = JSON.stringify(data.message);
      alert("Recipe has been updated!");
     


      window.location.href = './recipe.html';
    } else {
      // Handle error
      const error = await response.json();
      const message = JSON.stringify(error.errors);

     alert("Error");
     
    }
  } catch (err) {
    // Handle unexpected errors
    
    console.error(err);
  }

}


async function changePassword(user_id){
  try {
   
    const password =  document.getElementById('new_password').value;
console.log(password);

    const response = await fetch(`http://127.0.0.1:8000/api/users/changepassword/${user_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({password}),

    });

    console.log('yo',response);
    if (response.ok) {
      const data = await response.json();
      const message = JSON.stringify(data.message);
      console.log("working");
      alert("Password has been updated!");
     


      window.location.href = './profile.html';
    } else {
      // Handle error
      const error = await response.json();
      const message = JSON.stringify(error.errors);

     alert("Error");
     
    }
  } catch (err) {
    // Handle unexpected errors
    
    console.error(err);
  }

}
