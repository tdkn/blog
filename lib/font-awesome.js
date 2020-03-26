import React from "react";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  faGithub,
  faTwitter,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";

config.autoAddCss = false;

library.add(faMapMarkerAlt, faCalendar, faGithub, faTwitter, faFacebook);
