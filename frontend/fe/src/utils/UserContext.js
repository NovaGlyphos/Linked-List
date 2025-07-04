import { createContext } from "react";

const UserContext = createContext({
  firstName: "",
  lastName: "",
  photoUrl: "",
  age: "",
  gender: "",
  about: "",
  setFirstName: () => {},
  setLastName: () => {},
  setPhotoUrl: () => {},
  setAge: () => {},
  setGender: () => {},
  setAbout: () => {},
});


export default UserContext;