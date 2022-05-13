import {
  HeaderContainer,
  HeaderWrap,
  HeaderLogo,
  HeaderRelease,
  HeaderReleaseIcon,
  HeaderItemWrap,
  HeaderItem,
} from "./style";
import Logo from "../../../assets/logo/dodam_text_logo.svg";
import { AiFillInfoCircle } from "react-icons/ai";
import { HEADER_LINKS } from "../../../constants/header/header.constant";

const Header = () => {
  const currentSelect = "홈";

  return (
    <HeaderContainer>
      <HeaderWrap>
        <HeaderLogo>
          <img src={Logo} alt={"header/headerLogo"} />
        </HeaderLogo>
        <HeaderItemWrap>
          {HEADER_LINKS.map((link) => (
            <HeaderItem isSelect={link.name === currentSelect}>
              <a href={link.link}>
                <span>{link.name}</span>
              </a>
            </HeaderItem>
          ))}
        </HeaderItemWrap>
        <HeaderRelease>
          <HeaderReleaseIcon>
            <AiFillInfoCircle />
          </HeaderReleaseIcon>
        </HeaderRelease>
      </HeaderWrap>
    </HeaderContainer>
  );
};

export default Header;
