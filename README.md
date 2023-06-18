# Pride Meter Chrome Extension

The Pride Meter Chrome Extension is a tool that rates Twitter users based on their support for pride communities. This extension provides valuable insights into the inclusivity and allyship of Twitter users.

## Arquitecture
For this project, we made use os MongoDB Atlas and Azure Serverless functions. Our functions focused on managing the authenticaton flow, implementing the necessary logic to display the information, and storing it the way we needed it. We used mongodb to save our users information and the reviews. For this, we made use of two collections; a users collection which contained each application username and password, and a ratings collection, which contained each rating and comment given to a twitter user. 

You can inspect the azure functions in the serverlessFunctions folder.

Our extension client is made using HTML, CSS, and raw Javascript, since that is the recommended way to build extensions by some sources. 

## Installation

To install the Pride Meter Chrome Extension, please follow these steps:

1. Download or clone the repository to your local machine.

2. Open Google Chrome and navigate to the Extensions settings by typing `chrome://extensions` in the address bar and pressing Enter.

3. Enable Developer Mode by toggling the switch located at the top-right corner of the Extensions page.

4. Click on the "Load unpacked" button, which will appear after enabling Developer Mode.

5. In the file selection dialog, navigate to the location where you downloaded or cloned the Pride Meter Chrome Extension repository, and select the extension folder.

6. Click the "Select Folder" button to load the extension.

## Usage

Once the Pride Meter Chrome Extension is installed, you can start using it to rate Twitter users based on their support for pride communities. Whenever you visit a Twitter profile, the extension will analyze the user's tweets, interactions, and engagement to provide a rating that indicates their level of support for the LGBTQ+ community.

To view the Pride Meter rating for a Twitter user, simply visit their profile on Twitter. The extension will automatically display the rating alongside their profile information.

Please note that this extension requires an active internet connection to analyze Twitter profiles and provide accurate ratings.
