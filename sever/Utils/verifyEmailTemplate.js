const verfiyEmailTemplate = ({ name, url }) => {
  return `
    <p>Dear ${name}</p>
    <p>Think You for registering Binkeyit.</p>
    <a href=${url} style="color:white; background: #271a52; margin-top:10px; padding:5px" >
    Verify Email
    </a>
    `;
};

export default verfiyEmailTemplate;
