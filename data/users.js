const bcrypt = require("bcrypt");
const saltRounds = 16;
    async function checkLogin(uname, passwd) {
      
      let users = [
        {
          username : "masterdetective123",
          FirstName: "Sherlock",
          LastName: "Holmes",
          Profession: "Detective",
          Bio: "Sherlock Holmes  is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a consulting detective in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.",
          HashedPasswrod: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD."

        },
        {
          username : "lemon",
          FirstName: "Elizabeth",
          LastName: "Lemon",
          Profession: "Writer",
          Bio: "Elizabeth Miervaldis Liz Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.",
          HashedPasswrod: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm"

        },
        {
          username : "theboywholived",
          FirstName: "Harry",
          LastName: "Potter",
          Profession: "Student",
          Bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
          HashedPasswrod: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK"

        }
      ]   

      var correctuser;
      for(var i = 0; i<users.length; i++)
      {
        if(uname == users[i].username)
        {
          let compareToMatch = false;
          
            try {
              compareToMatch = await bcrypt.compare(passwd, users[i].HashedPasswrod);
            } catch (e) {
              console.log("Cannot hash")
            }
            if (compareToMatch === true) {
              correctuser = users[i];
              try{
                correctuser.HashedUsername = await bcrypt.hash(users[i].username,saltRounds)
              }
              catch(e)
              {
                console.log("cannot hash")
              }
              return correctuser;
            } 
        }
      }
      return false;
 
    }

  
   module.exports ={checkLogin};
  

