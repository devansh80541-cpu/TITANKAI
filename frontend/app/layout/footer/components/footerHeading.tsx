import Image from "next/image";
import InstagramSvg from "@/public/assets/instagram.svg";
import Link from "next/link";
import React from "react";
import styles from "../footerComponent.module.css";

function FooterHeading() {
  return (
    <div id={styles.social_links_container} className="display_flex_row">
      <Link id={styles.img_container} href="/">
        <Image
          src="/titankai-logo.png"
          alt="TITAN KAI Site Logo"
          fill
          sizes="91px"
        ></Image>
      </Link>

      <div id={styles.social_media_container}>
        <ul className="display_flex_row">
          <li>
            <Link href="https://www.instagram.com/titan.1300/#" target="_blank">
              <InstagramSvg width={16} height={16} title="Instagram" />{" "}
              <span>Instagram</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FooterHeading;
