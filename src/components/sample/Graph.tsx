import "./Graph.css";
import { useGraphWithCredential } from "@microsoft/teamsfx-react";
import { Providers, ProviderState } from "@microsoft/mgt-element";
import { TeamsFxProvider } from "@microsoft/mgt-teamsfx-provider";
import { Button } from "@fluentui/react-components";
import { Design } from "./Design";
import { PersonCardFluentUI } from "./PersonCardFluentUI";
import { PersonCardGraphToolkit } from "./PersonCardGraphToolkit";
import { useContext } from "react";
import { TeamsFxContext } from "../Context";

export function Graph() {
  const { teamsUserCredential } = useContext(TeamsFxContext);

  const { loading, error, data, reload } = useGraphWithCredential(
    async (graph, teamsUserCredential, scope) => {
      if (!teamsUserCredential) {
        console.log("No teamsUserCredential");
      }

      console.log("before get profile");
      // Call graph api directly to get user profile information
      const profile = await graph.api("/me").get();
      console.log("after get profile");

      // Initialize Graph Toolkit TeamsFx provider
      const provider = new TeamsFxProvider(teamsUserCredential, scope);
      Providers.globalProvider = provider;
      Providers.globalProvider.setState(ProviderState.SignedIn);

      let photoUrl = "";
      try {
        const photo = await graph.api("/me/photo/$value").get();
        photoUrl = URL.createObjectURL(photo);
        console.log("first photoUrl", photoUrl);
      } catch {
        // Could not fetch photo from user's profile, return empty string as placeholder.
      }
      return { profile, photoUrl };
    },
    {
      scope: ["User.Read", "profile"],
      credential: teamsUserCredential,
    }
  );

  // Method 2: get Teams token silently
  // teamsUserCredential!
  //   .getToken([])
  //   .then(async (tokenResponse) => {
  //     if (!tokenResponse) {
  //       // Handle the case where silent authentication fails
  //       console.warn("Silent authentication failed. No token received.");
  //     } else {
  //       // console.log('teams token: ', tokenResponse.token);
  //       const response = await fetch(
  //         "https://<MyDomain>.ngrok.io/api/auth/SingleSignOn",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${tokenResponse.token}`,
  //           },
  //           body: JSON.stringify({
  //             clientId: reactAppClientId,
  //             scopes: ["openid", "email", "User.Read", "offline_access"],
  //           }),
  //         }
  //       ).then((res) => res.json());

  //       // console.log('fetch response: ', response.access_token);
  //       localStorage.setItem(AccessTokenTypes.<TeamsAppType>, response.access_token);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Silent authentication failed", error);
  //   });

  // Method 3: get Teams token using authProvider
  // provider.graph.client.api('/me').get().then((profile) => {
  //   console.log('graph1 profile', profile);
  // });

  // const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  //   scopes: ['User.Read'],
  // });
  // const graph = Client.initWithMiddleware({
  //   authProvider: authProvider,
  // });

  // const profile = await graph.api('/me').get();
  // console.log('authProvider profile', profile);
  // const graphToken = await authProvider.getAccessToken();
  // console.log('authProvider token: ', graphToken);

  return (
    <div>
      <Design />
      <h3>Example: Get the user's profile</h3>
      <div className="section-margin">
        <p>
          Click below to authorize button to grant permission to using Microsoft
          Graph.
        </p>
        <pre>{`credential.login(scope);`}</pre>
        <Button appearance="primary" disabled={loading} onClick={reload}>
          Authorize
        </Button>

        <p>
          Below are two different implementations of retrieving profile photo
          for currently signed-in user using Fluent UI component and Graph
          Toolkit respectively.
        </p>
        <h4>1. Display user profile using Fluent UI Component</h4>
        <PersonCardFluentUI loading={loading} data={data} error={error} />
        <h4>2. Display user profile using Graph Toolkit</h4>
        <PersonCardGraphToolkit loading={loading} data={data} error={error} />
      </div>
    </div>
  );
}
