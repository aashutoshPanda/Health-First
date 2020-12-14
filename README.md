# "HEALTH FIRST" by Rising Heights

### Official submission-
From as simple as  writing your thoughts in your journal to a more advanced and efficient functionality of Cataract Detection Test, we team Rising Heights present you with our product HEALTH FIRST.
HEALTH FIRST aims at reducing cost of health services  with the help of our scalable Mobile Application built on React Native with Firbase at the backend.

<table>
  <tr>
  <td>Login</td>
     <td>Dashboard</td>
     <td>Water Intake Tracker</td>

  </tr>
  <tr>
    <td valign="top"><img src="https://i.ibb.co/Z1q7VnP/Screenshot-20201124-214752-Expo.jpg" alt="Screenshot-20201124-214752-Expo" border="0" /></td>
    <td valign="top"><img src="https://i.ibb.co/wWH375p/Screenshot-20201124-214803-Expo.jpg" alt="Screenshot-20201124-214803-Expo" border="0" /></td>
    <td valign="top"><img  src="https://i.ibb.co/7VzL0cr/Screenshot-20201124-214853-Expo.jpg" alt="Screenshot-20201124-214853-Expo" border="0" /></td>
  </tr>
  <tr>   <td>Cataract Test</td>
     <td>Meal Planner</td>
     <td>Appointment Booking</td>
  
  </tr>
  <tr>
    <td valign="top"><img src="https://i.ibb.co/nrCTz0T/Screenshot-20201124-214953-Expo.jpg" alt="Screenshot-20201124-214953-Expo" border="0" /></td>
    <td valign="top"><img src="https://i.ibb.co/yRrjCKz/Screenshot-20201124-215056-Expo.jpg" alt="Screenshot-20201124-215056-Expo" border="0" /></td>
    <td valign="top"><img src="https://i.ibb.co/ZY9CyMf/Screenshot-20201124-215031-Expo.jpg" alt="Screenshot-20201124-215031-Expo" border="0" /></td>
  </tr>
    <tr>
  <td>Search Hospitals/Doctors</td>
     <td>Realtime Chat </td>
     <td>Water Intake Tracker</td>

  </tr>
  <tr>
    <td valign="top"><img src="https://i.ibb.co/tCKpCzj/Screenshot-20201124-215011-Expo.jpg" alt="Screenshot-20201124-215011-Expo" border="0" /></td>
    <td valign="top"><img src="https://i.ibb.co/vwjzBHg/Screenshot-20201124-215128-Expo.jpg" alt="Screenshot-20201124-215128-Expo" border="0" /></td>
    <td valign="top"><img src="https://i.ibb.co/Q9ryGXq/Screenshot-20201124-214814-Expo.jpg" alt="Screenshot-20201124-214814-Expo" border="0" /></td>
  </tr>
     <tr>
  <td>Adding to Journal</td>

  </tr>
  <tr>
    <td valign="top"><img src="https://i.ibb.co/kBYHmmr/Screenshot-20201124-214842-Expo.jpg" alt="Screenshot-20201124-214842-Expo" border="0" /></td>
   
  </tr>
  
 </table>
 
### Software prerequisites
Install the below tools/packages

| Serial No |     Software     |  Version  | Installation site                                                          |
| :-------: | :--------------: | :-------: | :------------------------------------------------------------------------- |
|     1     |     Node.js      | >= 6.9.1  | [Install NodeJS](https://nodejs.org/en/download/)                          |
|     2     |       npm        | >= 3.10.8 | [Install NPM](https://www.npmjs.com/get-npm)                               |
|     3     |   react-native   | >= 0.51.0 | [Install react-native](https://www.npmjs.com/package/react-native)         |
|     4     | react-native-cli | >= 2.0.1  | [Install react-native-cli](https://www.npmjs.com/package/react-native-cli) |
|     5     |       expo       | >= 47.1.1 | [Install Expo](https://www.npmjs.com/package/exp)                          |

### Setup Instructions

#### System setup

1. Clone the repo with `git clone [REPO_URL]` command
2. Switch to the project's root directory in terminal
3. Install the dependencies by running `npm install`
4. Make virtual env named "env" by `python3 -m venv env`
5. Activate it by `source env/bin/activate`
6. Install the python packages required by `pip install -r requirements.txt`
7. To run the expo app `expo start`
8. To run the flask server move to the "flask_app" directory & run it `cd flask_app` `python main.py`

NOTE : For making request from mobile device to the flask app(running locally) replace the provided address(192.168.1.5) with your local address appropriately in `const apiUrl = "http://192.168.1.5:8080/detect";` in "screens/Camera.js"

you can write your env specific config variables on `.env` file and import them from `react-native-dotenv` package as mentioned [here](https://github.com/zetachang/react-native-dotenv#usage).

Ignore the first step on 'Mobile setup' instructions given below if you already have 'Expo' app installed on your phone.

#### Mobile setup

1. Install 'Expo' application on your android/iOS device. You can find the links to Android and iOS apps [here](https://expo.io/tools#client).
2. Scan the QR code shown on the terminal.
3. Once the QR code is successfully scanned, it will take few seconds to load and render the app.

**Note** In case of any problem, please mention and describe your issue in the issue section
