const Temp_Users={
        CLIENT:{email:"client@test.com",password:"1234",},
        OWNER:{email:"owner@test.com",password:"1234",},
        ADMIN:{email:"admin@test.com",password:"admin",},
    };

export function frontLogin(email,password,role)
{
    console.log("LOGIN ATTEMPT:", email, password, role);
    if(!email || !password)
    {
        return {success:false,message:"Email & password required"};
    }
    
    const tempUser = Temp_Users[role];
    
    if(!tempUser)
    {
        return {success:false,message:"Invalid role!!"};
    }
    if(email!==tempUser.email || password!== tempUser.password)
    {
        return{success: false, message: "Invalid credentials"};
    }

    const authData={
        email,role,isLoggedIn:true,
    };

    localStorage.setItem("pg_auth",JSON.stringify(authData));

    return {success:true,role};
}

export function getAuthUser()
{
    const data = localStorage.getItem("pg_auth");
    return data ?JSON.parse(data) :null;
}

export function logout()
{
    localStorage.removeItem("pg_auth");
}
// temp login--replace backapi