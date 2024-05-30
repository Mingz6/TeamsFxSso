Error Log:
try get profile
Graph.tsx:37 [Thu, 30 May 2024 05:12:03 GMT] : @microsoft/teamsfx : Verbose - Get SSO token from memory cache
useTeamsUserCredential.js:22 [Thu, 30 May 2024 05:12:03 GMT] : @microsoft/teamsfx : Info - Get access token with scopes: User.Read
useTeamsUserCredential.js:22 [Thu, 30 May 2024 05:12:03 GMT] : @microsoft/teamsfx : Verbose - Get SSO token from memory cache
useTeamsUserCredential.js:22 [Thu, 30 May 2024 05:12:03 GMT] : @microsoft/teamsfx : Verbose - Failed to call acquireTokenSilent. Reason: uninitialized_public_client_application: You must call and await the initialize function before attempting to call any other MSAL API.  For more visit: aka.ms/msaljs/browser-errors. 
useTeamsUserCredential.js:22 [Thu, 30 May 2024 05:12:03 GMT] : @microsoft/teamsfx : Verbose - Failed to call ssoSilent. Reason: uninitialized_public_client_application: You must call and await the initialize function before attempting to call any other MSAL API.  For more visit: aka.ms/msaljs/browser-errors. 
useTeamsUserCredential.js:22 [Thu, 30 May 2024 05:12:03 GMT] : @microsoft/teamsfx : Error - Failed to get access token cache silently, please login first: you need login first before get access token.
useTeamsUserCredential.js:22 [Thu, 30 May 2024 05:12:03 GMT] : @microsoft/teamsfx : Info - Get SSO token
Welcome.tsx:43 [Thu, 30 May 2024 05:12:03 GMT] : @microsoft/teamsfx : Info - Get basic user info from SSO token
Welcome.tsx:43 [Thu, 30 May 2024 05:12:03 GMT] : @microsoft/teamsfx : Verbose - Get SSO token from memory cache
useTeamsUserCredential.js:22 [Thu, 30 May 2024 05:12:03 GMT] : @microsoft/teamsfx : Info - Get SSO token
POST https://substrate.office.com/sigsapi/v1.0/Me/Signals 409 (Conflict)

Attempts to Resolve the Issue
1. Cloned the project from https://github.com/KennethBWSong/authCodeTemplate but was unable to build it. After clicking the Authorize button, Graph.tsx fails to retrieve the user profile, resulting in a blank component and the error log shown above.

2. Referenced https://techcommunity.microsoft.com/t5/teams-developer/teamsfx-react-3-0-2-teamsusercredential-gettoken-results-in/m-p/3984411.
Using https://alcdn.msauth.net/browser/2.21.0/js/msal-browser.min.js prompts "Permissions requested."
Using https://alcdn.msauth.net/browser/2.35.0/js/msal-browser.min.js shows a blank page.
After granting permission, the error log still appears as above.

3. Updated to https://res.cdn.office.net/teams-js/2.23.0/js/MicrosoftTeams.min.js. No change observed.

4. Installed Specific MSAL Version: Ran npm install @azure/msal-browser@2.21.

5. Updated all npm packages to their latest versions.

6. Added "profile" permission in App registrations.

7. Added await teamsUserCredential.login(scope); in Graph.tsx with no success.