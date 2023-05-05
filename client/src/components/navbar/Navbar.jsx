import React, { useState } from "react";
import Logo from "../../Assets/Logo.svg";
import { HiOutlineBars3} from 'react-icons/hi2'
import {
  Box,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import HiveIcon from '@mui/icons-material/Hive';
import PhoneIcon from '@mui/icons-material/Phone';



function Navbar() {
  const [openMenu, setOpenMenu] = useState(false)
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />
    },
    {
      text: "Services",
      icon: <HiveIcon />
    },
    {
      text: "Contact",
      icon: <PhoneIcon />
    }
  ]
  return (
    <div>Navbar</div>
    // <nav>

    //   <ul>
    //     <li>
    //       <a href="/">HOME</a>
    //     </li>
    //     <li>
    //       <a href="#">Services</a>
    //     </li>
    //     <li>
    //       <a href="#">Contact</a>
    //     </li>
    //   </ul>
    // </nav>
  );
}

export default Navbar;
