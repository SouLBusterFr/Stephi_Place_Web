const usernameField = document.querySelector("#usernameField");
const feedBackArea=document.querySelector(".invalid_feedback");
const emailField = document.querySelector("#emailField");
const emailFeedBackArea = document.querySelector(".emailFeedBackArea");

emailField.classList.remove("is_invalid");
emailFeedBackArea.style.display = 'none';

emailField.addEventListener("keyup", (e)=> {
   const emailVal = e.target.value;

   if (emailVal.length>0) {
       fetch("/authentification/validate-email", {
           body: JSON.stringify({username: emailVal}),
           method: "POST",
       })

           .then((res) => res.json())
           .then((data) => {
               console.log("data", data);
               if (data.email_error) {
                   emailField.classList.add('is_invalid');
                   emailFeedBackArea.style.display = 'block';
                   emailFeedBackArea.innerHTML = `<p>${data.email_error}</p>`;
               }
               if (!data.email_error) {
                   emailFeedBackArea.style.display = 'none';
               }
           });
   }
   });


usernameField.classList.remove('is_invalid');
feedBackArea.style.display='none';


usernameField.addEventListener("keyup", (e)=> {
   const usernameVal = e.target.value;

   if (usernameVal.length>0) {
       fetch("/authentification/validate-username", {
           body: JSON.stringify({username: usernameVal}),
           method: "POST",
       })

           .then((res) => res.json())
           .then((data) => {
               console.log("data", data);
               if (data.username_error) {
                   usernameField.classList.add('is_invalid');
                   feedBackArea.style.display = 'block';
                   feedBackArea.innerHTML = `<p>${data.username_error}</p>`;
               }
               if (!data.username_error) {
                   feedBackArea.style.display = 'none';
               }
           });
   }
});