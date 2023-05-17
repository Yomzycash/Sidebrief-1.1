import mixpanel from "mixpanel-browser";

const mixpanelToken = process.env.REACT_APP_MIXPANEL_TOKEN;
const isProd = process.env.NODE_ENV === "production";

mixpanel.init(mixpanelToken);

const actions = {
  identify: (id) => {
    if (isProd) mixpanel.identify(id);
  },
  alias: (id) => {
    if (isProd) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (isProd) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (isProd) mixpanel.people.set(props);
    },
  },
};

export const Mixpanel = actions;
