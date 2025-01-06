const forgetPasswordTemplete = ({ name, otp }) => {
  return `
    <div>
        <p>Dear ${name}</p>
        <p>You're request a password reset. please use the following OTP code to reset your password. </p>
        <div style="background:yellow; font-size: 20px; padding: 10px; text-align: center; font-weigh:800;">${otp}</div>

        <p>This otp is valid for 1hour only. Enter this otp in the blinkyit website to process resetting your password</p>
    </br>
    </br>
    <p>Thinks</p>
    <p>Blinkeyit</p>
    </div>
    
  `;
};

export default forgetPasswordTemplete;
