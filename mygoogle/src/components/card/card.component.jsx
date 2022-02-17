import React from 'react'
import './card.css'
import ActionLink from '../actionlink/actionlink.component'
import LeftGapRightLayout from '../layouts/left-gap-right/left-gap-right.component'
import Tag from '../tag/tag.component';
import Avatar from '../avatar/Avatar.component';

const Card = ({ header = 'Default Heading.',
  ...props }) => {

  function handlePhoneClick() {
    window.open('tel:8886406677');
  }
  function handleWhatsAppClick() {
    //window.open('whatsapp://send?text=Hello World!&amp;phone=+918886406677');
    window.open('https://api.whatsapp.com/send/?phone=918886406677&text&app_absent=0');
  }
  function handleEmailClick() {
    var url = "mailto:parsi.venkatramana@gmail.com?subject=ArticlePublished&body=ReviewComments";
    window.open(url)
  }
  return (
    <div className="card shadow" >
      <img className="card__preview-image" src="https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Screenshots/v1iiv5ij5o0p5powjv2o.jpg" alt="Desktop design screenshot for the Launch countdown timer coding challenge" />

      <div className="card__content-wrapper">
        <div className="card__header">
          <LeftGapRightLayout>
            <h4> {header}</h4>
            <time datetime="2021-09-23T18:40:38.695Z">11 days ago</time>
          </LeftGapRightLayout>
        </div>
        <LeftGapRightLayout >
          <div className="card__actions-wrapper">
            <div className="card__actions">
              <ActionLink iconName="FaEdit" />
              <ActionLink iconName="FaClipboard" />
              <ActionLink iconName="FaMailBulk" />
              <ActionLink iconName="FaShareAlt" />
            </div>
          </div>
          <div className="card__social-reactions">
            <ActionLink iconName="FaComment" />
            <ActionLink
              iconName="FaThumbsUp"
              color="red"
              count={5} />
            <ActionLink
              iconName="FaRegBookmark"
              color="black"
              count={5} />
          </div>
        </LeftGapRightLayout>
        <div className="card__tags">
          <Tag title="Casandra" />
          <Tag title="Casandra" />
          <Tag title="Casandra" />
        </div>

        <div className="card__profile-info">
          <LeftGapRightLayout>
          <LeftGapRightLayout>
            <div className="profile-info-avatar">
              <Avatar name="Venkat"
                profilePic="https://avatars.githubusercontent.com/u/14027317?s=60&v=4"
                profileVideo="4iJ05qeIoQo"
              >
              </Avatar>
            </div>
            <div class="ProfileInfo__Details">
              <div class="ProfileInfo__User ">
                <span class="profile-name">
                  <a aria-label="Go to Venkats's profile" href="/profile/venkatparsi">
                    Venkat Parsi</a>
                </span>
                <span title="Mentor Score: 1640" class="ProfileInfo__Score fUVJvB">1,640</span>
              </div>
              <span className="profile-active">Active
                <time datetime="2021-09-23T18:40:38.695Z">13 days ago</time>
              </span>
            </div>
            </LeftGapRightLayout>
            <div className="profile-actions">

             

              <ActionLink iconName="FaPhoneAlt"
                color="white"
                backgroundColor="rgb(29, 161, 242)"
                showCircle={true}
                onClick={handlePhoneClick}
              />

              <ActionLink iconName="FaWhatsapp"
                color="white"
                backgroundColor="green"
                showCircle={true}
                onClick={handleWhatsAppClick}
              />

              <ActionLink iconName="FaMailBulk"
                color="white"
                backgroundColor="rgb(59, 89, 152)"
                showCircle={true}
                onClick={handleEmailClick}
              />

            </div>

          </LeftGapRightLayout>
        </div>
        <div className="profile-actions">

      

        </div>
        <div className="card__description">
          <p>Just did another challenge, to be honest it was the most challenging one I did so far. I really wanted to the flip animation but I couldn't do a refined version, please teach me how to do it if you know how to🙏.</p>
          <p>Also suggest for any improvements I can do.</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
