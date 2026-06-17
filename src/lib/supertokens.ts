"use client";

import SuperTokens from "supertokens-auth-react";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import Session from "supertokens-auth-react/recipe/session";

export const initFrontEndAuth = () => {
  if (typeof window !== "undefined") {
    SuperTokens.init({
      appInfo: {
        appName: "Chat-App",
        apiDomain: "http://localhost:5000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
      },
      recipeList: [
        ThirdParty.init({
          signInAndUpFeature: {
            providers: [ThirdParty.Google.init()],
          },
        }),
        Session.init(),
      ],
    });
  }
};
