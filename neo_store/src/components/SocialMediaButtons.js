import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function SocialMediaButtons(props) {
  return (
    <div>
      <FacebookShareButton
        url={"http://localhost:3000/productDetails"}
        quote={"NeoStore - World is yours to explore"}
        hashtag="#NeoStore"
      >
        <FacebookIcon size={36} />
      </FacebookShareButton>
      <span>&nbsp;&nbsp;</span>
      <EmailShareButton
        url={"http://localhost:3000/productDetails"}
        quote={"NeoStore - World is yours to explore"}
        hashtag="#NeoStore"
      >
        <EmailIcon size={36} />
      </EmailShareButton>
      <span>&nbsp;&nbsp;</span>
      <TwitterShareButton
        url={"http://localhost:3000/productDetails"}
        quote={"NeoStore - World is yours to explore"}
        hashtag="#NeoStore"
      >
        <TwitterIcon size={36} />
      </TwitterShareButton>
      <span>&nbsp;&nbsp;</span>
      <WhatsappShareButton
        url={"http://localhost:3000/productDetails"}
        quote={"NeoStore - World is yours to explore"}
        hashtag="#NeoStore"
      >
        <WhatsappIcon size={36} />
      </WhatsappShareButton>
    </div>
  );
}
