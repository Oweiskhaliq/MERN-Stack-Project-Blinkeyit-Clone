const IsAdmin = ({ role }) => {
  console.log(role);
  if (role === "ADMIN") {
    return true;
  }

  return false;
};

export default IsAdmin;
